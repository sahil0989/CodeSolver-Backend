const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const contact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        // res.status(400).json({ message: "All fields are required" })
        res.writeHead(301,
            { Location: 'https://codesolver.vercel.app/fieldRequiredError.html' }
        );
        res.end();
    }

    const contactResponse = { name, email, subject, message }
    if (!contactResponse) {
        // res.status(400).json({ message: "Details not found" })
        res.writeHead(301,
            { Location: 'https://codesolver.vercel.app/detailsError.html' }
        );
        res.end();
    }

    Contact.create(contactResponse)
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.emailID,
                pass: process.env.pass,
            },
        });

        var mailList = [
            email,
            process.env.emailID
        ]

        let info = await transporter.sendMail({
            from: process.env.emailID,
            to: mailList,
            subject: "Query Mail",
            html: `
            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail Template</title>
</head>

<body>
    <h1>CodeSolver</h1>
    <br><br>
    <h3>Thanks for Contacting Us !</h3>
    <p>We will contact you within 24 hours.</p>
</body>

</html>
            `,
        });


        if (info.messageId) {
            res.writeHead(301,
                { Location: 'https://codesolver.vercel.app/contactSuccess.html' }
            );
            res.end();
        } else {
            res.writeHead(301,
                { Location: 'https://codesolver.vercel.app/contactFailed.html' }
            );
            res.end();
        }
    }
    catch (error) {
        res.writeHead(301,
            { Location: 'https://codesolver.vercel.app/contactFailed.html' }
        );
        res.end();
    }
}

module.exports = contact