import SparkPost from "sparkpost"
import { configDotenv } from "dotenv"
configDotenv()
const client = new SparkPost(process.env.SPARKPOST_API_KEY)

const sender = (email, otp) => {
    client.transmissions
        .send({
            options: {
                sandbox: false,
            },
            content: {
                from: "threadz@mailer.jitenderkumar.in",
                subject: `Hello There...`,
                html: `<html><body><h1>Welcome To Threadz</h1><p>Thankyou for registering. Here is your OTP - ${otp} for verification...😍!</p></body></html>`,
            },
            recipients: [{ address: email }],
        })
        .then((data) => {
            console.log("Woohoo! You just sent your first mailing!")
            console.log(data)
        })
        .catch((err) => {
            console.log("Whoops! Something went wrong")
            console.log(err)
        })
}
export default sender
