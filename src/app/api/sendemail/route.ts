import { NextResponse } from "next/server";
import emailjs from "emailjs-com";

export async function POST(req: Request) {
    try {
        const { from_name, from_email, message } = await req.json();

        const result = await emailjs.send(
            process.env.EMAILJS_KEY1 as string,
            process.env.EMAILJS_KEY2 as string,
            { from_name, from_email, message },
            process.env.EMAILJS_KEY3 as string
        );

        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
    }
}
