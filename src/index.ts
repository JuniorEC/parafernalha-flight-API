import * as express from 'express';
import { Application, } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import flightRoute from './routers/flight.route';

const app: Application = express();
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/flights', flightRoute);

app.listen(3001, () => {
    console.log('Server is up and running on port numner ' + 3000);
});
