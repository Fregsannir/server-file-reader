import axios from "axios";
import { cacheMiddleware } from "../cache/index";

import cron = require("node-cron");

export const schedule = cron.schedule("* */2 * * * *", async () => {
    const cacheKeys: string[] = await cacheMiddleware.cache.store.keys();
    console.log(`Cache Keys length is ${cacheKeys.length}`);

    if (cacheKeys.length) {
        cacheKeys.map(async (cacheKey: string, i: number) => {
            const status = await cacheMiddleware.cache.store.get(cacheKey);

            axios
                .post(
                    `${process.env.MAIN_SERVER_PROTOCOL}://${process.env.MAIN_SERVER_HOST}/landing/status`,
                    {
                        orderCode: cacheKey,
                        status: await cacheMiddleware.cache.store.get(cacheKey),
                    },
                    {
                        headers: {
                            Origin: "https://landing-api.flashback.one",
                        },
                    }
                )
                .then((res) => {
                    if (res.data?.orderCode && status === "order_complete") {
                        setTimeout(() => {
                            axios
                                .post(
                                    `${process.env.MAIN_SERVER_PROTOCOL}://${process.env.MAIN_SERVER_HOST}/landing/ticket/send`,
                                    {
                                        orderCode: cacheKey,
                                    },
                                    {
                                        headers: {
                                            Origin: "https://landing-api.flashback.one",
                                        },
                                    }
                                )
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((e) => console.error(e));
                        }, i * 10000);
                    }
                })
                .catch((e) => console.error(e));
        });
    }
});
