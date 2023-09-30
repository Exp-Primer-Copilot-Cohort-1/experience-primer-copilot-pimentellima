import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAccountComposer } from 'App/Core/composers/accounts/make-create-account-composer'
import { makeDeleteAccountComposer } from 'App/Core/composers/accounts/make-delete-account-composer'
import { makeFindAccountComposer } from 'App/Core/composers/accounts/make-find-account-by-id-composer'
import { makeFindAllAccountsComposer } from 'App/Core/composers/accounts/make-find-all-accounts-composer'
import { makeUpdateAccountByIdComposer } from 'App/Core/composers/accounts/make-update-account-by-id-composer'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/Account'

/**
 * @swagger
 * tags:
 *   name: Contas
 *   description: Endpoints para gerenciar as contas bancárias da unidade.
 */

class AccountController {
	/**
	 * Retorna todas as contas.
	 * @swagger
	 * /accounts:
	 *   get:
	 *     summary: Retorna todas as contas.
	 *     tags:
	 *       - Contas
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Account'
	 */
	async findAllAccounts(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllAccountsComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Busca uma conta pelo ID.
	 * @swagger
	 * /accounts/{id}:
	 *   get:
	 *     summary: Busca uma conta pelo ID.
	 *     tags:
	 *       - Contas
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID da conta a ser buscada.
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: Conta encontrada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Account'
	 *       404:
	 *         description: Conta não encontrada.
	 */
	async findAccountById(ctx: HttpContextContract) {
		return adaptRoute(makeFindAccountComposer(), ctx)
	}

	/**
	 * Atualiza uma conta pelo ID.
	 * @swagger
	 * /accounts/{id}:
	 *   put:
	 *     summary: Atualiza uma conta pelo ID.
	 *     tags:
	 *       - Contas
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da conta a ser atualizada.
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     requestBody:
	 *       description: Dados da conta a serem atualizados.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Account'
	 *     responses:
	 *       '200':
	 *         description: Conta atualizada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Account'
	 *       '404':
	 *         description: Conta não encontrada.
	 *       '500':
	 *         description: Erro interno do servidor.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateAccount(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateAccountByIdComposer(), ctx)
	}

	async deleteAccountById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteAccountComposer(), ctx)
	}

	/**
	 * Cria uma nova conta.
	 * @swagger
	 * /accounts:
	 *   post:
	 *     summary: Cria uma nova conta.
	 *     tags:
	 *       - Contas
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       description: Dados da nova conta.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Account'
	 *     responses:
	 *       '200':
	 *         description: Conta criada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/CreateAccountResponse'
	 *       '400':
	 *         description: Requisição inválida.
	 *
	 *       '401':
	 *         description: Não autorizado.
	 *
	 *       '500':
	 *         description: Erro interno do servidor.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createAccount(ctx: HttpContextContract) {
		return adaptRoute(makeCreateAccountComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default AccountController
