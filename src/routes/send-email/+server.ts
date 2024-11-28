import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import type { RequestHandler } from '@sveltejs/kit';

dotenv.config();

interface EmailRequest {
    to: string;
    subject: string;
    text: string;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        // Parsování příchozího JSON požadavku
        const { to, subject, text }: EmailRequest = await request.json();

        // Nastavení Nodemailer transportu
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Váš Gmail
                pass: process.env.EMAIL_PASS // Heslo aplikace
            }
        });

        // Odeslání e-mailu
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Výchozí odesílatel
            to,
            subject,
            text
        });

        return new Response(JSON.stringify({ message: 'E-mail odeslán!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Chyba při odesílání e-mailu:', error);

        return new Response(JSON.stringify({ error: 'Chyba při odesílání e-mailu.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
