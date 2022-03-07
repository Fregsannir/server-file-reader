import express from "express";
import { Request, Response, Express, Router } from "express";
import * as dotenv from "dotenv";
import { HTTPStatus } from "./src/types";
import {
    appAssert,
    checkFileExistenceAndReturnContent,
    checkRegexPattern,
} from "./src/utils";
import { cryptoShedule, schedule } from "./src/cron/index";
import { cacheMiddleware } from "./src/cache/index";
import { tokens } from "./src/blockchain/types";
import { Web3Provider } from "./src/blockchain/index";
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

router.get("/partner/:organizerName", async (req: Request, res: Response) => {
    try {
        appAssert(
            req.params.organizerName,
            "Parameter `organizerName` is required",
            HTTPStatus.BAD_REQUEST
        );
        const events = await checkFileExistenceAndReturnContent(
            req.params.organizerName.toLowerCase()
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

router.get("/currency/token/:chainId?", async (req: Request, res: Response) => {
    try {
        if (req.params.chainId) {
            appAssert(
                Number(req.params.chainId),
                "Parameter `chainId` must be a valid number",
                HTTPStatus.BAD_REQUEST
            );

            return res.status(HTTPStatus.SUCCESS).json({
                tokens: (await tokens())[Number(req.params.chainId)] || null,
            });
        }

        return res.status(HTTPStatus.SUCCESS).json({ tokens: await tokens() });
    } catch (e) {
        console.error(e);
        return res
            .status(e.status || HTTPStatus.INTERNAL)
            .json({ message: e.message });
    }
});

router.get(
    "/eth/transaction/:chainId/:txHash?",
    async (req: Request, res: Response) => {
        try {
            appAssert(
                req.params.chainId,
                "Parameter `chainId` is required",
                HTTPStatus.BAD_REQUEST
            );
            appAssert(
                Number(req.params.chainId),
                "Parameter `chainId` must be a valid number",
                HTTPStatus.BAD_REQUEST
            );

            const { web3 } = new Web3Provider(Number(req.params.chainId));

            if (req.params.txHash) {
                appAssert(
                    checkRegexPattern(
                        req.params.txHash,
                        /^0x([A-Fa-f0-9]{64})$/
                    ),
                    "Parameter `txHash` doesn't match regex pattern",
                    HTTPStatus.BAD_REQUEST
                );

                const transaction = await web3.eth.getTransactionReceipt(
                    req.params.txHash
                );
                appAssert(
                    transaction !== null,
                    "Transaction is pending",
                    HTTPStatus.INTERNAL
                );

                return res.status(HTTPStatus.SUCCESS).json({ tx: transaction });
            }

            return res.status(HTTPStatus.SUCCESS).json({
                web3: await web3.eth.getTransactionReceipt(
                    "0x7149a91c42a0147fa031564f52721941409bb593564a166fbb548f9d9e353908"
                ),
            });
        } catch (e) {
            console.error(e);
            return res
                .status(e.status || HTTPStatus.INTERNAL)
                .json({ message: e.message });
        }
    }
);

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
cryptoShedule.start();
