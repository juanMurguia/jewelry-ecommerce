import { User } from "lib/users";
import { Auth } from "lib/auth";
import gen from "random-seed";
import { addMinutes } from "date-fns/addMinutes";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const seed = "asasdasd";
const random = gen.create(seed);

export async function findOrCreateAuth(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);

  if (auth) {
    console.log(auth);
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });

    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = Math.floor(Math.random() * 90000) + 10000;
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;

  await auth.push();
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Authentication Code",
      html: `<p>Your verification code is: <strong>${code}</strong></p><p>This code expires in 20 minutes.</p>`,
    });
    console.log(data);
    return "Email sent successfully";
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
