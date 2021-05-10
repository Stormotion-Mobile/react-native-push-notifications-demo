import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const APNTokenKey = process.env.APN_TOKEN_KEY ?? '';
export const APNTokenKeyId = process.env.APN_TOKEN_KEY_ID;
export const appleTeamId = process.env.APPLE_TEAM_ID;
export const firebaseServerKey = process.env.FIREBASE_SERVER_KEY;
export const nodeEnv = process.env.NODE_ENV;
