import IRepository from "./IRepository";

export default interface ICheckout extends IRepository {
    findByExternalReference(uuid: string)
    findByPedidoId(id: any)
}