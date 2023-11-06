const { NextResponse } = require("next/server");
import connect from "@/app/lib/mongodb";
import MemberModel from "@/app/models/Member.model";
import Notifications from "@/app/models/Notifications";
const CryptoJS = require("crypto-js");

export async function GET(request) {
    let limitval = 10
    try {
        const { searchParams } = new URL(request.url)
        limitval = searchParams.get('limit')
    } catch (error) {
        limitval = 10
    }
    await connect()
    let data = await MemberModel.find().sort({ _id: -1 }).limit(limitval)
    return NextResponse.json(data)
}

export async function POST(req) {
    const data = await req.json()
    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt('kmcsc', process.env.CRYPTO_SECRET_KEY).toString();
    await connect()
    let res = await MemberModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        clubname: data.clubname,
        password: ciphertext,
        role: data.role
    })
    await Notifications.create({
        msg: `New member added with id ${res._id.toString()}`
    })
    return NextResponse.json({ uid: res._id.toString() })
}
