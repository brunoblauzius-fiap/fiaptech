
import IRepository from "./IRepository";

export default interface IProduto extends IRepository {
    findByMultipleIds(ids: number[]);
    findByCategory(category_id: BigInteger);
}