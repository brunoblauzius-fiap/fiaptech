import * as express from "express";
import ProdutoController from "../../../controllers/ProdutoController";
import { IDataBase } from "../../../interfaces/IDataBase";


export default function produtoRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const produtoController = new ProdutoController(dbconnection);

    router.get('/produto', produtoController.all);
    router.post('/produto', produtoController.store);
    router.get('/produto/:id', produtoController.show);
    router.put('/produto/:id', produtoController.update);
    router.delete('/produto/:id', produtoController.delete);
    router.get('/produto/categoria/:category_id', produtoController.getByidCategory);
    return router;
}

//export default router;