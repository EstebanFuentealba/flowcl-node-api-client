export interface IFlowApiConfig {
  apiKey: string;
  secretKey: string;
  apiURL: string;
  baseURL: string;
}
export enum PaymentMethod {
  WEBPAY = 1,
  SERVIPAG = 2,
  MULTICAJA = 3,
  ONEPAY = 4,
  CRYPOMONEDA = 5,
  TODOS_LOS_MEDIOS = 9
}
export interface IFlowSendParams {
  commerceOrder: number;
  subject: string;
  currency: string;
  amount: number;
  email: string;
  paymentMethod: PaymentMethod;
  urlConfirmation: string;
  urlReturn: string;
}
export interface IFlowApi {
  new (n: IFlowApiConfig): IFlowApiConfig;
  send(
    service: string,
    params: IFlowSendParams,
    method: "GET" | " POST" = "GET"
  ): Promise<any>;
  getPack(params: IFlowSendParams, method: "GET" | " POST" = "GET"): string;
  sign(params: IFlowSendParams): string;
  httpGet(
    url: string,
    data: string,
    sign: string
  ): Promise<{
    output: any;
    info: {
      http_code: number;
    };
  }>;
  httpPost(
    url: string,
    data: string,
    sign: string
  ): Promise<{
    output: any;
    info: {
      http_code: number;
    };
  }>;
}
declare const FlowApi: IFlowApi;

export default FlowApi;
