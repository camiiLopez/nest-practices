"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CARS_SEED = void 0;
const crypto_1 = require("crypto");
exports.CARS_SEED = [
    { id: (0, crypto_1.randomUUID)(), model: 'Corolla', brand: 'Toyota' },
    { id: (0, crypto_1.randomUUID)(), model: 'Civic', brand: 'Honda' },
    { id: (0, crypto_1.randomUUID)(), model: 'Cherokee', brand: 'Jeep' }
];
//# sourceMappingURL=cars.seed.js.map