import { UUID } from "crypto";
import Cartao from "./cartao";
import Pedido from "./pedido";
import { v4 as uuidv4 } from 'uuid';
import { StatusCheckout } from "./enum/statusCheckout";
import IMetodoPagamento from "./IMetodoPagamento";

class Checkout {

    public uuid: String;

    public status: Number;

    public payload : string;

    private payment_method : number;

    public external_reference : string;

    constructor(readonly pedido: Pedido, readonly metodoPagamento?: IMetodoPagamento, readonly id?) {
        this.uuid = uuidv4();
        this.status = StatusCheckout.AGUARDANDO_PAGAMENTO;
        this.setPaymentMethod(metodoPagamento.payment_method_id);
    }

    public setPaymentMethod = (value: number) => {
        this.payment_method = value;
    }

    public getPaymentMethod = () : number => {
        return this.payment_method;
    }

    public setStatus = (status: Number) => {
        this.status = status;
    }

    public getStatus = () => {
        return this.status;
    }

}

export default Checkout;