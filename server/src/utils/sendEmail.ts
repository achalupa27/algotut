import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'uq63hour4ah4lkba@ethereal.email',
            pass: 'JewFqNB5gRayAZgzdH',
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: to, // list of receivers
        subject: 'Change Password', // Subject line
        html, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
