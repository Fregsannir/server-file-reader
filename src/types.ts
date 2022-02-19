export enum HTTPStatus {
    SUCCESS = 200,
    CREATED = 201,
    ACCPETED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL = 500,
}

export const WertErrorTypes: object = {
    order_failed: "Order failed, please try again",
    order_canceled: "Order canceled, please try again",
};
