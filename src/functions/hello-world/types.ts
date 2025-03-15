export interface IHelloWorldFunctonQueryParams {
    name: string;
}

export interface IHelloWorldFunctionQueryParamsValidator {
    name?: string;
}

export interface IHelloWorldFunctionEnvValidator {
    ENV?: string;
    MongoUri?: string;
}
