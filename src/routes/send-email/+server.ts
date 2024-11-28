import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    const { to, subject, text } = await request.json();

    // Nastavení Nodemailer transportu
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Nahraďte vaším Gmailem
            pass: process.env.EMAIL_PASS // Použijte heslo aplikace (viz níže)
        }
    });

    try {
        console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
        // Odeslání e-mailu
        await transporter.sendMail({
            from: 'hackathonArab@gmail.com',
            to,
            subject,
            text
        });

        return new Response(JSON.stringify({ message: 'E-mail odeslán!' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Chyba při odesílání e-mailu.' }), { status: 500 });
    }
}
