import { Request, Response } from 'express';
import * as moment from 'moment';
import { HttpResponse } from '../util/httpResponse';
import { Flight } from '../models/flight';
import { database } from '../database/database';



async function insertFlights(req: Request, res: Response) {
    const { voo, companhia, tipoLinha, partidaPrevista, partidaReal,
        chegadaPrevista, chegadaReal, situacao, justificativa,
        aeroportoOrigem, cidadeOrigem, estadoOrigem, paisOrigem,
        aeroportoDestino, cidadeDestino, estadoDestino, paisDestino, longDest,
        latDest, longOrig, latOrig } = req.body;
    let apiResponse;

    if (!voo) {

        apiResponse = new HttpResponse(200, false, null, 'NOK', 'Ausência de parâmetros na requisição!!');
        res.status(200).send(apiResponse);
    } else {
        try {
            const flight = new Flight({
                voo, companhia, tipoLinha, partidaPrevista, partidaReal,
                chegadaPrevista, chegadaReal, situacao, justificativa,
                aeroportoOrigem, cidadeOrigem, estadoOrigem, paisOrigem,
                aeroportoDestino, cidadeDestino, estadoDestino, paisDestino, longDest,
                latDest, longOrig, latOrig
            });
            await database.collection('flights').insertOne(flight);
            console.log('Salvo');
            apiResponse = new HttpResponse(200, true, null, 'OK', flight);
            res.status(200).send(apiResponse);

        } catch (error) {
            console.error("[API ERROR]: Erro ao interagir com admin SDK, mensagem: " + error);
            apiResponse = new HttpResponse(500, false, error, 'ERROR', null);
            res.status(500).send(apiResponse);
        }
    }

}

async function consultFlights(req: Request, res: Response) {

    let apiResponse;

    const { departure, from, to } = req.query;

    try {

        let response: any = [];
        const flights = await database.collection('flights').find({ cidadeOrigem: from, cidadeDestino: to }).toArray();
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

        apiResponse = new HttpResponse(200, true, null, 'OK', response);
        res.status(200).send(apiResponse);
    } catch (error) {
        console.error("[API ERROR]: Erro ao interagir com admin SDK, mensagem: " + error);
        apiResponse = new HttpResponse(500, false, error, 'ERROR', null);
        res.status(500).send(apiResponse);
    }
}

export {
    insertFlights,
    consultFlights
}