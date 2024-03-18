import * as HttpStatus from 'http-status';
import ProdutoRepository from "../gateways/ProdutoRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import Produto from '../entity/produto';
import Categoria from '../entity/categoria';
import CategoriaRepository from '../gateways/CategoriaRepository';
import { IDataBase } from '../interfaces/IDataBase';
import { ProdutoCasoDeUso } from '../cases/produtoCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';


class ProdutoController{
     /**
     * 
     */
     public repository: ProdutoRepository;
     public categoryRepository: CategoriaRepository;

     /**
      * 
      */
     constructor(dbconnection: IDataBase) {
         this.repository = new ProdutoRepository(dbconnection);
         this.categoryRepository = new CategoriaRepository(dbconnection);
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public all = async (request, response) => {
         try {
             let data = await ProdutoCasoDeUso.getAllProdutos(request.query,this.repository);
             response.status(HttpStatus.OK).json(ResponseAPI.list(data));
         } catch(err) {
            ResponseErrors.err(response, err);
         }
     }

     /**
      * 
      * @param request 
      * @param response 
      */
     public store = async (request, response) => {
        try {
            const data = await ProdutoCasoDeUso.criarProduto(request,this.categoryRepository,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));

        } catch(err) {
            ResponseErrors.err(response, err);
        }
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public update = async (request, response) => {
        try {
            const data = await ProdutoCasoDeUso.atualizarProduto(request,this.categoryRepository,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));

        } catch(err) {
            ResponseErrors.err(response, err);
        }
        
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public show = async (request, response) => {
         try {
             if (typeof request.params.id == 'undefined') {
                 throw new BadRequestError("ID do registro é requerido.");
             }
             let data = await ProdutoCasoDeUso.encontrarProdutoPorId(request.params.id,this.repository);
             response.status(HttpStatus.OK).json(ResponseAPI.data(data));
         } catch (err) {
            ResponseErrors.err(response, err);
         }
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public delete = async (request, response) => {
         try {
            if (typeof request.params.id == 'undefined') {
                throw new BadRequestError("ID do registro é requerido.");
            }
             await ProdutoCasoDeUso.deleteProduto(request.params.id, this.repository);
             response.status(HttpStatus.NO_CONTENT).json({});
         } catch (err) {
            ResponseErrors.err(response, err);
         }
     }

     /**
      * 
      * @param request 
      * @param response 
      */
     public getByidCategory = async (request, response) => {
        try {
            
            if (typeof request.params.category_id  == 'undefined' || request.params.category_id == "") {
                throw new BadRequestError("ID da Categoria é requerido.");
            }
            let data = await ProdutoCasoDeUso.findByCategory(request.params.category_id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }
}

export default ProdutoController;