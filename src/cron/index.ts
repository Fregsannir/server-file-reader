import axios from "axios";
import { cacheMiddleware } from "../cache/index";

import cron = require("node-cron");

export const schedule = cron.schedule("*/2 * * * * *", async () => {
    try {
        const cacheKeys: string[] = await cacheMiddleware.cache.store.keys();
        console.log(`Cache Keys length is ${cacheKeys.length}`);

        if (cacheKeys.length) {
            cacheKeys.map(async (cacheKey: string) => {
                const status = await cacheMiddleware.cache.store.get(cacheKey);

                const response = await axios.post(
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
                );

                if (response.data?.orderCode && status === "order_complete") {
                    await axios.post(
                        `${process.env.MAIN_SERVER_PROTOCOL}://${process.env.MAIN_SERVER_HOST}/landing/ticket/send`,
                        {
                            orderCode: cacheKey,
                        },
                        {
                            headers: {
                                Origin: "https://landing-api.flashback.one",
                            },
                        }
                    );
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
});
