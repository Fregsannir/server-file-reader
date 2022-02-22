import axios from "axios";
import { CronJob } from "cron";
import { appAssert } from "src/utils";
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
                          const response = (
                              await axios.post(
                                  `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}/landing/orders`,
                                  {
                                      orderCode: cacheKey,
                                      status: await cacheMiddleware.cache.store.get(
                                          cacheKey
                                      ),
                                  }
                              )
                          ).data;

                          if (response.orderCode) {
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
