import IMetodoPagamento from "./IMetodoPagamento";
import PaymentoMethods from '../entity/enum/PaymentoMethods';
import Payer from "./payer";

class Cartao implements IMetodoPagamento {
    constructor(readonly payer: Payer,readonly number: string, readonly cvv: string, readonly expirationDate: string) {
        if (!number.trim()) {
            throw new Error("Número do Cartão é obrigatório.");
        }
        if (String(number).replace(/-/g, '').length != 16) {
            throw new Error("Número do Cartão DEVE conter 16 digitos.");
        }
        if (!String(cvv).trim()) {
            throw new Error("CVV do Cartão é obrigatório.");
        }
        if (!String(expirationDate).trim()) {
            throw new Error("Data de Expiração do Cartão é obrigatória.");
        }
    }

    public payment_method_id = PaymentoMethods.CARD_CREDIT;
}

export default Cartao;