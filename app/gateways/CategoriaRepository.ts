import Categoria from "../entity/categoria";
import IRepository from "../interfaces/IRepository";
import { IDataBase } from "../interfaces/IDataBase";

class CategoriaRepository implements IRepository {

    constructor(readonly db: IDataBase) {}
    
    private nomeTabela = "categoria";

    async getAll(params) {

        let CONDITIONS = false;
        let result;
        if (typeof params.name != 'undefined' && params.name != "") {
            CONDITIONS = true;
        }

        if (!CONDITIONS) {
            result = await this.db.find(
                this.nomeTabela,
                null,
                null
            );
        }
        else {
            result = await this.db.find(
                this.nomeTabela,
                null,
                [{ campo: "name", valor: params.name}]
            );
        }

        if (result === null || result === undefined) return null;
        if (result.length < 1) return null;

        const row: Categoria[] = result;
        return row;
    }

    async update(params: Categoria, id) {
        this.db.update(
            this.nomeTabela,
            [{ campo: "name", valor: params.name }, { campo: "modified", valor: new Date() }],
            [{ campo: "id", valor: id }]);
        return new Categoria(params.name, id);
    }

    async store(params: Categoria) {
        let data =await this.db.store(
            this.nomeTabela,
            [{ campo: "name", valor: params.name }, { campo: "created", valor:  new Date()}, { campo: "modified", valor: new Date() }]);
        return new Categoria(
            params.name,
            parseInt(data.insertId)
        )
    }

    async delete(id) {
        return await this.db.delete(
            this.nomeTabela,
            [{ campo: "id", valor: id }]);
    }

    async findById(id): Promise<Categoria> {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "id", valor: id }]);
        if (data.length > 0) {
            return new Categoria(data[0].name, data[0].id);
        }
        else
            return null;
    }

}

export default CategoriaRepository;