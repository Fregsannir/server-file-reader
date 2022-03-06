import axios from "axios";
import { cacheMiddleware } from "../cache/index";
import { Web3Provider } from "../blockchain/index";

import cron = require("node-cron");

export const schedule = cron.schedule("* */2 * * * *", async () => {
    try {
        const cacheKeys: string[] = await cacheMiddleware.cache.store.keys();
        console.log(`Cache Keys length is ${cacheKeys.length}`);

        if (cacheKeys.length) {
            cacheKeys.map(async (cacheKey: string, i: number) => {
                const status = await cacheMiddleware.cache.store.get(cacheKey);
                console.log(status);

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
                    await cacheMiddleware.cache.store.del(cacheKey);

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

export const cryptoShedule = cron.schedule("* */2 * * * *", async () => {
    try {
        const response = await axios.get(
            `${process.env.MAIN_SERVER_PROTOCOL}://${process.env.MAIN_SERVER_HOST}/landing/crypto-orders`,
            {
                headers: {
                    Origin: "https://landing-api.flashback.one",
                },
            }
        );

        if (response.data.orders) {
            response.data.orders.map(async (order: any, i: number) => {
                const { web3 } = new Web3Provider(Number(order.chainId));
                let statusResponse: any;

                const transaction = await web3.eth.getTransactionReceipt(
                    order.txHash
                );

                if (transaction !== null) {
                    statusResponse = await axios.post(
                        `${process.env.MAIN_SERVER_PROTOCOL}://${process.env.MAIN_SERVER_HOST}/landing/status`,
                        {
                            orderCode: order.orderCode,
                            status: transaction.status
                                ? "order_complete"
                                : "order_failed",
                        },
                        {
                            headers: {
                                Origin: "https://landing-api.flashback.one",
                            },
                        }
                    );

                    if (transaction.status) {
                        await axios.post(
                            `${process.env.MAIN_SERVER_PROTOCOL}://${process.env.MAIN_SERVER_HOST}/landing/ticket/send`,
                            {
                                orderCode: order.orderCode,
                            },
                            {
                                headers: {
                                    Origin: "https://landing-api.flashback.one",
                                },
                            }
                        );
                    }
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
});
