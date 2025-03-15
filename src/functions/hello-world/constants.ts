const ENV = process.env.ENV ?? undefined;
const MONGO_URI = process.env.MONGO_URI ?? undefined;

export const constants = {
    ENV,
    MONGO_URI,
};
