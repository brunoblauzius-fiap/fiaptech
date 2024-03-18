import * as HttpStatus from 'http-status';
import ResponseAPI from "../adapters/ResponseAPI"
import UsuarioCasoDeUso from '../cases/usuarioCasoDeUso';
import User from '../entity/user';
import { IDataBase } from '../interfaces/IDataBase';
import ResponseErrors from '../adapters/ResponseErrors';

export default class UserController{

    constructor (readonly dbconnection: IDataBase) {}

    auth = (request, response) => {
        try {
            let user = new User(
                "Bruno Blauzius schuindt",
                "brunoblauzius@gmail.com"
            );
            let token = new UsuarioCasoDeUso(user).autenticar()
            response.status(HttpStatus.OK).send(ResponseAPI.data(token));

        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }
}