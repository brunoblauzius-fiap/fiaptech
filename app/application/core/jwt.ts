import * as jwt from 'jsonwebtoken';
import User from '../../entity/user';

class JWT{

    secret = null;
    public payload : object = null;

    constructor (secret, user: User) {
        this.secret = secret;
        this.payload = {
            iss : process.env.DNS,
            iat: new Date().getSeconds(),
            exp: new Date().setMinutes(60),
            name: user.name,
            email: user.email
        }
    }

    sign = () : string => {
        return jwt.sign(this.payload, this.secret);
    }
}

export default JWT;