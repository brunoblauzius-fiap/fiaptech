import * as express from "express";
import ClienteController from "../../../controllers/ClienteController";
import { IDataBase } from '../../../interfaces/IDataBase';

export default function ClienteRoutes(dbconnection: IDataBase) {
    const router = express.Router();
    const clienteController = new ClienteController(dbconnection);
    router.get('/cliente', clienteController.all);
    router.post('/cliente', clienteController.store);
    router.get('/cliente/:id', clienteController.show);
    router.get('/cliente/:cpfcnpj/identify', clienteController.identifyByCPF);
    router.put('/cliente/:id', clienteController.update);
    router.delete('/cliente/:id', clienteController.delete);
    return router;
}

//export default router;