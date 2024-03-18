import Pedido from "../entity/pedido";
import Produto from "../entity/produto";
import IRepository from "./IRepository";

export default interface IPedido extends IRepository {
    adicionarProdutoAoPedido(pedidoId: Pedido, produtoId: Produto);
}