import Produto from '../entity/produto';
import IClienteRepository from '../interfaces/ICliente';
import IProduto from '../interfaces/IProduto';
import IRepository from '../interfaces/IRepository';
import CategoriaRepository from '../gateways/CategoriaRepository';
import BadRequestError from '../application/exception/BadRequestError';

export class ProdutoCasoDeUso{

    static async getAllProdutos(request, ProdutoRepositorio: IProduto){
        const Produtos = await ProdutoRepositorio.getAll(request);
        return Produtos;
    }

    static async criarProduto(request,CategoriaRepository: IRepository, ProdutoRepositorio: IProduto){
        let categoria = await CategoriaRepository.findById(request.body.category_id);
        
        if (categoria == null) {
            throw new BadRequestError("Categoria não foi encontrada");
        }

        let produtoData = await ProdutoRepositorio.getAll({name : true, title : request.body.title});
        
        if (produtoData.length > 0) {
            throw new BadRequestError("Produto já cadastrado.");
        }

        let produto = new Produto(
                request.body.title,
                request.body.value,
                categoria,
                request.body.description
            );
            
            try {
                let data = await ProdutoRepositorio.store(produto);
                return data;
            } catch(err) {
            throw new Error(err.message)
            }
    }
    static async atualizarProduto(request,CategoriaRepository: IRepository, ProdutoRepositorio: IProduto){
        try {
            let categoria = await CategoriaRepository.findById(request.body.category_id);
            
            if (categoria == null) {
                throw new BadRequestError("Categoria não foi encontrada");
            }

            let produto = await ProdutoCasoDeUso.encontrarProdutoPorId(request.params.id, ProdutoRepositorio);

            if (produto['title'] != request.body.title) {
                let produtoData = await ProdutoRepositorio.getAll({name : true, title : request.body.title});
                if (produtoData.length > 0) {
                    throw new BadRequestError("Produto já cadastrado.");
                }
            }
            
            produto = new Produto(
                request.body.title,
                request.body.value,
                categoria,
                request.body.description
            );

             let data = await ProdutoRepositorio.update(produto, request.params.id);
             return data;
         } catch (err) { throw new Error(err.message)}

    }
    static async encontrarProdutoPorId(idProduto, ProdutoRepositorio: IProduto){
        return await ProdutoRepositorio.findById(idProduto);
    }

    static async encontrarProdutoPorNome(idProduto, ProdutoRepositorio: IProduto){
        const Produto = await ProdutoRepositorio.findById(idProduto);
        return Produto;
    }

    static async deleteProduto(idProduto, ProdutoRepositorio: IProduto){
                const Produto = await ProdutoRepositorio.delete(idProduto);
        return Produto;
    }

    static async findByCategory(idProduto, ProdutoRepositorio: IProduto){
        const Produto = await ProdutoRepositorio.findByCategory(idProduto);
    return Produto;
}

}