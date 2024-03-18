import Cliente from '../entity/cliente';
import { statusPedido } from '../entity/enum/statusPedido';
import Pedido from '../entity/pedido';
import Produto from '../entity/produto';
import IClienteRepository from '../interfaces/ICliente';
import IPedido from '../interfaces/IPedido';
import IProduto from '../interfaces/IProduto';

export class PedidoCasoDeUso{

    static async getAllPedidos(request, pedidoRepositorio: IPedido){
        return await pedidoRepositorio.getAll(request);
    }

    static async criarPedido(request, pedidoRepositorio: IPedido){
        return await pedidoRepositorio.store(request);
    }

    static async atualizarPedido(request, idPedido, pedidoRepositorio: IPedido){
        return await pedidoRepositorio.update(request, idPedido);
    }

    static async encontrarPedidoPorId(idPedido, pedidoRepositorio: IPedido){
        return await pedidoRepositorio.findById(idPedido);
    }

    static pedidoEmPreparacao = async (pedido: Pedido, pedidoRepositorio: IPedido) => {
        pedido.setStatus(statusPedido.EM_PREPARACAO);
        return await pedidoRepositorio.update(pedido, pedido.id);
    }

    static adicionarProdutoPedido = async(request, clienteRepositorio: IClienteRepository,produtoRepositorio: IProduto, pedidoRepositorio: IPedido) => {
        try {
            let customer: Cliente = await clienteRepositorio.findById(request.body.client_id);
            let produtos: Produto[] = await produtoRepositorio.findByMultipleIds(request.body.produtosIds);
            let order = new Pedido(
                customer,
                request.body.status
            );
            try {

                let orderResult
                 = await pedidoRepositorio.store(order);
                
                produtos.forEach(produto => {
                    orderResult.adicionarProduto(produto);
                });
                
                
                const promises = orderResult.getProdutos().map(async (produto) => {
                    const data = await pedidoRepositorio.adicionarProdutoAoPedido(orderResult.id, produto.id);
                    return data;
                });

                await Promise.all(promises);
            
        return orderResult;
            } 
            catch(err) {
                throw new Error(err.message)
                }
        } 
        catch (err) 
        {
            throw new Error(err.message)
        }
    }

    static async deletePedido(idPedido, PedidoRepositorio: IPedido){
                const Pedido = await PedidoRepositorio.delete(idPedido);
        return Pedido;
    }

}