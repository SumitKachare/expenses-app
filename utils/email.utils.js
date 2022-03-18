import nodemailer from  "nodemailer"

export const sendMail = (options) => {

    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from : process.env.EMAIL_FROM,
        to : options.to,
        subject : options.subject,
        html : options.text
    }


    return new Promise((resolve  , reject)=>{
        transporter.sendMail(mailOptions , function(err , info){
            if (err) {
                console.log("Email err" , err);
                return reject(err)
            }
            console.log("Email info" , info);
            return resolve(info)
        })
    })
}