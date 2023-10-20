import { AbstractError } from 'App/Core/errors/error.interface'
import { left, right } from 'App/Core/shared'
import { describe, expect, it, vi } from 'vitest'
import { FormManagerInterface } from '../../repositories/interface/form-manager-interface'
import { CreateFormUseCase } from './create-form-use-case'
import { DeleteFormByIdUseCase } from './delete-form-by-id-use-case'
import { FindAllFormsUseCase } from './find-all-forms-use-case'
import { FindFormByIdUseCase } from './find-form-by-id-use-case'
import { UpdateFormByIdUseCase } from './update-form-by-id-use-case'

const form = {
    name: 'PLANO TERAPÊUTICO',
    description: 'PLANO TERAPÊUTICO',

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



const FormManager: FormManagerInterface = {
    create: vi.fn(async (form) => {
        return right(form) as any
    }),
    findAll: vi.fn(async () => {
        return right([]) as any
    }),
    deleteFormById: vi.fn(async (id) => {
        return right(id) as any
    }),
    findById: vi.fn(async (id) => {
        return right(id) as any
    }),
    update: vi.fn(async (_id, form) => {
        return right(form) as any
    })
}

const makeSutCreate = () => {
    const sut = new CreateFormUseCase(FormManager)
    return { sut, }
}

const makeSutFindAll = () => {
    const sut = new FindAllFormsUseCase(FormManager)
    return { sut, }
}

const makeSutDelete = () => {
    const sut = new DeleteFormByIdUseCase(FormManager)
    return { sut, }
}

const makeSutFindById = () => {
    const sut = new FindFormByIdUseCase(FormManager)
    return { sut, }
}

const makeSutUpdate = () => {
    const sut = new UpdateFormByIdUseCase(FormManager)
    return { sut, }
}

describe('Use cases ref form (Unit)', () => {
    describe('Create form Use Case', () => {
        it('should create form', async () => {
            const { sut } = makeSutCreate()
            const respOrErr = await sut.execute(form)
            expect(respOrErr.isRight()).toBeTruthy()
        })

        it('should return error when create form', async () => {
            const { sut } = makeSutCreate()
            vi.spyOn(FormManager, 'create').mockImplementationOnce(async () => {
                return left(undefined) as any
            })
            const respOrErr = await sut.execute(form)
            expect(respOrErr.isLeft()).toBeTruthy()
        })
    })

    describe('Find all forms Use Case', () => {
        it('should find all forms', async () => {
            const { sut } = makeSutFindAll()
            const respOrErr = await sut.execute({ unity_id: 'unity_id' })
            expect(respOrErr.isRight()).toBeTruthy()
        })

        it('should return error when find all forms', async () => {
            const { sut } = makeSutFindAll()

            vi.spyOn(FormManager, 'findAll').mockImplementationOnce(async () => {
                return left(undefined) as any
            })

            const respOrErr = await sut.execute({ unity_id: 'unity-invalid' })

            expect(respOrErr.isLeft()).toBeTruthy()
        })

        it('should return error when find all categories with unity_id invalid', async () => {
            const { sut } = makeSutFindAll()

            const respOrErr = await sut.execute({ unity_id: null as any })

            expect(respOrErr.isLeft()).toBeTruthy()
            expect(respOrErr.extract()).toBeInstanceOf(AbstractError)
        })
    })

    describe('Delete form by id Use Case', () => {
        it('should delete form by id', async () => {
            const { sut } = makeSutDelete()
            const respOrErr = await sut.execute({ id: '123' })
            expect(respOrErr.isRight()).toBeTruthy()
        })

        it('should return error when delete form by id', async () => {
            const { sut } = makeSutDelete()
            vi.spyOn(FormManager, 'deleteFormById').mockImplementationOnce(async () => {
                return left(undefined) as any
            })
            const respOrErr = await sut.execute({ id: 'id-invalid' })
            expect(respOrErr.isLeft()).toBeTruthy()
        })

        it('should return error when delete form with id invalid', async () => {
            const { sut } = makeSutDelete()
            const respOrErr = await sut.execute({ id: null as any })
            expect(respOrErr.isLeft()).toBeTruthy()
        })
    })

    describe('Find form by id Use Case', () => {
        it('should find form by id', async () => {
            const { sut } = makeSutFindById()
            const respOrErr = await sut.execute({ id: '123' })
            expect(respOrErr.isRight()).toBeTruthy()
        })

        it('should return error when find form by id', async () => {
            const { sut } = makeSutFindById()
            vi.spyOn(FormManager, 'findById').mockImplementationOnce(async () => {
                return left(undefined) as any
            })
            const respOrErr = await sut.execute({ id: 'id-invalid' })
            expect(respOrErr.isLeft()).toBeTruthy()
        })

        it('should return error when find by id form with id invalid', async () => {
            const { sut } = makeSutFindById()
            const respOrErr = await sut.execute({ id: null as any, ...form })
            expect(respOrErr.isLeft()).toBeTruthy()
        })

    })


    describe('Update form by id Use Case', () => {
        it('should update form', async () => {
            const { sut } = makeSutUpdate()
            const respOrErr = await sut.execute({ id: '123', ...form })
            expect(respOrErr.isRight()).toBeTruthy()
        })

        it('should return error when update form', async () => {
            const { sut } = makeSutUpdate()
            vi.spyOn(FormManager, 'update').mockImplementationOnce(async () => {
                return left(undefined) as any
            })
            const respOrErr = await sut.execute({ id: 'id-invalid', ...form })
            expect(respOrErr.isLeft()).toBeTruthy()
        })
        it('should return error when update form with id invalid', async () => {
            const { sut } = makeSutUpdate()
            const respOrErr = await sut.execute({ id: null as any, ...form })
            expect(respOrErr.isLeft()).toBeTruthy()
        })
    })
})

