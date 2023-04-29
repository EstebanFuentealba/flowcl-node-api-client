export interface IFlowApiConfig {
  apiKey: string;
  secretKey: string;
  apiURL: string;
  baseURL?: string;
}
export enum PaymentMethod {
  WEBPAY = 1,
  SERVIPAG = 2,
  MULTICAJA = 3,
  ONEPAY = 4,
  CRYPOMONEDA = 5,
  TODOS_LOS_MEDIOS = 9,
}
export enum FlowStatus {
  PENDING_PAYMENT = 1,
  PAID = 2,
  REJECTED = 3,
  CANCELED = 4,
}
export interface IFlowGetStatus {
  token: string;
}
export interface IFlowSendParams {
  commerceOrder: string;
  subject: string;
  currency: string;
  amount: number;
  email: string;
  paymentMethod: PaymentMethod;
  urlConfirmation: string;
  urlReturn: string;
}
export interface IFlowPaymentStatus {
  flowOrder: number;
  commerceOrder: string;
  requestDate: string;
  status: FlowStatus;
  subject: string;
  currency: string;
  amount: number;
  payer: string;
  optional: {
    [key: string]: string;
  };
  pending_info: {
    media: string;
    date: string;
  };
  paymentData: {
    date: string;
    media: string;
    conversionDate: string;
    conversionRate: number;
    amount: number;
    currency: string;
    fee: number;
    balance: number;
    transferDate: string;
  };
}
export interface IFlowPaymentCreate {
  url: string;
  token: string;
  flowOrder: number;
}
type HTTPMethod = "GET" | "POST";
export interface IFlowApi {
  new (n: IFlowApiConfig): IFlowApi;
  send(
    service: string,
    params: IFlowSendParams | IFlowGetStatus,
    method: HTTPMethod
  ): Promise<IFlowPaymentStatus | IFlowPaymentCreate>;
  getPack(params: IFlowSendParams, method: HTTPMethod): string;
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
