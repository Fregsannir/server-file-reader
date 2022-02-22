const ExpressCache = require("express-cache-middleware");
const cacheManager = require("cache-manager");

export const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: "memory",
        max: 100000,
        ttl: 0,
    })
);