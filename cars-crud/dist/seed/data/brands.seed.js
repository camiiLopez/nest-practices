"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRANDS_SEED = void 0;
const crypto_1 = require("crypto");
exports.BRANDS_SEED = [
    { id: (0, crypto_1.randomUUID)(), name: 'Volvo', createdAt: new Date().getTime() },
    { id: (0, crypto_1.randomUUID)(), name: 'Honda', createdAt: new Date().getTime() }
];
//# sourceMappingURL=brands.seed.js.map