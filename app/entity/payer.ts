import {cpf} from 'cpf-cnpj-validator';

class Payer {
    constructor(readonly name: string, readonly email: string ,readonly document: string) {
        if (name==null || name=="") {
            throw new Error("Nome é obrigatório.");
        }
        if (email==null || email=="") {
            throw new Error("E-mail é obrigatório.");
        }
        if (!this.isValidEmail()) {
            throw new Error("E-mail inválido.");
        }
        if (document==null || document=="") {
            throw new Error("CPF é obrigatório.");
        }
        this.document = String(document).replace(".", "").replace("-", "").replace(".", "");

        if (!this.isValidCpf()) {
            throw new Error("CPF inválido.");
        }
    }

    public isValidCpf() : boolean {
        return cpf.isValid(this.document);
    }

    public isValidEmail() : boolean {  
        const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return expression.test(this.email); 
    }
}

export default Payer;