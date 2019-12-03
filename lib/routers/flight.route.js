"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flight_1 = require("../repository/flight");
const router = express_1.Router();
router.post('/', flight_1.insertFlights);
router.get('/', flight_1.consultFlights);
exports.default = router;
//# sourceMappingURL=flight.route.js.map