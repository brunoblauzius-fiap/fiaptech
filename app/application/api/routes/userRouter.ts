import * as express from "express";
import UserController from "../../../controllers/UserController";
import { IDataBase } from "../../../interfaces/IDataBase";

export default function produtoRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const userController = new UserController(dbconnection);
    router.post('/user/auth', userController.auth);
    return router;
}