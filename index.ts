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

        if (hook.type === "order_complete") {
            await axios.post(
                `${process.env.NEXT_PUBLIC_MAIN_PROTOCOL}://${process.env.NEXT_PUBLIC_MAIN_HOST}/landing/order-update`,
                {
                    cacheManager,
                }
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

router.post("/wert/order-cache", async (req: Request, res: Response) => {
    try {
        appAssert(
            req.body.buyer && req.body.orders,
            "Parameters `buyer` and `orders` are required",
            HTTPStatus.BAD_REQUEST
        );

        await cacheMiddleware.cache.store.set(
            `${req.body.buyer}_orders`,
            req.body.price,
            { ttl: 0 },
            0
        );
        console.log(
            await cacheMiddleware.cache.store.get(`${req.body.buyer}_orders`)
        );

        return res.status(HTTPStatus.CREATED).json({ message: "OK" });
    } catch (e) {
        console.error(e);
        return res
            .status(e.status || HTTPStatus.BAD_REQUEST)
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
