/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'

Event.on('new:user', 'User.onNewUser')
Event.on('new:password', 'User.onNewPassword')

Event.on('new:unity', 'Unity.onNewUnity')
Event.on('new:reply-form-standard-franchise', 'ReplyStandardForm.onNewReplyFormStandardFranchise')
Event.on(
	'new:email-current-reply-in-greater-previous',
	'ReplyStandardForm.onNewEmailCurrentReplyInGreaterPrevious'
)

Event.on('new:appointment', 'Appointment.onNewAppointment')