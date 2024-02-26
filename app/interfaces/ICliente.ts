import IRepository from "./IRepository";

export default interface IClienteRepository extends IRepository {
    findByCPF(cpf: string);
    findByEmail(email: string);
}