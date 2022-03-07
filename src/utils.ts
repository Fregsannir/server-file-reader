import { HTTPStatus } from "./types";
import fs = require("fs/promises");

export class ApplicationError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode || HTTPStatus.INTERNAL;
    }
}

export function appAssert(
    statement: any,
    message: string,
    statusCode: number
): Boolean | ApplicationError {
    if (!statement) {
        throw new ApplicationError(statusCode, message);
    }
    return true;
}

export async function checkFileExistenceAndReturnContent(filename: string) {
    try {
        const events = await fs.readFile(
            `./src/${filename}.json`
        );
        return events;
    } catch (e) {
        throw new ApplicationError(
            HTTPStatus.NOT_FOUND,
            `File with name "${filename}" not found`
        );
    }
}

export function checkRegexPattern(string: string, regex: RegExp) {
    return string.search(regex) !== -1 ? true : false;
}
