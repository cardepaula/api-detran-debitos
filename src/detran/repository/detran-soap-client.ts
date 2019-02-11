import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as soap from 'soap-as-promised';
import { SegurancaDetran } from '../models/segurancaDetran.model';
import { DebitosWS } from '../common/config/debitosWS.config';

@Injectable()
export class DetranSoapClient {
    _client: any;
    debitosWS: DebitosWS;

    constructor() {
        this.debitosWS = new DebitosWS();
        this._client = soap.createClient(this.debitosWS.serviceUrl)
        .then(client => {
            client.addSoapHeader(
                {
                    SegurancaDetran: new SegurancaDetran(),
                },
                undefined,
                '__tns__',
                'http://tempuri.org/',
            );
            return client;
        }).catch(error => {
            console.error(error);
            return {
                mensagemErro: 'Erro em conectar ao repositorio.',
            };
        });
    }
}
