import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendApplicationEmail = async (
  recruiterEmail: string,
  studentName: string,
  studentEmail: string,
  resumeUrl: string,
  skills: string[]
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: recruiterEmail,
    subject: "New Job Application Received",
    html: `
      <h2>New Job Application</h2>
      <p><strong>Name:</strong> ${studentName}</p>
      <p><strong>Email:</strong> ${studentEmail}</p>
      <p><strong>Skills:</strong> ${skills.join(", ")}</p>
      <p><strong>Resume:</strong> <a href="${resumeUrl}">View Resume</a></p>
    `,
  });
};

export default transporter;
