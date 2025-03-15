import mongoose from 'mongoose';
import { envVarValidator } from '../utils/validator.util';

let connection: typeof mongoose | null = null;

const MongoUri = process.env.MongoUri ?? undefined;

export const connectToDB = async () => {
    envVarValidator('MongoUri', MongoUri);
    try {
        if (!connection) {
            connection = await mongoose.connect(MongoUri as string);
        }
        return connection;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('cannot connect to db ' + error.message);
        }
    }
};
