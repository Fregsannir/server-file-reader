import express = require("express");
import { Request, Response, Express, Router } from "express";
import dotenv = require("dotenv");
import { HTTPStatus, WertErrorTypes } from "./src/types";
import { appAssert, checkFileExistenceAndReturnContent } from "./src/utils";
import axios from "axios";
const ExpressCache = require("express-cache-middleware");
const cacheManager = require("cache-manager");
const cors = require("cors");

const app: Express = express();
const router: Router = express.Router();
const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: "memory",
        max: 100000,
        ttl: 0,
    })
);
dotenv.config();

app.use(
    cors({
        origin: "https://test-wowsummit.flashback.one",
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

        if (hook) {
            cacheMiddleware.cache.store.set(
                hook.click_id,
                hook.type,
                { ttl: 0 },
                0
            );
        }

        appAssert(
            !WertErrorTypes[hook.type],
            WertErrorTypes[hook.type],
            HTTPStatus.BAD_REQUEST
        );

        return res.status(HTTPStatus.SUCCESS).json({ message: "OK" });
    } catch (e) {
        console.error(e);
        return res
            .status(e.status || HTTPStatus.INTERNAL)
            .json({ message: e.message });
    }
});

router.post("/wert/order-check", async (req: Request, res: Response) => {
    try {
        const { buyer, orderCode } = req.body;
        appAssert(
            buyer && orderCode,
            "Parameters `buyer` and `orderCode` are not required",
            HTTPStatus.BAD_REQUEST
        );

        const orderResponse = await axios.post(
            `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}/landing/order-update`,
            {
                orderCode: orderCode,
                buyer: buyer,
                status: cacheMiddleware.cache.store.get(orderCode),
            }
        );

        if (orderResponse.data.success) {
            await axios.post(
                `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}/landing/ticket/send`,
                {
                    buyer: "buyer",
                    orderCode: orderCode,
                }
            );
        }

        appAssert(
            orderResponse.data.success,
            orderResponse.data.message,
            HTTPStatus.INTERNAL
        );

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
