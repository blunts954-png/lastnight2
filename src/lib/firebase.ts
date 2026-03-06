// Firebase configuration
'use client'

// NO TOP-LEVEL STATIC IMPORTS of firebase/auth or firebase/firestore to prevent server-side bundling errors
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
}

// Singleton for client-side instance
let firebaseInstance: any = null

export const getFirebase = async () => {
    if (typeof window === 'undefined') return null

    if (firebaseInstance) return firebaseInstance

    const [
        { initializeApp, getApps, getApp },
        { getFirestore, collection, doc, getDoc, setDoc, updateDoc, increment, query, where, getDocs },
        { getAuth, signOut }
    ] = await Promise.all([
        import('firebase/app'),
        import('firebase/firestore'),
        import('firebase/auth')
    ])

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    const db = getFirestore(app)
    const auth = getAuth(app)

    firebaseInstance = {
        app,
        db,
        auth,
        firestore: { collection, doc, getDoc, setDoc, updateDoc, increment, query, where, getDocs },
        auth_methods: { signOut }
    }
    return firebaseInstance
}

// Types
export interface Member {
    uid: string
    member_id: string
    name: string
    email: string
    phone: string
    instagram?: string
    dob?: string
    tier: 'Guest' | 'Blacklist' | 'Inner Circle' | 'Founder' | 'God Card'
    points: number
    attendance_count: number
    member_since: string
    status: boolean
    banned: boolean
    qr_token: string
    last_active: string
}

export interface Scan {
    scan_id: string
    member_id: string
    event_id: string
    timestamp: string
    location: string
    result: 'success' | 'failed' | 'banned'
}

// Helper functions
export const generateMemberId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = 'LN-'
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

export const generateQrToken = (memberId: string): string => {
    return `${memberId}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

// Database operations
export const createMember = async (memberData: Omit<Member, 'uid'>): Promise<Member> => {
    const fb = await getFirebase()
    if (!fb) throw new Error('Firebase not initialized')

    const { db, firestore } = fb
    const { collection, doc, setDoc } = firestore

    const newMember: Member = {
        ...memberData,
        uid: memberData.member_id as string
    } as Member

    await setDoc(doc(db, 'members', memberData.member_id), newMember)
    return newMember
}

export const getMember = async (memberId: string): Promise<Member | null> => {
    const fb = await getFirebase()
    if (!fb) return null

    const { db, firestore } = fb
    const { doc, getDoc } = firestore

    const memberDoc = await getDoc(doc(db, 'members', memberId))
    if (memberDoc.exists()) {
        return memberDoc.data() as Member
    }
    return null
}

export const getMemberByPhone = async (phone: string): Promise<Member | null> => {
    const fb = await getFirebase()
    if (!fb) return null

    const { db, firestore } = fb
    const { collection, query, where, getDocs } = firestore

    const q = query(collection(db, 'members'), where('phone', '==', phone))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as Member
    }
    return null
}

export const updateMemberPoints = async (memberId: string, pointsToAdd: number): Promise<void> => {
    const fb = await getFirebase()
    if (!fb) return

    const { db, firestore } = fb
    const { doc, updateDoc, increment } = firestore

    const memberRef = doc(db, 'members', memberId)
    await updateDoc(memberRef, {
        points: increment(pointsToAdd),
        last_active: new Date().toISOString()
    })
}

export const incrementAttendance = async (memberId: string): Promise<void> => {
    const fb = await getFirebase()
    if (!fb) return

    const { db, firestore } = fb
    const { doc, updateDoc, increment } = firestore

    const memberRef = doc(db, 'members', memberId)
    await updateDoc(memberRef, {
        attendance_count: increment(1),
        last_active: new Date().toISOString()
    })
}

export const recordScan = async (scanData: Scan): Promise<void> => {
    const fb = await getFirebase()
    if (!fb) return

    const { db, firestore } = fb
    const { doc, setDoc } = firestore

    await setDoc(doc(db, 'scans', scanData.scan_id), scanData)
}

export const logout = async (): Promise<void> => {
    const fb = await getFirebase()
    if (!fb) return
    const { auth, auth_methods } = fb
    await auth_methods.signOut(auth)
}
