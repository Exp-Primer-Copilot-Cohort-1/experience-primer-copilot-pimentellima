import { FormInMemoryRepository } from "App/Core/domain/repositories/form/form-in-memory-repository";
import { describe, expect, it } from "vitest";
import { FindAllFormsUseCase } from "./find-all-forms-use-case";
import { FindFormByCategoryIdUseCase } from "./find-form-by-category-id-use-case";
import { FindFormByIdUseCase } from "./find-form-by-id-use-case";
import { FindFormByProfIdUseCase } from "./find-form-by-prof-id-use-case";

const form = {
    name: 'PLANO TERAPÊUTICO',
    questions: {
        task_data: [

            {
                id: 'BD3DB26B-6EEA-4B0D-8BDC-847AA045B5F8',
                element: 'TextInput',
                text: 'Entrada de texto',
                required: false,
                canHaveAnswer: true,
                canHavePageBreakBefore: true,
                canHaveAlternateForm: true,
                canHaveDisplayHorizontal: true,
                canHaveOptionCorrect: true,
                canHaveOptionValue: true,
                canPopulateFromApi: true,
                field_name: 'text_input_C353FD3E-B8E9-4F6A-AE44-F6C79644C59A',
                label: '<strong>RECURSOS TERAPÊUTICOS:<br></strong>(Os recursos terapêuticos que serão utilizados ao longo do tratamento, podem ser: atividades, objetos, técnicas, recursos eletrotermofototerápicos e métodos utilizados com o objetivo de auxiliar o paciente durante seu processo de reabilitação.) ',
                dirty: false
            },
            {
                id: 'D5EDB21D-96F4-4FA2-B5E4-27CCCA6820DA',
                element: 'TextInput',
                text: 'Entrada de texto',
                required: false,
                canHaveAnswer: true,
                canHavePageBreakBefore: true,
                canHaveAlternateForm: true,
                canHaveDisplayHorizontal: true,
                canHaveOptionCorrect: true,
                canHaveOptionValue: true,
                canPopulateFromApi: true,
                field_name: 'text_input_E051B9CD-FDAA-4592-A1AA-FE285ED88E0B',
                label: '<strong>PLANO DE TRATAMENTO:<br></strong>(É a descrição dos procedimentos fisioterapêuticos propostos relatando os recursos, métodos e técnicas a serem utilizados e o(s) objetivo(s) terapeutico(s) a ser(em) alcançado(s), bem como quantitativo provável de atendimento, ou seja, a associação de tres diferentes variáveis.) ',
                dirty: false
            }
        ]
    },
    category_id: '6364230bc109b232759921f7',
    prof: {
        value: '63597857c109b232759921d9',
        label: 'MOISÉS RODRIGUES DE PAULA'
    },
    unity_id: '63528c11c109b232759921d1',
    active: true,
}

describe("Find all forms (Unit)", () => {
    it("should find all forms that matches unity_id", async () => {
        const repo = new FormInMemoryRepository();
        repo.forms = [{
            ...form,
            _id: '1',
            unity_id: '1'
        },
        {
            ...form,
            _id: '2',
            unity_id: '2',
        }];
        const respOrErr = await new FindAllFormsUseCase(repo).execute({
            unity_id: '1'
        });
        if (respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract()).toHaveLength(1);
    })
})

describe("Find all forms by category_id (Unit)", () => {
    it("should find all forms that matches unity_id and category_id", async () => {
        const repo = new FormInMemoryRepository();
        repo.forms = [{
            ...form,
            _id: '1',
            unity_id: '1',
            category_id: '1'
        },
        {
            ...form,
            _id: '2',
            unity_id: '2',
            category_id: '1'
        }];
        const respOrErr = await new FindFormByCategoryIdUseCase(repo).execute({
            unity_id: '1',
            category_id: '1'
        });
        if (respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract()).toHaveLength(1);
    })
})

describe("Find all forms by prof_id (Unit)", () => {
    it("should find all forms that matches unity_id and prof_id", async () => {
        const repo = new FormInMemoryRepository();
        repo.forms = [{
            ...form,
            _id: '1',
            unity_id: '1',
            prof_id: '1'
        },
        {
            ...form,
            _id: '2',
            unity_id: '2',
            prof_id: '1'
        }];
        const respOrErr = await new FindFormByProfIdUseCase(repo).execute({
            unity_id: '1',
            prof_id: '1'
        });
        if (respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract()).toHaveLength(1);
    })
})

describe("Find form by id (Unit)", () => {
    it("should find form that matches id", async () => {
        const repo = new FormInMemoryRepository();
        repo.forms = [{
            ...form,
            _id: '1',
            unity_id: '1',
            prof_id: '1'
        },
        {
            ...form,
            _id: '2',
            unity_id: '2',
            prof_id: '1'
        }];
        const respOrErr = await new FindFormByIdUseCase(repo).execute({
            id: '1'
        });
        if (respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract()._id).toBe('1');
    })
})
