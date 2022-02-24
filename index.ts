import express = require("express");
import { Request, Response, Express, Router } from "express";
import dotenv = require("dotenv");
import { HTTPStatus } from "./src/types";
import { appAssert, checkFileExistenceAndReturnContent } from "./src/utils";
import { schedule } from "./src/cron/index";
import { cacheMiddleware } from "./src/cache/index";

import cors from "cors";

const app: Express = express();
const router: Router = express.Router();

dotenv.config();

app.use(
    cors({
        origin: `${process.env.CORS_PROTOCOL}://${process.env.CORS_HOST}`,
    }),
    express.json()
);

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

router.post("/wert/hook", async (req: Request, res: Response) => {
    try {
        const hook = req.body;
        console.log(hook);

        if (hook) {
            await cacheMiddleware.cache.store.set(
                hook.click_id,
                hook.type,
                { ttl: 0 },
                0
            );
        }

        return res.status(HTTPStatus.SUCCESS).json({ message: "OK" });
    } catch (e) {
        console.error(e);
        return res
            .status(e.status || HTTPStatus.INTERNAL)
            .json({ message: e.message });
    }
});

app.use(router);
cacheMiddleware.attach(app);

app.use("*", async (req: Request, res: Response) => {
    return res.status(HTTPStatus.BAD_REQUEST).json({
        message: `Route ${req.originalUrl} with method ${req.method} Not Found`,
    });
});

app.listen(Number(process.env.SERVER_PORT), () =>
    console.info(
        `Server is running on ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    )
);

schedule.start();
