import IRepository from "../interfaces/IRepository";
import Produto from '../entity/produto';
import { Console } from "console";
import IProduto from "../interfaces/IProduto";
import { IDataBase } from "../interfaces/IDataBase";

class ProdutoRepository implements IProduto{
    
    public db: IDataBase;
    private nomeTabela = "produto";

    constructor(database: IDataBase) {
        this.db = database;
      }

    public getAll = async (params: any) => {
        let CONDITIONS = false;
        let result;
        if (typeof params.name != 'undefined' && params.name != "") {
            CONDITIONS = true;
        }

        if (!CONDITIONS) {
            return await this.db.find(
                this.nomeTabela,
                null,
                null
            );
        } else{
            return await this.db.find(
                this.nomeTabela,
                null,
                [{ campo: "title", valor: params.title }]);
        }
    }

    public store = async(produto: Produto) => {
        let data = await this.db.store(
            this.nomeTabela,
            [{ campo: "title", valor: produto.title }, 
            { campo: "value", valor: produto.value },
            { campo: "description", valor: produto.description },
            { campo: "category_id", valor: produto.categoria.id },
            { campo: "created", valor:  new Date()}, 
            { campo: "modified", valor: new Date() }]);
                return new Produto(
            produto.title,
            produto.value,
            produto.categoria,
            produto.description,
            parseInt(data.insertId)
        );
    }

    public update = async (produto: Produto, id: BigInteger) => {
        this.db.update(
            this.nomeTabela,
            [{ campo: "title", valor: produto.title }, 
            { campo: "value", valor: produto.value }, 
            { campo: "description", valor: produto.description } ,
            { campo: "category_id", valor: produto.categoria.id }],
            [{ campo: "id", valor: id }]);  
        return new Produto(
            produto.title,
            produto.value,
            produto.categoria,
            produto.description,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(
            this.nomeTabela,
            [{ campo: "id", valor: id }]);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "id", valor: id }]);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }

    public findByMultipleIds = async (ids: number[]) => {
        if (ids.length === 0) {
            return null; 
        }
        if (!Array.isArray(ids)) {
        ids = [ids]; 
        }
        const formattedIds = ids.join(', ');

        let data = await this.db.getMultipleIdsProduto(formattedIds);
        if (data != null) {
            return data;
        } else {
            return null;
        }
    }
    

    public findByCategory = async (category_id: BigInteger) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "category_id", valor: category_id }]);
        if (data.length>0) {
            return data;
        } else {
            return null;
        }
    }
}

export default ProdutoRepository;