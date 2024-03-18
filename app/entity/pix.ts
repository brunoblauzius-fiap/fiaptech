import IMetodoPagamento from "./IMetodoPagamento";
import PaymentoMethods from '../entity/enum/PaymentoMethods';
import Payer from "./payer";

class Pix implements IMetodoPagamento {
    constructor(readonly payer: Payer) {}
    public payment_method_id = PaymentoMethods.PIX;
    number: string = null;
    cvv: string  = null;
    expirationDate: string  = null;
}

export default Pix;
