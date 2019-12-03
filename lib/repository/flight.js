"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const httpResponse_1 = require("../util/httpResponse");
const flight_1 = require("../models/flight");
const database_1 = require("../database/database");
async function insertFlights(req, res) {
    const { voo, companhia, tipoLinha, partidaPrevista, partidaReal, chegadaPrevista, chegadaReal, situacao, justificativa, aeroportoOrigem, cidadeOrigem, estadoOrigem, paisOrigem, aeroportoDestino, cidadeDestino, estadoDestino, paisDestino, longDest, latDest, longOrig, latOrig } = req.body;
    let apiResponse;
    if (!voo) {
        apiResponse = new httpResponse_1.HttpResponse(200, false, null, 'NOK', 'Ausência de parâmetros na requisição!!');
        res.status(200).send(apiResponse);
    }
    else {
        try {
            const flight = new flight_1.Flight({
                voo, companhia, tipoLinha, partidaPrevista, partidaReal,
                chegadaPrevista, chegadaReal, situacao, justificativa,
                aeroportoOrigem, cidadeOrigem, estadoOrigem, paisOrigem,
                aeroportoDestino, cidadeDestino, estadoDestino, paisDestino, longDest,
                latDest, longOrig, latOrig
            });
            await database_1.database.collection('flights').insertOne(flight);
            console.log('Salvo');
            apiResponse = new httpResponse_1.HttpResponse(200, true, null, 'OK', flight);
            res.status(200).send(apiResponse);
        }
        catch (error) {
            console.error("[API ERROR]: Erro ao interagir com admin SDK, mensagem: " + error);
            apiResponse = new httpResponse_1.HttpResponse(500, false, error, 'ERROR', null);
            res.status(500).send(apiResponse);
        }
    }
}
exports.insertFlights = insertFlights;
async function consultFlights(req, res) {
    let apiResponse;
    const { departure, from, to } = req.query;
    try {
        let response = [];
        const flights = await database_1.database.collection('flights').find({ cidadeOrigem: from, cidadeDestino: to }).toArray();
        console.log(flights);
        for (const f of flights) {
            if (moment(departure).date() == moment(f.partidaPrevista).date()
                && moment(departure).month() == moment(f.partidaPrevista).month()
                && moment(departure).year() == moment(f.partidaPrevista).year()) {
                response.push({
                    from: f.cidadeOrigem,
                    to: f.cidadeDestino,
                    date: moment(f.partidaPrevista).format('DD/MM/YYYY HH:mm'),
                    company: f.companhia
                });
            }
        }
        apiResponse = new httpResponse_1.HttpResponse(200, true, null, 'OK', response);
        res.status(200).send(apiResponse);
    }
    catch (error) {
        console.error("[API ERROR]: Erro ao interagir com admin SDK, mensagem: " + error);
        apiResponse = new httpResponse_1.HttpResponse(500, false, error, 'ERROR', null);
        res.status(500).send(apiResponse);
    }
}
exports.consultFlights = consultFlights;
//# sourceMappingURL=flight.js.map