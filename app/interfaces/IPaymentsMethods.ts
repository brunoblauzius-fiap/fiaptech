import Checkout from "../entity/checkout";

abstract class IPaymentMethods {
    /**
     * endpoint empresa
     */
    public url : string = null;
    /**
     * token de autorização
     */
    public auth_token : string = null;

    /**
     * metodo de criação de pagamento
     * @param checkout 
     */
    abstract store(checkout: Checkout);

    abstract aguardandoPagamento() : boolean;

    /**
     * metodo de criação de pagamento via PIX
     * @param checkout 
     */
    abstract pix(checkout: Checkout);

    /**
     * metodo de criação de pagamento via Cartão
     * @param checkout 
     */
    abstract card(checkout: Checkout);

    /**
     * metodo de sync do pagamento
     * @param checkout
     */
    abstract sync(checkout: Checkout);

    /**
     * metodo de busca do pagamento
     * @param id 
     */
    abstract find(id: BigInt);
}

export default IPaymentMethods;