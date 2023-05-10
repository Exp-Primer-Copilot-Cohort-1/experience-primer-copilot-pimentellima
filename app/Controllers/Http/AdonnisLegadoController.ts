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
	const { data } = await api.get(url)
	return data
}

const post = async (url: string, body: any) => {
	const { data } = await api.post(url, body)
	return data
}

const put = async (url: string, body: any) => {
	const { data } = await api.put(url, body)
	return data
}

const del = async (url: string) => {
	const { data } = await api.delete(url)
	return data
}

class AdonnisLegadoController {
	public async bridge({ request, auth }: HttpContextContract) {
		const url = request.url(true)
		const unity_id = auth.user?.unity_id
		const role = auth.user?.type

		const uri = url + `?unity_id=${unity_id}&type=${role}`

		const method = Methods[request.method()]

		switch (method) {
			case Methods.GET:
				return get(uri)
			case Methods.POST:
				return post(uri, request.body())
			case Methods.PUT:
				return put(uri, request.body())
			case Methods.DELETE:
				return del(uri)
		}
	}
}

export default AdonnisLegadoController
