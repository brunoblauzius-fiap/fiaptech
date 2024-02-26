import Pedido from "../entity/pedido";
import ClienteRepository from "./ClienteRepository";
import IPedido from "../interfaces/IPedido";
import Produto from '../entity/produto';
import { IDataBase } from "../interfaces/IDataBase";
import produtoRoutes from '../application/api/routes/produtoRoutes';

class PedidoRepository implements IPedido{
   
    public db: IDataBase;
    private nomeTabela = "pedidos";
    
    constructor(database: IDataBase) {
        this.db = database;
    }

    public getAll = async (params: any) => {
        let CONDITIONS = "";
        let data;
        if (typeof params.status != 'undefined' && params.status != "" && !isNaN(params.status)) {

            data = await this.db.find(
                this.nomeTabela,
                null,
                [{ campo: "status", valor: 4, condition:"!=", order: "status desc, created asc"},{
                    campo: "status",valor: parseInt(params.status)}]);

                return data;
        }
        else{
            data = await this.db.find(
                this.nomeTabela,
                null,
                [{ campo: "status", valor: 4, condition:"!=", order: "status desc, created asc"}]);
                
                return data;
     
        }

    }

    public store = async(pedido: Pedido) => {
        let data = await this.db.store(
            this.nomeTabela,
            [{ campo: "customer_id", valor: pedido.cliente.id }, 
            { campo: "status", valor: pedido.getStatus() },
            { campo: "total_value", valor: pedido.getValorTotal() },
            { campo: "created", valor:  new Date()}, 
            { campo: "modified", valor: new Date() }]);
        
        return new Pedido(
            pedido.cliente,
            pedido.getStatus(),
            parseInt(data.insertId)
        );
    }

    public adicionarProdutoAoPedido = async (pedidoId: Pedido, produtoId: Produto) => {
        let data =await this.db.store(
            "pedido_produtos",
            [{ campo: "order_id", valor: pedidoId },{ campo: "product_id", valor: produtoId }, { campo: "created", valor:  new Date()}, { campo: "modified", valor: new Date() }]);
        return data.insertId;
    }

    public update = async (pedido: Pedido, id: BigInteger) => {
        this.db.update(
            this.nomeTabela,
            [{ campo: "customer_id", valor: pedido.cliente.id }, 
            { campo: "status", valor: pedido.getStatus() }, 
            { campo: "total_value", valor: pedido.getValorTotal() } ,
            { campo: "modified", valor: new Date() }],
            [{ campo: "id", valor: id }]);  
        return new Pedido(
            pedido.cliente,
            pedido.getStatus(),
            id,
            pedido.getValorTotal()
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(
            this.nomeTabela,
            [{ campo: "id", valor: id }]);
    }

    public findById = async (id: BigInteger) : Promise<Pedido> => {
        let dataPedido  = await this.db.find(this.nomeTabela, null ,[{ campo: "id", valor: id}]);
        let dataProduto  = await this.db.getProdutosDoPedido(id)
        if (dataPedido != null && dataPedido.length > 0){
            let cliente  = await new ClienteRepository(this.db).findById(dataPedido[0].customer_id);
            let pedido = new Pedido(
                cliente,
                dataPedido[0].status,
                dataPedido[0].id,
                dataPedido[0].valorTotal
            );
            dataProduto.forEach(produto => {
                 pedido.adicionarProduto(produto)   
            });  
            return pedido;
        } else {
            return null;
        }
    }
}

export default PedidoRepository;
