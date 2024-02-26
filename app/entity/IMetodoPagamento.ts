import Payer from "./payer";

abstract class IMetodoPagamento {
    public payer : Payer;
    public payment_method_id : number;
    number: string = null;
    cvv: string = null;
    expirationDate: string = null;
}

export default IMetodoPagamento;