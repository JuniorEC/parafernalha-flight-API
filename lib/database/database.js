"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const csv = require("csvtojson");
const path = require("path");
const flight_1 = require("../models/flight");
const uri = "mongodb://maga:Magazine123@ds063330.mlab.com:63330/magalu";
console.log('Iniciando database');
let mongoDB = process.env.MONGODB_URI || uri;
const mongoose = new mongoose_1.Mongoose();
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(e => console.log('Conectado'));
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
exports.database = mongoose.connection;
exports.database.on('error', console.error.bind(console, 'MongoDB connection error:'));
exports.database.collection('flights').countDocuments(function (err, count) {
    if (count <= 0) {
        carga();
    }
});
async function carga() {
    for (let i = 1; i < 11; i++) {
        let filePath = path.join(path.dirname(__dirname), `carga/carga_${i}.csv`);
        await csv()
            .fromFile(filePath)
            .then(async (jsonObj) => {
            for (let obj of jsonObj) {
                const flight = new flight_1.Flight({
                    voo: obj.Voos,
                    companhia: obj.Companhia.Aerea,
                    tipoLinha: obj.Codigo.Tipo,
                    partidaPrevista: obj.Partida.Prevista,
                    partidaReal: obj.Partida.Real,
                    chegadaPrevista: obj.Chegada.Prevista,
                    chegadaReal: obj.Chegada.Real,
                    situacao: obj.Situacao.Voo,
                    justificativa: obj.Codigo.Justificativa,
                    aeroportoOrigem: obj.Aeroporto.Origem,
                    cidadeOrigem: obj.Cidade.Origem,
                    estadoOrigem: obj.Estado.Origem,
                    paisOrigem: obj.Pais.Origem,
                    aeroportoDestino: obj.Aeroporto.Destino,
                    cidadeDestino: obj.Cidade.Destino,
                    estadoDestino: obj.Estado.Destino,
                    paisDestino: obj.Pais.Destino,
                    longDest: obj.LongDest,
                    latDest: obj.LatDest,
                    longOrig: obj.LongOrig,
                    latOrig: obj.LatOrig
                });
                await exports.database.collection('flights').insertOne(flight);
            }
        });
        console.log(`Carga ${i} carregada`);
    }
}
//# sourceMappingURL=database.js.map