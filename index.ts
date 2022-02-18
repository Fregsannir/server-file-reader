import express = require("express");
import { Request, Response, Express, Router } from "express";
import cors = require("cors");
import dotenv = require("dotenv");
import { HTTPStatus } from "./src/types";
import { appAssert, checkFileExistenceAndReturnContent } from "./src/utils";

const app: Express = express();
const router: Router = express.Router();
dotenv.config();

app.use(cors());

router.get("/:organizerName", async (req: Request, res: Response) => {
    try {
        appAssert(
            req.params.organizerName,
            "Parameter `organizerName` is required",
            HTTPStatus.BAD_REQUEST
        );
        const events = await checkFileExistenceAndReturnContent(
            req.params.organizerName
        );
        return res
            .status(HTTPStatus.SUCCESS)
            .json({ message: "OK", events: JSON.parse(events.toString()) });
    } catch (e) {
        console.error(e);
        return res
            .status(e.status || HTTPStatus.INTERNAL)
            .json({ message: e.message });
    }
});

router.get("/hook", async (req: Request, res: Response) => {
    try {
        const hook = req.body;
        return res.status(HTTPStatus.SUCCESS).json({ data: hook });
    } catch (e) {
        console.error(e);
        return res
            .status(e.status || HTTPStatus.INTERNAL)
            .json({ message: e.message });
    }
});

app.use(router);

app.use("*", async (req: Request, res: Response) => {
    return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({
            message: `Route ${req.originalUrl} with method ${req.method} Not Found`,
        });
});

app.listen(Number(process.env.SERVER_PORT), () =>
    console.info(
        `Server is running on ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    )
);
