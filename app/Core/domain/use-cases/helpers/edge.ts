import { UseCase } from "App/Core/interfaces/use-case.interface"

const EDGE = {
	activity: 'emails/activity',
	confirm_user: 'emails/confirm-user',
	confirm: 'emails/confirm',
	forgot_password: 'emails/forgot-password',
	create_password: 'emails/create-password',
	forgot_password_text: 'emails/forgot-password-text',
	new_account: 'emails/new-account',
	welcome: 'emails/welcome',
	reply_current_greater_previous: 'emails/reply-current-greater-previous',
}

/**
 * Parâmetros necessários para enviar um e-mail através do helper Edge.
 */
export type MailParams = {
	/**
	 * Constante que representa o template de e-mail a ser utilizado.
	 */
	edge: EdgeValues
	/**
	 * Propriedades adicionais que podem ser utilizadas na construção do e-mail.
	 */
	props: object
	/**
	 * Endereço de e-mail do destinatário.
	 */
	email: string
	/**
	 * Título do e-mail.
	 */
	title: string
}

/**
 * Contract que representa o caso de uso de envio de e-mail.
 * @template MailParams Tipo dos parâmetros necessários para enviar o e-mail.
 * @template Message Tipo da mensagem que será enviada.
 */
export type ISendEmailUseCase = UseCase<MailParams, Message>

export type EdgeValues = (typeof EDGE)[keyof typeof EDGE]

export default EDGE
