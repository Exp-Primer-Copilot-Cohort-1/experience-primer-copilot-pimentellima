/* eslint-disable @typescript-eslint/naming-convention */
export type IUnity = Nullable<{
	_id: string
	name: string
	is_company: boolean
	document: string
	date_expiration: Date
	active: boolean
	created_at: Date
	updated_at: Date
	email: string
	address: string
	address_number: string
	avatar: string
	cep: string
	city: string
	cnaes: string
	complement: string
	country: string
	name_company: string
	neighbohood: string
	obs: string
	phones: IPhone[]
	site: string
	state: string
}>

export type IPhone = Nullable<{
	value: string
	id: number
}>
