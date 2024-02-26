import {Response} from 'express';
import * as HttpStatus from 'http-status';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseAPI from './ResponseAPI';

class ResponseErrors {
    public err(response: Response, err) {
        if (err instanceof BadRequestError) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
        } else if (err instanceof Error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
        }
    }
}

export default new ResponseErrors();