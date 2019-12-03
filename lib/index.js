"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const flight_route_1 = require("./routers/flight.route");
const app = express();
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/flights', flight_route_1.default);
app.listen(3001, () => {
    console.log('Server is up and running on port numner ' + 3000);
});
//# sourceMappingURL=index.js.map