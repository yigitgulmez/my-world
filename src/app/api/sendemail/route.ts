import type { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs-com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { from_name, from_email, message } = req.body;

        const result = await emailjs.send(
            process.env.EMAILJS_KEY1 as string,
            process.env.EMAILJS_KEY2 as string,
            { from_name, from_email, message },
            process.env.EMAILJS_KEY3 as string
        );

        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ error: 'Email sending failed' });
    }
}
