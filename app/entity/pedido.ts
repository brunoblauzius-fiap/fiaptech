import Cliente from "./cliente";
import { statusPedido } from './enum/statusPedido';
import Produto from "./produto";

class Pedido {

  private _produtos: Produto[] = []; 

  private _status: statusPedido;

  private _valorTotal: number;

  constructor (
      readonly cliente: Cliente,
      status: statusPedido = statusPedido.CRIADO,
      readonly id?,
      valorTotal: number = 0 
  ) {
    if (!cliente) {
      throw new Error("Cliente é obrigatório.");
    }
    this._status = status;
    this._valorTotal = valorTotal;
  }

  somaTotal(valor: number): void {
    this._valorTotal += valor;
  }

  getValorTotal() : number {
    return this._valorTotal;
  }

  adicionarProduto(produto: Produto): void {
      this._produtos.push(produto);
      this.somaTotal(parseFloat(produto.value.toString()));
  }

  getProdutos = () => {
      return this._produtos;
  }

  setStatus = (status: statusPedido) => {
    this._status = status;
  }

  getStatus = () => {
    return this._status;
  }
    
}

export default Pedido;
