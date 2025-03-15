import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { successReturn } from '../../utils/successReturn.util';
import { IHelloWorldFunctonQueryParams } from './types';
import { errorHandler } from '../../utils/errorHandler.util';
import { envValidator, validator } from './validator';
import { connectToDB } from '../../config/db.config';
import { constants } from './constants';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { ENV, MongoUri } = constants;

        const envValidatorBody = {
            ENV,
            MongoUri,
        };
        console.log('envValidatorBody', envValidatorBody);
        envValidator(envValidatorBody);

        const { name = undefined } = (event.queryStringParameters ?? {}) as unknown as IHelloWorldFunctonQueryParams;

        const validatorBody = {
            name,
        };

        validator(validatorBody);

        await connectToDB();

        const message = 'Hello, ' + name;
        return successReturn(message);
    } catch (err) {
        return errorHandler(err);
    }
};
