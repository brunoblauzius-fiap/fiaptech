import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test, it, beforeAll, afterAll, jest } from '@jest/globals';
import UsuarioCasoDeUso from '../../../app/cases/usuarioCasoDeUso';
import User from '../../../app/entity/user';



describe("TEST Autenticação.", () =>{
    test("Validar Autenticação" , () => {
        let user = new User(
            "Bruno Blauzius schuindt",
            "brunoblauzius@gmail.com"
        );
        let token = new UsuarioCasoDeUso(user).autenticar()
        expect(token).not.toBeNull()
    });
});