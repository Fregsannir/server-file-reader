import cacheManager from "cache-manager";
const ExpressCache = require("express-cache-middleware");

export const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: "memory",
        max: 100000,
        ttl: 0,
    })
);