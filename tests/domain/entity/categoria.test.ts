import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';

import Categoria from '../../../app/entity/categoria';

describe("Validando Entity Categoria", () => {
    test("Instanciar Categoria sem ID", () => {
        let instance = new Categoria("Categoria Teste");
        expect("Categoria Teste").toEqual(instance.name);
    });

    test("Instanciar Categoria com ID", () => {
        let instance = new Categoria("Categoria Teste", 1);
        expect("Categoria Teste").toEqual(instance.name);
        expect(1).toEqual(instance.id);
    });

    test("Instanciar Categoria sem nome e com string vazia", () => {
        expect(() => {
            let instance = new Categoria("");
        }).toThrow("O nome da categoria é obrigatório.");
    });

    test("Instanciar Categoria sem definir nome", () => {
        expect(() => {
            let instance = new Categoria();
        }).toThrow("O nome da categoria é obrigatório.");
    });
});
