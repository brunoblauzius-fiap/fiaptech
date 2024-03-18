import {cpf} from 'cpf-cnpj-validator';
import BadRequestError from '../application/exception/BadRequestError';

class Cliente{

    public id;

    constructor(
        readonly name?: string, 
        readonly email?: string, 
        readonly cpf_cnpj? : string
    ) {
        
        if (name==null || name=="") {
            throw new BadRequestError("Nome do cliente é obrigatório.");
        }
        if (email==null || email=="") {
            throw new BadRequestError("E-mail do cliente é obrigatório.");
        }
        
        this.email = email.toLocaleLowerCase();

        if (!this.isValidEmail()) {
            throw new BadRequestError("E-mail do cliente é inválido.");
        }

        if (cpf_cnpj==null || cpf_cnpj=="") {
            throw new BadRequestError("CPF do cliente é obrigatório.");
        }
        
        this.cpf_cnpj = String(cpf_cnpj).replace(".", "").replace("-", "").replace(".", "");

        if (!this.isValidCpf()) {
            throw new BadRequestError("CPF do cliente é inválido.");
        }
    }

    public isValidCpf() : boolean {
        return cpf.isValid(this.cpf_cnpj);
    }

    public isValidEmail() : boolean {  
        const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return expression.test(this.email); 
    }

    public cpfFormat() : string {
        return cpf.format(this.cpf_cnpj);
    }

}

export default Cliente;