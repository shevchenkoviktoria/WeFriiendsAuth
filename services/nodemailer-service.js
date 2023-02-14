const nodemailer = require("nodemailer");

// Configuring sender info for sending confirmation emails
const transport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
        secure: false,
    auth: {
        user: 'wefriiends.confirm@gmail.com',
        pass: 'grdbxdfdcosvawmq',
    },
});

module.exports.sendConfirmationEmail = (email, confirmationCode) => {
    console.log("params ",email, confirmationCode);
   transport
        .sendMail({
            from: 'wefriiends.confirm@gmail.com',    //process.env.user,
            to: email,
            subject: "Please confirm your email",
            html: `<div><img src="https://res.cloudinary.com/e-bechmanis/image/upload/v1671245485/Group63_zlw4bt.png" alt="logo" style="display:inline-block;width:225px;margin-bottom:2rem">
             <div style="font-family:sans-serif;font-size:14px;line-height:22px"><h2 style="color:#F46B5D;margin-bottom:3rem">Confirm email</h2>
                <div style="max-width:421px"><p>Hello, dear!</p>
                    <p>Thank you for registering with WeFriiends!<br/>To confirm your e-mail address, please click the button below.</p><br/>
                    <a href=http://localhost:8080/api/auth/confirm/${confirmationCode} style="display:flex;align-items:center;width:288px;justify-content:center;text-align:center;padding:18px 24px;gap:16px;background:#FB8F67;border-radius:10px;text-decoration:none;color:white;font-size:18px;font-weight:600"> Confirm email</a>
                    <br/><br/>
                    <p>Still have questions? Head over to our comprehensive <a href="https://wefriiends.atlassian.net/servicedesk/customer/portals" style="color:#F46B5D">Help Center<a/> or just reach out to our <a href="https://wefriiends.atlassian.net/servicedesk/customer/portals" style="color:#F46B5D">support team.</a></p>
                    <p>We look forward to having you on board.</p>
                    <p>Kind regards,<br/>The WeFriiends Team</p><div/></div>
                    <div style="color:#F46B5D;position:absolute;width:100%;height:120px;padding-top:1rem;background-color:#FFF1EC">www.wefriiends.com<br/><br/><a href="mailto:info@wefriiends.com" style="color:#F46B5D">contact us</a>&nbsp; &nbsp; &nbsp; &nbsp; unsubscribe</div></div>`,
        })
   .catch((err) => console.log(err));
};
