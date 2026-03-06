// Firebase configuration
'use client'
// Replace these values with your Firebase project credentials

import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    query,
    where,
    getDocs,
    orderBy,
    limit
} from 'firebase/firestore'
import {
    getAuth,
    signInWithPhoneNumber,
    ConfirmationResult,
    PhoneAuthProvider,
    signOut
} from 'firebase/auth'

// Firebase config - REPLACE WITH YOUR OWN VALUES
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
}

// Initialize Firebase only on the client side
const app = (typeof window !== 'undefined' && !getApps().length) ? initializeApp(firebaseConfig) : (getApps().length ? getApp() : null as any)
const db = typeof window !== 'undefined' ? getFirestore(app) : null as any
const auth = typeof window !== 'undefined' ? getAuth(app) : null as any

// Types
export interface Member {
    uid: string
    member_id: string
    name: string
    email: string
    phone: string
    tier: 'Guest' | 'Blacklist' | 'Inner Circle' | 'Founder'
    points: number
    attendance_count: number
    member_since: string
    status: boolean
    banned: boolean
    qr_token: string
    last_active: string
}

export interface Event {
    event_id: string
    name: string
    date: string
    location: string
    capacity: number
    tickets_sold: number
    tiers: {
        first_hour: { price: number; limit: number }
        ga: { price: number; limit: number }
        vip: { price: number; limit: number }
        blacklist: { price: number; limit: number }
    }
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
    const membersRef = collection(db, 'members')
    const newMember: Member = {
        ...memberData,
        uid: memberData.member_id
    }
    await setDoc(doc(db, 'members', memberData.member_id), newMember)
    return newMember
}

export const getMember = async (memberId: string): Promise<Member | null> => {
    const memberDoc = await getDoc(doc(db, 'members', memberId))
    if (memberDoc.exists()) {
        return memberDoc.data() as Member
    }
    return null
}

export const getMemberByPhone = async (phone: string): Promise<Member | null> => {
    const q = query(collection(db, 'members'), where('phone', '==', phone))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as Member
    }
    return null
}

export const updateMemberPoints = async (memberId: string, pointsToAdd: number): Promise<void> => {
    const memberRef = doc(db, 'members', memberId)
    await updateDoc(memberRef, {
        points: increment(pointsToAdd),
        last_active: new Date().toISOString()
    })
}

export const incrementAttendance = async (memberId: string): Promise<void> => {
    const memberRef = doc(db, 'members', memberId)
    await updateDoc(memberRef, {
        attendance_count: increment(1),
        last_active: new Date().toISOString()
    })
}

export const recordScan = async (scanData: Scan): Promise<void> => {
    await setDoc(doc(db, 'scans', scanData.scan_id), scanData)
}

export const verifyMember = async (qrData: string): Promise<{ valid: boolean; member?: Member; message: string }> => {
    try {
        // Parse QR data: format is "LN-XXXXXX-timestamp-random"
        const parts = qrData.split('-')
        if (parts[0] !== 'LN' || parts.length < 3) {
            return { valid: false, message: 'Invalid QR code format' }
        }

        const memberId = `${parts[0]}-${parts[1]}`
        const member = await getMember(memberId)

        if (!member) {
            return { valid: false, message: 'Member not found' }
        }

        if (member.banned) {
            return { valid: false, member, message: 'BANNED - Get Lost' }
        }

        if (!member.status) {
            return { valid: false, member, message: 'Account inactive' }
        }

        return { valid: true, member, message: `WELCOME ${member.name}` }
    } catch (error) {
        console.error('Verification error:', error)
        return { valid: false, message: 'Verification failed' }
    }
}

// Auth operations
export const sendVerificationCode = async (phoneNumber: string): Promise<ConfirmationResult | null> => {
    try {
        // This is a placeholder for the actual phone auth implementation
        // In production, you would use:
        // const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        // return confirmationResult

        console.log('Simulating verification code sent to:', phoneNumber)
        return null
    } catch (error) {
        console.error('Error sending verification code:', error)
        return null
    }
}

export const logout = async (): Promise<void> => {
    await signOut(auth)
}

export { app, db, auth }
