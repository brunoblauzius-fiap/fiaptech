import Checkout from "../entity/checkout";
import ICheckout from "../interfaces/ICheckout";
import { IDataBase } from "../interfaces/IDataBase";

class CheckoutPagamentoRepository implements ICheckout
{
    private nomeTabela = "checkout";
    public db: IDataBase;
    constructor(database: IDataBase) {
        this.db = database;
    }

    findById = async(id: any) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "id", valor: id }]);
        return data != null ? data[0] : null;
    }

    findByPedidoId = async (id: any) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "pedido_id", valor: id }]);

        return data != null ? data[0] : null;
    }

    getAll = async(params: any) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "pedido_id", valor: params['id'] }]);

        return data != null ? data : null;
    }

    update = async (checkout: Checkout, id) => {
  
            let data = await this.db.update(
                this.nomeTabela,
                [{ campo: "uuid", valor: checkout.uuid }, 
                { campo: "status", valor: checkout.getStatus() },
                { campo: "payment_method_id", valor: checkout.getPaymentMethod()},
                { campo: "pedido_id", valor: checkout.pedido.id },
                { campo: "card_number", valor: checkout.metodoPagamento.number },
                { campo: "card_cvv", valor: checkout.metodoPagamento.cvv },
                { campo: "card_expiration_date", valor: checkout.metodoPagamento.expirationDate },
                { campo: "payer_name", valor: checkout.metodoPagamento.payer.name },
                { campo: "payer_email", valor: checkout.metodoPagamento.payer.email },
                { campo: "payer_document", valor: checkout.metodoPagamento.payer.document },
                { campo: "total_value", valor: checkout.pedido.getValorTotal() },
                { campo: "payload", valor: checkout.payload },
                { campo: "external_reference", valor: checkout.external_reference },
                { campo: "created", valor:  new Date()}, 
                { campo: "modified", valor: new Date() }],
                [{ campo: "id", valor: id }]);
            return new Checkout(
                checkout.pedido,
                checkout.metodoPagamento,
                id
            )
        }

    public store = async (checkout: Checkout) => {
        let data = await this.db.store(
            this.nomeTabela,
            [{ campo: "uuid", valor: checkout.uuid }, 
            { campo: "status", valor: checkout.getStatus() },
            { campo: "payment_method_id", valor: checkout.getPaymentMethod()},
            { campo: "pedido_id", valor: checkout.pedido.id },
            { campo: "card_number", valor: checkout.metodoPagamento.number },
            { campo: "card_cvv", valor: checkout.metodoPagamento.cvv },
            { campo: "card_expiration_date", valor: checkout.metodoPagamento.expirationDate },
            { campo: "payer_name", valor: checkout.metodoPagamento.payer.name },
            { campo: "payer_email", valor: checkout.metodoPagamento.payer.email },
            { campo: "payer_document", valor: checkout.metodoPagamento.payer.document },
            { campo: "total_value", valor: checkout.pedido.getValorTotal() },
            { campo: "payload", valor: checkout.payload },
            { campo: "created", valor:  new Date()}, 
            { campo: "modified", valor: new Date() }]);
        return new Checkout(
            checkout.pedido,
            checkout.metodoPagamento,
            parseInt(data.insertId)
        )
    }


    delete(id: any) {
        throw new Error("Method not implemented.");
    }

    public findByExternalReference = async (uuid: string) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "external_reference", valor: uuid }]);
        return data != null ? data[0] : null;
    }
}

export default CheckoutPagamentoRepository;