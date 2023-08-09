export interface IClientPrescription {
    client: {
        label: string,
        value: string
    }
    prescription: {
        name: string,
        text: string
    }
    date: Date
    unity_id: string
}