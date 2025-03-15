import CustomError from './CustomError.util';

export function validate(param: string, value: unknown): true {
    if (!value) {
        throw new CustomError(`${param} is required`, 400);
    }

    return true;
}
