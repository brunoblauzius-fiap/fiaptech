import configs from "../application/core/configs";
import JWT from "../application/core/jwt";
import User from "../entity/user";

class UsuarioCasoDeUso{

    constructor(readonly user: User) {}

    public autenticar() {
        const authJwt = new JWT(configs.secret, this.user);
        return {
            "access_token" : authJwt.sign(),
            "expires_in": 3600,
            "scope": "customScope",
            "token_type": "Bearer"
        };
    }
}

export default UsuarioCasoDeUso;