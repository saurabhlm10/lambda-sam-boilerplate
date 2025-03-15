const ENV = process.env.ENV ?? undefined;
const MongoUri = process.env.MongoUri ?? undefined;

export const constants = {
    ENV,
    MongoUri,
};
