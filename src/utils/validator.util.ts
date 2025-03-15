import { isValidObjectId } from 'mongoose';
import CustomError from './CustomError.util';

export function validate(param: string, value: unknown, isMongoId?: boolean, enumObj?: object): true {
    if (!value) {
        throw new CustomError(`${param} is required`, 400);
    }

    if (isMongoId && !isValidObjectId(value)) {
        throw new CustomError(`${value} is not a valid Mongo ID`, 400);
    }

    if (enumObj && !isValidEnumValue(value, enumObj)) {
        const allowedValues = Object.values(enumObj)
            .filter((v) => typeof v !== 'string') // Exclude reverse mappings
            .join(', ');

        throw new CustomError(`${value} is not a valid value for ${param}. Allowed values: ${allowedValues}`, 400);
    }

    return true;
}

function isValidEnumValue<T extends object>(value: unknown, enumObj: T): value is T[keyof T] {
    const enumValues = Object.values(enumObj).filter((v) => typeof v !== 'string'); // Exclude reverse mappings
    const coercedValue = typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value;

    return enumValues.includes(coercedValue as T[keyof T]);
}

export const envVarValidator = (name: string, value?: string) => {
    if (
        typeof value !== 'string' ||
        // SAM template sets name as var if var not provided
        value === name
    ) {
        throw new Error(`set ${name} in env`);
    }
};
