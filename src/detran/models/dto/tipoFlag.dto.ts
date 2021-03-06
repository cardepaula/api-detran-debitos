import { Debito } from '../wsib_models/debito.model';
import { TypeDeb } from '../enuns/typeDeb.enum';
import { MensagemErro } from '../../common/mensagem_erro/mensagemErro';
import { MsgErro } from '../enuns/msgErro.enum';
import { ApiModelProperty } from '@nestjs/swagger';

export class TipoFlagDTO {

    @ApiModelProperty({
        description: 'Esse atributo descreve se o debito deve estar marcado quando exibido ou não.',
        example: true,
    })
    checked: boolean;
    @ApiModelProperty({
        description: 'Esse atributo descreve se o debito deve estar habilitado ou não para a seleção.',
        example: false,
    })
    disabled: boolean;

    constructor(debito: Debito, tipo_debito: string) {

        switch (tipo_debito.toUpperCase()) {
            case TypeDeb.LICATUAL:
                this.geraFlag(debito.LicenciamentoExercicio);
                break;
            case TypeDeb.LICANTER:
                this.geraFlag(debito.LicenciamentoExercicio);
                break;
            case TypeDeb.IPVAATUAL:
                this.geraFlag(debito.IpvaExercicio);
                break;
            case TypeDeb.IPVAANTER:
                this.geraFlag(debito.IpvaAnterior);
                break;
            case TypeDeb.DPVATATUA:
                this.geraFlag(debito.DpvatExercicio);
                break;
            case TypeDeb.DPVATANTE:
                this.geraFlag(debito.DpvatAnterior);
                break;
            case TypeDeb.MULTA:
                this.geraFlag(debito.Multas);
                break;
            default:
                throw new MensagemErro(MsgErro.SERV_GERAR_GUIA_TYP);
        }
    }

    geraFlag(flag: number){

        switch (Number(flag)) {
            case 0:
                this.checked = false;
                this.disabled = false;
                break;
            case 1:
                this.checked = true;
                this.disabled = true;
                break;
            case 2:
                this.checked = true;
                this.disabled = false;
                break;
            case 3:
                this.checked = false;
                this.disabled = true;
                break;
            default:
                throw new MensagemErro(MsgErro.FLAG_ERR);
        }
    }
}