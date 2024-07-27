import nodemailer from 'nodemailer'

// Create a transporter object using the default SMTP transport
async function sendMail(receiver, companyName) {

    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Your SMTP server host
            port: 587, // Your SMTP port
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'pcellapp@gmail.com', // Your email address
                pass: process.env.SMTP_PASSWORD // Your email password
            }
        });
    
        // Define email options
        let mailOptions = {
            from: 'pcellapp@gmail.com', // Sender email address
            to: receiver, // Recipient email address
            subject: 'Update on placement activity', // Subject line
            text: `Kindly check your placement cell app account for new job posting by ${companyName}.\nRegards\nPlacement Cell Team` // Plain text body
        };
    
        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return true;
    } catch (error) {
        console.log('Error occurred while sending email:', error);
        return false;
    }
}

export { sendMail }