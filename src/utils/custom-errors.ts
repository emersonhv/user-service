import Logger from "@/utils/logger";

export class CustomError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }

    static badRequest(message: string) {
        Logger.error(message);
        return new CustomError(400, message);
    }

    static unauthorized(message: string) {
        Logger.error(message);
        return new CustomError(401, message);
    }

    static forbidden(message: string) {
        Logger.error(message);
        return new CustomError(403, message);
    }

    static notFound(message: string) {
        Logger.error(message);
        return new CustomError(404, message);
    }

    static internalServer(message: string = 'Internal Server Error') {
        Logger.error(message);
        return new CustomError(500, message);
    }
}