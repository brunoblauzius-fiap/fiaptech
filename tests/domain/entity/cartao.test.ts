import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';

import Payer from '../../../app/entity/payer';
import Cartao from '../../../app/entity/cartao';

describe("Validando Entity Payer", () => {
    test("Instanciar Cartao", () => {
        let instance = new Cartao(
            new Payer(
                "Heitor Bernardo Victor Nogueira",
                "heitoBVN@gmail.com",
                "317.594.877-40"
            ),
            '4171-9043-4466-6522',
            '155',
            '9/2026'
        );
        /**
         * payer
         */
        expect("Heitor Bernardo Victor Nogueira").toEqual(instance.payer.name);
        expect("heitoBVN@gmail.com").toEqual(instance.payer.email);
        expect("31759487740").toEqual(instance.payer.document);
        /**
         * card
         */
        expect("4171-9043-4466-6522").toEqual(instance.number);
        expect("155").toEqual(instance.cvv);
        expect("9/2026").toEqual(instance.expirationDate);
    });


    test("Instanciar Cartao sem Número do cartão", () => {
        expect(() => {
            let instance = new Cartao(
                new Payer(
                    "Heitor Bernardo Victor Nogueira",
                    "heitoBVN@gmail.com",
                    "317.594.877-40"
                ),
                '',
                '155',
                '9/2026'
            );
        }).toThrow("Número do Cartão é obrigatório.");
    });

    test("Instanciar Cartao com Número do cartão menor que 16 digitos", () => {
        expect(() => {
            let instance = new Cartao(
                new Payer(
                    "Heitor Bernardo Victor Nogueira",
                    "heitoBVN@gmail.com",
                    "317.594.877-40"
                ),
                '4171-9043-4466-65',
                '155',
                '9/2026'
            );
        }).toThrow("Número do Cartão DEVE conter 16 digitos.");
    });

    test("Instanciar Cartao sem CVV do cartão", () => {
        expect(() => {
            let instance = new Cartao(
                new Payer(
                    "Heitor Bernardo Victor Nogueira",
                    "heitoBVN@gmail.com",
                    "317.594.877-40"
                ),
                '4171-9043-4466-6522',
                '',
                '9/2026'
            );
        }).toThrow("CVV do Cartão é obrigatório.");
    });


    test("Instanciar Cartao sem Data de Expiração do cartão", () => {
        expect(() => {
            let instance = new Cartao(
                new Payer(
                    "Heitor Bernardo Victor Nogueira",
                    "heitoBVN@gmail.com",
                    "317.594.877-40"
                ),
                '4171-9043-4466-6522',
                '155',
                ''
            );
        }).toThrow("Data de Expiração do Cartão é obrigatória.");
    });

});