const EDGE = {
	activity: 'emails/activity',
	confirm_user: 'emails/confirm-user',
	confirm: 'emails/confirm',
	forgot_password: 'emails/forgot-password',
	create_password: 'emails/create-password',
	forgot_password_text: 'emails/forgot-password-text',
	new_account: 'emails/new-account',
	welcome: 'emails/welcome',
}
export type EdgeValues = (typeof EDGE)[keyof typeof EDGE]

export default EDGE
