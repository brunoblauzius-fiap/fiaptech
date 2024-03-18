import Categoria from '../entity/categoria';
import IRepository from '../interfaces/IRepository';
export class CategoriaCasoDeUso {

    static async getAllCategorias(query, categoriaRepositorio: IRepository){
        const categorias = await categoriaRepositorio.getAll(query);
        return categorias;
    }

    static async criarCategoria(categoria : Categoria, categoriaRepositorio: IRepository){
        return await categoriaRepositorio.store(categoria);
    }
    static async atualizarCategoria(categoria : Categoria, id, categoriaRepositorio: IRepository){
        const categorias = await categoriaRepositorio.update(categoria, id);
        return categorias;
    }
    static async encontrarCategoriaPorId(id, categoriaRepositorio: IRepository){
        const categorias = await categoriaRepositorio.findById(id);
        return categorias;
    }
    static async deleteCategoria(id, categoriaRepositorio: IRepository){
        const categorias = await categoriaRepositorio.delete(id);
        return categorias;
    }

}