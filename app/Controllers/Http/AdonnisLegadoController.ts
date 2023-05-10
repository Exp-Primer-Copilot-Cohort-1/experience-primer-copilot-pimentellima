/* eslint-disable indent */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000',
})

enum Methods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

const get = async (url: string) => {
	try {
		const { data } = await api.get(url)
		return data
	} catch (error) {
		throw new Error(error)
	}
}

const post = async (url: string, body: any) => {
	try {
		const { data } = await api.post(url, body)
		return data
	} catch (error) {
		throw new Error(error)
	}
}

const put = async (url: string, body: any) => {
	try {
		const { data } = await api.put(url, body)
		return data
	} catch (error) {
		throw new Error(error)
	}
}

const del = async (url: string) => {
	try {
		const { data } = await api.delete(url)
		return data
	} catch (error) {
		throw new Error(error)
	}
}

class AdonnisLegadoController {
	public async bridge({ request, auth }: HttpContextContract) {
		const url = request.url(true)
		const unity_id = auth.user?.unity_id
		const role = auth.user?.type

		const newParams = {
			...request.qs(),
			unity_id: unity_id?.toString() || '',
			type: role || '',
		}

		const params = new URLSearchParams(newParams).toString()

		const uri = url + `?${params}`

		const method = Methods[request.method()]

		try {
			let response

			switch (method) {
				case Methods.GET:
					response = await get(uri)
					break
				case Methods.POST:
					response = await post(uri, request.body())
					break
				case Methods.PUT:
					response = await put(uri, request.body())
					break
				case Methods.DELETE:
					response = await del(uri)
					break
			}

			return response
		} catch (error) {
			console.log(error)
			return error
		}
	}
}

export default AdonnisLegadoController
