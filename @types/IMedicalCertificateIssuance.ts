export interface IMedicalCertificateIssuance {
	client: {
		label: string
		value: string
	}
	medicalCertificate: {
		name: string
		text: string
	}
	date: Date
	unity_id: string
}
