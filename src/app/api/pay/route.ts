import { NextResponse } from 'next/server'
import { Client, Environment } from 'square'

// Initialize the Square client
const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox, // Change to Environment.Production for real payments
})

export async function POST(request: Request) {
    try {
        const { sourceId, amount, idempotencyKey } = await request.json()

        const { result } = await client.paymentsApi.createPayment({
            sourceId,
            idempotencyKey,
            amountMoney: {
                amount: BigInt(amount),
                currency: 'USD',
            },
        })

        // Convert BigInt to Number for JSON serialization
        const serializedResult = JSON.parse(
            JSON.stringify(result, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        )

        return NextResponse.json(serializedResult)
    } catch (error: any) {
        console.error('Square Payment Error:', error)
        return NextResponse.json(
            { error: error.message || 'Payment processing failed' },
            { status: 500 }
        )
    }
}
