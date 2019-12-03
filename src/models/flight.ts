import { Mongoose } from 'mongoose';
const mongoose = new Mongoose();
const Schema = mongoose.Schema;
mongoose.set('debug', true);
let FlightSchema = new Schema({
    voo: { type: String, required: true, max: 9 },
    companhia: { type: String, required: true, max: 100 },
    tipoLinha: { type: String, required: true, max: 100 },
    partidaPrevista: { type: String, required: true, max: 100 },
    partidaReal: { type: String, required: true, max: 100 },
    chegadaPrevista: { type: String, required: true, max: 100 },
    chegadaReal: { type: String, required: true, max: 100 },
    situacao: { type: String, required: true, max: 100 },
    justificativa: { type: String, required: true, max: 100 },

    aeroportoOrigem: { type: String, required: true, max: 100 },
    cidadeOrigem: { type: String, required: true, max: 100 },
    estadoOrigem: { type: String, required: true, max: 2 },
    paisOrigem: { type: String, required: true, max: 100 },


    aeroportoDestino: { type: String, required: true, max: 100 },
    cidadeDestino: { type: String, required: true, max: 100 },
    estadoDestino: { type: String, required: true, max: 2 },
    paisDestino: { type: String, required: true, max: 100 },

    longDest: { type: Number, required: true },
    latDest: { type: Number, required: true },
    longOrig: { type: Number, required: true },
    latOrig: { type: Number, required: true },
});

export const Flight = mongoose.model('flights', FlightSchema);