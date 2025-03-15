import { validate } from '../../utils/validator.util';
import { IHelloWorldFunctionEnvValidator, IHelloWorldFunctionQueryParamsValidator } from './types';

export const validator = (data: IHelloWorldFunctionQueryParamsValidator) => {
    const { name } = data;
    validate('name', name);
};

export const envValidator = (data: IHelloWorldFunctionEnvValidator) => {
    const { ENV } = data;

    envVarValidator('ENV', ENV);
};

const envVarValidator = (name: string, value?: string) => {
    if (typeof value !== 'string') {
        throw new Error(`set ${name} in env`);
    }
};
