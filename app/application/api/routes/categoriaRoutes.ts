// routes/categoriaRoutes.ts
import * as express from "express";
import CategoriaController from '../../../controllers/CategoriaController';
import { IDataBase } from '../../../interfaces/IDataBase';

export default function CategoriaRoutes(dbconnection: IDataBase) {
  const router = express.Router();
  const categoriaController = new CategoriaController(dbconnection);

  router.get('/categoria', categoriaController.all);
  router.post('/categoria', categoriaController.store);
  router.get('/categoria/:id', categoriaController.show);
  router.put('/categoria/:id', categoriaController.update);
  router.delete('/categoria/:id', categoriaController.delete);

  return router;
}
