/* eslint-disable indent */
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

const api = axios.create({
	baseURL: Env.get('ADONNIS_LEGADO_URL'),
	headers: {
		'Content-Type': 'application/json',
	},
})

enum Methods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

const get = async (url: string, params: any) => {
	const { data, status } = await api.get(url, { params })

	if (status > 299) {
		console.log(data)
		return []
	}

	return data
}

const post = async (url: string, body: any, params: any) => {
	const { data } = await api.post(url, body, { params })
	return data
}

const put = async (url: string, body: any, params: any) => {
	const { data } = await api.put(url, body, { params })
	return data
}

const del = async (url: string, params: any) => {
	const { data } = await api.delete(url, { params })
	return data
}

class AdonnisLegadoController {
	public async bridge({ request, auth }: HttpContextContract) {
		const url = request.url(false)

		const unity_id = auth.user?.unity_id
		const role = auth.user?.type

		const newParams = {
			...request.qs(),
			unity_id: unity_id?.toString() || '',
			type: role || '',
		}

		Object.keys(newParams).forEach((key) => {
			if (newParams[key] === '') {
				delete newParams[key]
			}
		})

		const params = new URLSearchParams(newParams)

		const method = Methods[request.method()]

		try {
			switch (method) {
				case Methods.GET:
					return await get(url, params)
				case Methods.POST:
					return await post(url, request.body(), params)
				case Methods.PUT:
					return await put(url, request.body(), params)
				case Methods.DELETE:
					return await del(url, params)
			}
		} catch (error) {
			console.log(error)
			return error
		}
	}
}

export default AdonnisLegadoController
