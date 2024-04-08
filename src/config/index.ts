import dotEnv from "dotenv";
dotEnv.config();

export const PORT: string | undefined = process.env.PORT;
export const MONGO_URI: string | undefined = process.env.MONGO_URI || '';

export const ALLOWED_HOSTS: string | undefined = process.env.ALLOWED_HOSTS;

export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
export const JWT_EXPIRE: string | undefined = process.env.JWT_EXPIRE;

export const AWS_ACCESS_KEY_ID: string | undefined = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY: string | undefined = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION: string | undefined = process.env.AWS_REGION;
export const AWS_BUCKET_NAME: string | undefined = process.env.AWS_BUCKET_NAME;

export const SENDER_EMAIL: string | undefined = process.env.SENDER_EMAIL;
export const SENDER_PHONE: string | undefined = process.env.SENDER_PHONE;

export const SENDGRID_API_KEY: string | undefined = process.env.SENDGRID_API_KEY;

export const TWILIO_ACCOUNT_SID: string | undefined = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN: string | undefined = process.env.TWILIO_AUTH_TOKEN;

export const ROZARPAY_SECRET_KEY: string | undefined = process.env.ROZARPAY_SECRET_KEY || '';
export const ROZARPAY_KEY_ID: string | undefined = process.env.ROZARPAY_KEY_ID || '';

export const GOOGLE_PASS: string | undefined = process.env.GOOGLE_PASS || '';
export const GOOGLE_EMAIL: string | undefined = process.env.GOOGLE_EMAIL || '';