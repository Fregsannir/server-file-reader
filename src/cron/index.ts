import axios from "axios";
import { CronJob } from "cron";
import { cacheMiddleware } from "../cache/index";

export class Cron {
    cron: CronJob;

    constructor() {
        this.cron = new CronJob("*/2 * * * * *", async () => {
            try {
                const cacheKeys: string[] =
                    await cacheMiddleware.cache.store.keys();
                console.log(`Cache Keys length is ${cacheKeys.length}`);
                cacheKeys.length
                    ? cacheKeys.map(async (cacheKey: string) => {
                          const status = await cacheMiddleware.cache.store.get(
                              cacheKey
                          );

                          const response = (
                              await axios.post(
                                  `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}/landing/status`,
                                  {
                                      orderCode: cacheKey,
                                      status: await cacheMiddleware.cache.store.get(
                                          cacheKey
                                      ),
                                  }
                              )
                          ).data;

                          if (response.orderCode && status === "order_complete") {
                              await axios.post(
                                  `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}/landing/ticket/send`,
                                  {
                                      orderCode: cacheKey,
                                  }
                              );
                          }
                      })
                    : null;
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cron.running) {
            this.cron.start();
        }
        console.info("CronJob was initialized in constructor...");
    }
}
