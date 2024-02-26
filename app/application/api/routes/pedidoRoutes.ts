import * as express from "express";
import PedidoController from "../../../controllers/PedidoController";
import { IDataBase } from "../../../interfaces/IDataBase";

export default function PedidoRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const pedidoController = new PedidoController(dbconnection);
    router.get('/pedidos', pedidoController.all);
    router.post('/pedidos', pedidoController.store);
    router.get('/pedidos/:id', pedidoController.show);
    router.put('/pedidos/update/:id', pedidoController.update);
    router.delete('/pedidos/:id', pedidoController.delete);
    return router;
}
