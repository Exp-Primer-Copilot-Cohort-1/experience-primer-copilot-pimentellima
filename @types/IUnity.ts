/* eslint-disable @typescript-eslint/naming-convention */
export interface IUnity {
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
  cnaes: null
  complement: null
  country: string
  name_company: string
  neighbohood: string
  obs: null
  phones: IPhone[]
  site: string
  state: string
}

export interface IPhone {
  value: string
  id: number
}
