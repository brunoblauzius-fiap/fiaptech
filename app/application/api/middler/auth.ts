import * as jwt from 'jsonwebtoken';
import Configs from '../../core/configs';
import * as HttpStatus from 'http-status';

class Auth {
    validate(request, response, next) {
        let pathname = request._parsedUrl.pathname;
        if (pathname == '/api/v1/checkout/hook') { next(); return; }

        var token = request.headers['authorization'];
        if (token) {
            let bearer = String(token).split(' ');
            let bearerToken = bearer[1];
            jwt.verify(bearerToken, Configs.secret, (error, decoded) => {
                if (error) {
                    response.status(HttpStatus.UNAUTHORIZED).send({
                        'message' : 'Invalid Token.'
                    });
                } else {
                    next();
                }
            });
        } else {
            response.status(HttpStatus.UNAUTHORIZED).send({
                'message' : 'Unauthorized.'
            });
        }
    }
}

export default new Auth;