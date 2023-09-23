import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeSignInComposer } from 'App/Core/composers'

class SessionController {
	/**
	 * @swagger
	 * /sessions:
	 *   post:
	 *     summary: Rota para login de usuário
	 *     tags:
	 *       - Autenticação
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               email:
	 *                 type: string
	 *                 description: Email do usuário
	 *                 example: john@example.com
	 *               password:
	 *                 type: string
	 *                 description: Senha do usuário
	 *                 example: password123
	 *             required:
	 *               - email
	 *               - password
	 *     responses:
	 *       200:
	 *         description: Usuário autenticado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 token:
	 *                   type: string
	 *                   description: Token JWT para usuário autenticado
	 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
	 *       401:
	 *         description: Credenciais inválidas
	 *       500:
	 *         description: Erro interno do servidor
	 */
	public async store(ctx: HttpContextContract) {
		return adaptRoute(makeSignInComposer(ctx), ctx)
	}

	/**
	 * Gera um novo token JWT para o usuário autenticado.
	 * @param request - Requisição HTTP
	 * @param auth - Instância do serviço de autenticação
	 * @returns Token JWT gerado
	 */
	public async refreshToken({ request, auth }: HttpContextContract) {
		return auth.use('api').generate(request.input('refresh_token'))
	}

	/**
	 * Retorna o usuário autenticado.
	 * @param auth - Instância do serviço de autenticação
	 * @returns Usuário autenticado
	 */
	public async getUser({ auth }: HttpContextContract) {
		const user = auth.user
		return user
	}

	/**
	 * Verifica se o token JWT é válido.
	 * @param auth - Instância do serviço de autenticação
	 * @param response - Resposta HTTP
	 */
	public async checkToken({ auth, response }: HttpContextContract) {
		try {
			await auth.check()
		} catch (error) {
			response.send('Token JWT inválido ou ausente')
			await auth.logout()
			await auth.use('api').revoke()
		}
	}

	/**
	 * Realiza o logout do usuário autenticado.
	 * @param auth - Instância do serviço de autenticação
	 * @param response - Resposta HTTP
	 * @returns Mensagem de sucesso ou status 204
	 */
	async logout({ auth, response }: HttpContextContract) {
		try {
			await auth.use('api').revoke() // 'api' é o guard padrão para autenticação via token
			await auth.logout()
			return response.status(200).json({ message: 'Logout bem-sucedido' })
		} catch (error) {
			return response.status(204)
		}
	}
}

export default SessionController
