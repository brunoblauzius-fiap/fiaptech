import {IDataBase} from '../interfaces/IDataBase';
import MysqlConnection from './mariadbConnection';
import { ParametroBd } from "../types";

interface parametros {
    restricao: string;
    valores: any[];
    order: string;
    condition: string;
  }

export class MysqlDataBase implements IDataBase {

    private db: MysqlConnection;
    

    constructor(){
        this.db = new MysqlConnection();
    }

    async store(nomeTabela: string, parametros: ParametroBd[]) {
      const nomesCampos: string[] = [];
      const valores: string[] = [];
      const alias: string[] = [];

      parametros.forEach(function (item) {
        nomesCampos.push(item.campo);
        valores.push(item.valor);
        alias.push("?");
      });

      const sql = `
        INSERT INTO ${nomeTabela} 
        (${nomesCampos.join(",")}) 
        VALUES 
        (${alias.join(",")})
        `;

      return await this.db.conn().query(sql, valores);
    }

    async update(nomeTabela: string, campos: ParametroBd[] | null, parametros: ParametroBd[]) {
        const parametrosBusca = this.prepararParametrosBusca(parametros);

        const nomesCampos: string[] = [];
        const nomesValores: any[] = [];
        

        campos.forEach(function (item) {
        nomesCampos.push(`${item.campo} = ?`);
        nomesValores.push(item.valor);
        
        });
        const sql = `
          Update ${nomeTabela} SET
          ${nomesCampos.join(" , ")}
          ${parametrosBusca.restricao}
        `;
        nomesValores.push(parametrosBusca.valores);
        const rows = await this.db.conn().query(sql, nomesValores);
        return rows;
    }

    async delete(nomeTabela: string, parametros: ParametroBd[]) {
        const parametrosBusca = this.prepararParametrosBusca(parametros);
        const sql = `
          Delete FROM ${nomeTabela}
          ${parametrosBusca.restricao}
        `;
        const rows = await this.db.conn().query(sql, parametrosBusca.valores);
        return rows;
    }
    
    async query(query: string) {
        return await this.db.conn().query(query)
    }
    
    async find(nomeTabela: string, campos: string[] | null, parametros: ParametroBd[]){

        const camposBusca = this.ajustarCamposExpressao(campos);
        const parametrosBusca = this.prepararParametrosBusca(parametros);

        //valida se o sql tera order by ou não 
        let order = parametrosBusca.order === "Order by "? "":parametrosBusca.order;

        const sql = `
          SELECT ${camposBusca} 
          FROM ${nomeTabela}
          ${parametrosBusca.restricao}
          ${order}
        `;
        const rows = await this.db.conn().query(sql, parametrosBusca.valores);

        return rows;
    }
    
    //metodos auxiliares
    private ajustarCamposExpressao(campos: string[] | undefined | null): string {
        if (campos === undefined || campos === null) {
          return " * ";
        } else if (campos.length == 0) {
          return " * ";
        } else {
          return campos.join(", ");
        }
    }
    private prepararParametrosBusca(
        params: ParametroBd[] | null | undefined
      ): parametros {
        if (params === null || params === undefined) {
          return {
            restricao: "",
            valores: [],
            order:"",
            condition:"",
          };
        }
    
        const camposRestricao: string[] = [];
        const valores: any[] = [];
        const order: string[] = [];
        
        params.forEach(function (item) {

          item.condition= item.condition === undefined ? "=": item.condition;
            
          camposRestricao.push(`${item.campo} ${item.condition} ?`);
          valores.push(item.valor);
          order.push(item.order);
        });
        return {
          restricao: `WHERE ${camposRestricao.join(" AND ")}`,
          valores: valores,
          order: `Order by ${order.join(" , ")}`,
          condition:"",
        };
    }

    async getProdutosDoPedido(id){
        let query = `SELECT p.* FROM pedido_produtos pp
        inner join  produto p 
        on pp.product_id= p.id
        where pp.order_id = ${id};`
        return await this.db.conn().query(query)
    };

    async getMultipleIdsProduto(ids: string[]){
        const query = `SELECT * FROM produto WHERE id IN (${ids})`
        return await this.db.conn().query(query)

    }
}

export default MysqlDataBase;