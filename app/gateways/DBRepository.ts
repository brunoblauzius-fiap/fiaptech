import IRepository from "../interfaces/IRepository";

class DBRepository extends IRepository
{

    public init = async () => {     
        
        await this.db.query(`TRUNCATE TABLE categoria;`);

        await this.db.query(`
            INSERT INTO categoria (id, name, created, modified) 
            VALUES 
            (1, 'Lanche',NOW(), NOW()), 
            (2, 'Acompanhamento',NOW(), NOW()), 
            (3, 'Bebidas',NOW(), NOW());
        `);
    }

    getAll(params: any) {
        throw new Error("Method not implemented.");
    }
    update(params: any, id: any) {
        throw new Error("Method not implemented.");
    }
    store(params: any) {
        throw new Error("Method not implemented.");
    }
    delete(id: any) {
        throw new Error("Method not implemented.");
    }
    findById(id: any) {
        throw new Error("Method not implemented.");
    }
}

export default DBRepository;