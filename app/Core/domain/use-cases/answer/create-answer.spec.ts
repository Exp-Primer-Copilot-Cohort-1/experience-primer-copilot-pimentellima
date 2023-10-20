import { AnswerInMemoryRepository } from "App/Core/domain/repositories/answer/answer-in-memory-repository";
import { describe, expect, it } from "vitest";
import { CreateAnswerUseCase } from "./create-answer-use-case";

const answer = {
    name: 'EXAME CLÍNICO/FÍSICO',
    category_id: '6364230bc109b232759921f7',
    client_id: '6399d980373d349c09b46db1',
    prof_id: '63528c12c109b232759921d3',
    form_id: '63644c30c109b232759921f9',
    unity_id: '1',
    activity_id: '645938d9ac66503868ea8d41',
    questions: [
        {
            id: 'F0DDE4D2-C181-4DF6-815C-E688D704ADF6',
            element: 'Checkboxes',
            text: 'Caixas de Seleção',
            required: false,
            canHaveAnswer: true,
            canHavePageBreakBefore: true,
            canHaveAlternateForm: true,
            canHaveDisplayHorizontal: true,
            canHaveOptionCorrect: true,
            canHaveOptionValue: true,
            canPopulateFromApi: true,
            field_name: 'checkboxes_DBB2204D-66AA-4A02-A5F0-17CCE5483F6B',
            label: '<strong>APRESENTAÇÃO DO PACIENTE:<br></strong>(Como o paciente se apresenta e/ou chegou a clínica?) ',
            options: [
                {
                    value: 'place_holder_option_1',
                    text: 'Deambulando',
                    key: 'checkboxes_option_4363015D-82AC-40BB-9F40-E25AEC39A8E9'
                },
                {
                    value: 'place_holder_option_2',
                    text: 'Deambulando com apoio/auxílio ',
                    key: 'checkboxes_option_FD353E68-423C-49E7-8197-331BE7D9D807'
                },
                {
                    value: 'place_holder_option_3',
                    text: 'Cadeira de rodas',
                    key: 'checkboxes_option_62A448DF-4B25-45E4-9A46-8400BCE346C3'
                },
                {
                    value: 'orientado',
                    text: 'Orientado',
                    key: '83551E4D-8F4A-4089-9EFD-FC4BB270FC69'
                },
                {
                    value: 'internado',
                    text: 'Internado',
                    key: '6DBBB1F6-63CB-484F-81A0-44D8ADE58DAE'
                }
            ],
            dirty: false
        },
        {
            id: 'FA715FBA-5B4E-4E9F-8FD8-91CDD677ABD9',
            element: 'FileUpload',
            text: 'Upload de arquivo',
            required: false,
            canHavePageBreakBefore: true,
            canHaveAlternateForm: true,
            canHaveDisplayHorizontal: true,
            canHaveOptionCorrect: true,
            canHaveOptionValue: true,
            canPopulateFromApi: true,
            field_name: 'file_upload_B7452A14-ADA5-41AA-A72F-8750B49F0D20',
            label: '<strong>EXAMES COMPLEMENTARES:</strong> <br>(Anexar aqui exames complementares do paciente, em PDF) ',
            dirty: false,
            fileType: 'application/pdf'
        }
    ],
    answers: [
        {
            name: 'checkboxes_DBB2204D-66AA-4A02-A5F0-17CCE5483F6B',
            custom_name: 'checkboxes_DBB2204D-66AA-4A02-A5F0-17CCE5483F6B',
            value: [
                'checkboxes_option_4363015D-82AC-40BB-9F40-E25AEC39A8E9'
            ]
        },
        {
            name: 'file_upload_B7452A14-ADA5-41AA-A72F-8750B49F0D20',
            custom_name: 'file_upload_B7452A14-ADA5-41AA-A72F-8750B49F0D20',
            value: null
        },
        {
            name: 'text_input_63C740BB-90A7-4529-8CC1-423A52CF7DC2',
            custom_name: 'text_input_63C740BB-90A7-4529-8CC1-423A52CF7DC2',
            value: ''
        },
        {
            name: 'text_input_641D94E6-8790-420B-9192-3B4F215BE0B7',
            custom_name: 'text_input_641D94E6-8790-420B-9192-3B4F215BE0B7',
            value: ''
        },
        {
            name: 'text_input_966FC93B-CC64-4E67-A683-12526AD9905A',
            custom_name: 'text_input_966FC93B-CC64-4E67-A683-12526AD9905A',
            value: ''
        },
        {
            name: 'text_input_8FC94F8A-F6BB-45B1-9D27-AE608F2BC369',
            custom_name: 'text_input_8FC94F8A-F6BB-45B1-9D27-AE608F2BC369',
            value: ''
        },
        {
            name: 'text_input_63403FE8-CDB3-4880-A220-45186EB658D8',
            custom_name: 'text_input_63403FE8-CDB3-4880-A220-45186EB658D8',
            value: ''
        },
        {
            name: 'text_input_5B5E4219-AA27-41D1-B9B8-F7C53889FAF9',
            custom_name: 'text_input_5B5E4219-AA27-41D1-B9B8-F7C53889FAF9',
            value: ''
        },
        {
            name: 'range_12AD2A7B-EB14-4706-A55B-43E4D10D37E1',
            custom_name: 'range_12AD2A7B-EB14-4706-A55B-43E4D10D37E1',
            value: 1
        }
    ],
    active: true,
    created_at: '2023-05-08T18:43:05.024Z',
    updated_at: '2023-05-08T18:43:05.024Z'
}

describe("Create Answer (Unit)", () => {
    it("should create answer", async () => {
        const respOrErr = await new CreateAnswerUseCase(new AnswerInMemoryRepository()).execute(
            answer as any
        );

        expect(respOrErr.isRight()).toBeTruthy();
    })
})