/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
	return { hello: 'world' }
})

Route.post('sessions', 'SessionController.store')
Route.get('script', 'AdminController.script')

Route.post('users', 'UserController.store')

Route.get('unity', 'UnityController.index')

Route.put('activity-stts/:id', 'AdonnisLegadoController.bridge')
Route.get('activity/:id', 'ActivityController.findActivityById')
Route.put('activity-user/:id', 'AdonnisLegadoController.bridge')

Route.get('permissions-default', 'PermissionController.defaultPermissions')

Route.post('recover', 'RecoverController.store')

Route.group(() => {
	Route.put('active/:_id', 'AdminController.activeUser')
	Route.get('prof/:type', 'AdminController.findAllByProfs')
	Route.get('unity/:unity_id', 'AdminController.findAllByUnity')
	Route.get('inatives', 'AdminController.findAllInatives')
	Route.get('unities', 'AdminController.findAllUnities')
	Route.put('unity/:unity_id/:days', 'AdminController.addDateExpiration')
})
	.prefix('admin')
	.middleware('apiKey')

Route.group(() => {
	Route.post('unity', 'SignUpUnityController.store')
	Route.post('user', 'SignUpAdminController.store')
	Route.put('users-confirm/:id', 'SignUpAdminController.activeUser')
})

Route.group(() => {
	Route.get('sessions/user', 'SessionController.getUser')
	Route.post('sessions/refresh', 'SessionController.refreshToken')
	Route.get('sessions/check', 'SessionController.checkToken')
}).middleware('auth')

Route.group(() => {
	Route.group(() => {
		Route.get('', 'ClientController.findAllUsersClients').as('clients.index')
		Route.get('inactives', 'ClientController.findAllUsersClientsInative').as(
			'clients.inactives',
		)
		Route.get(':id', 'ClientController.findUserClientByID').as('clients.show')
		Route.get('verify/client', 'ClientController.verifyExistenceClient').as(
			'clients.verify',
		)
		Route.put(':id', 'ClientController.update').as('clients.update')
		Route.post('', 'ClientController.create').as('clients.store')
	}).prefix('clients')

	Route.group(() => {
		Route.get('prof', 'UserControllerV2.findAllUsersProfs').as('users.prof.index')
		Route.get('secs', 'UserControllerV2.findAllUsersSecs').as('users.secs.index')
		Route.get('prof/inactives', 'UserControllerV2.findAllUsersProfsInative').as(
			'users.prof.inactives',
		)
		Route.get('secs/inative', 'UserControllerV2.findAllUsersSecsInative').as(
			'users.secs.inactives',
		)
		Route.get('prof/:id', 'AdonnisLegadoController.bridge').as('users.prof.show')
		Route.put(':id', 'AdonnisLegadoController.bridge').as('users.update')
		Route.delete(':id', 'UserController.destroy').as('users.destroy')
	}).prefix('users')

	Route.group(() => {
		Route.get('', 'HealthInsuranceController.index').as('health-insurance.index')
		Route.get(':id', 'HealthInsuranceController.show').as('health-insurance.show')
		Route.put(':_id', 'HealthInsuranceController.update').as(
			'health-insurance.update',
		)
		Route.delete(':id', 'HealthInsuranceController.destroy').as(
			'health-insurance.destroy',
		)
		Route.post('', 'HealthInsuranceController.store').as('health-insurance.store')
	}).prefix('health-insurance')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('activity-await.index')
		Route.get(':id', 'AdonnisLegadoController.bridge').as('activity-await.show')
		Route.put(':id', 'AdonnisLegadoController.bridge').as('activity-await.update')
		Route.delete(':id', 'AdonnisLegadoController.bridge').as('activity-await.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('activity-await.store')
	}).prefix('activity-await')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('stock.index')
		Route.get(':id', 'AdonnisLegadoController.bridge').as('stock.show')
		Route.put(':id', 'AdonnisLegadoController.bridge').as('stock.update')
		Route.put('update/:id', 'AdonnisLegadoController.bridge').as('stock.update.id')
		Route.delete(':id', 'AdonnisLegadoController.bridge').as('stock.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('stock.store')
	}).prefix('stock')

	Route.group(() => {
		Route.get('', 'ProcedureController.index').as('procedures.index')
		Route.get(':id', 'ProcedureController.show').as('procedures.show')
		Route.put(':_id', 'ProcedureController.update').as('procedures.update')
		Route.delete(':id', 'ProcedureController.destroy').as('procedures.destroy')
		Route.post('', 'ProcedureController.store').as('procedures.store')
	}).prefix('procedures')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('category.index')
		Route.get(':id', 'AdonnisLegadoController.bridge').as('category.show')
		Route.put(':id', 'AdonnisLegadoController.bridge').as('category.update')
		Route.delete(':id', 'AdonnisLegadoController.bridge').as('category.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('category.store')
	}).prefix('category')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('partner.index')
		Route.get(':id', 'AdonnisLegadoController.bridge').as('partner.show')
		Route.put(':id', 'AdonnisLegadoController.bridge').as('partner.update')
		Route.delete(':id', 'AdonnisLegadoController.bridge').as('partner.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('partner.store')
	}).prefix('partner')

	Route.group(() => {
		Route.get('prof/:prof_id', 'FormController.findFormByProfId').as('form.prof.show')
		Route.get('category/:category_id', 'AdonnisLegadoController.bridge').as(
			'form.category.show',
		)
		Route.post('', 'AdonnisLegadoController.bridge').as('form.store')
		Route.get('', 'FormController.findAllForms').as('form.index')
		Route.get(':id', 'AdonnisLegadoController.bridge').as('form.show')
		Route.put(':id', 'AdonnisLegadoController.bridge').as('form.update')
		Route.delete(':id', 'AdonnisLegadoController.bridge').as('form.destroy')
	}).prefix('form')

	Route.group(() => {
		Route.post('', 'AnswerController.createAnswer').as('answer.store')
		Route.get('', 'AnswerController.findAllAnswers').as('answer.index')
		Route.get(':id', 'AnswerController.findAnswerById').as('answer.show')
		Route.get('form/:form_id', 'AnswerController.findAnswersByFormId').as(
			'answer.form.show',
		)
		Route.get('client/:client_id', 'AnswerController.findAnswersByClientId').as(
			'answer.client.show',
		)
		Route.put(':id', 'AnswerController.updateAnswerById').as('answer.update')
		Route.delete(':id', 'AnswerController.deleteAnswerById').as('answer.destroy')
	}).prefix('answer')

	Route.group(() => {
		Route.get(':id', 'UnityController.show')
		// Route.delete('unity/:id', 'UnityController.destroy')
		Route.put(':_id', 'UnityController.update')
	}).prefix('unity')
}).middleware(['auth', 'role'])

Route.group(() => {
	Route.get('answer-log-by-form/:form_id', 'LogAnswerController.showByFormId').as(
		'logAnswer.byFormId',
	)

	Route.get('activity-stock', 'AdonnisLegadoController.bridge').as('activity.stock')

	Route.group(() => {
		Route.get('', 'ActivityController.findAllActivities').as('activity.index')
		Route.put(':id', 'ActivityController.updateActivityById').as('activity.update')
		Route.get('prof/:prof_id', 'ActivityController.findActivitiesByProfId').as(
			'activity.byProfId',
		)
		Route.get('client/:client_id', 'ActivityController.findActivitiesByClientId').as(
			'activity.byClientId',
		)
		Route.delete(':id', 'ActivityController.deleteActivityById').as(
			'activity.destroy',
		)
		Route.post('', 'ActivityController.createActivity').as('activity.store')
		Route.post('payment', 'ActivityController.payment').as('activity.payment')
	}).prefix('activity')

	Route.group(() => {
		Route.get('', 'ProcedureController.index').as('procedure.index')
		Route.get(':id', 'ProcedureController.show').as('procedure.show')
		Route.put(':_id', 'ProcedureController.update').as('procedure.update')
		Route.delete(':id', 'ProcedureController.destroy').as('procedure.destroy')
		Route.post('', 'ProcedureController.store').as('procedure.store')
	}).prefix('procedure')

	Route.group(() => {
		Route.get('', 'ScheduleController.index').as('schedule.index')
		Route.get(':id', 'ScheduleController.show').as('schedule.show')
		Route.put(':id', 'ScheduleController.update').as('schedule.update')
		Route.delete(':id', 'ScheduleController.destroy').as('schedule.destroy')
		Route.post('', 'ScheduleController.store').as('schedule.store')
	}).prefix('schedule')

	Route.get('activity', 'ActivityController.findAllActivities')
	Route.put('activity/:id', 'ActivityController.updateActivityById')
	Route.put('activity/status/:id', 'ActivityController.updateActivityStatusById')
	Route.get('activity/prof/:prof_id', 'ActivityController.findActivitiesByProfId')
	Route.get('activity/client/:client_id', 'ActivityController.findActivitiesByClientId')
	Route.delete('activity/:id', 'ActivityController.deleteActivityById')
	Route.post('activity', 'ActivityController.createActivity')

	Route.post('/upload', 'AdonnisLegadoController.bridge').as('upload.image')

	Route.get('reports-activities', 'AdonnisLegadoController.bridge').as(
		'reports.activities',
	)
	Route.get('reports-activities-partner', 'AdonnisLegadoController.bridge').as(
		'reports.activities.partner',
	)
	Route.get('reports-payment', 'AdonnisLegadoController.bridge').as('reports.payment')
	Route.get('reports-payment-type', 'AdonnisLegadoController.bridge').as(
		'reports.payment.type',
	)
	Route.get('reports-payment-prof', 'AdonnisLegadoController.bridge').as(
		'reports.payment.prof',
	)
	Route.get('reports-payment-prof-date', 'AdonnisLegadoController.bridge').as(
		'reports.payment.prof.date',
	)
	Route.get('reports-procedure', 'AdonnisLegadoController.bridge').as(
		'reports.procedure',
	)
	Route.get('reports-canceled', 'AdonnisLegadoController.bridge').as('reports.canceled')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('room.index')
		Route.get('/:userId', 'AdonnisLegadoController.bridge').as('room.show')
		Route.get('support', 'AdonnisLegadoController.bridge').as('room.support')
		Route.post('/:id', 'AdonnisLegadoController.bridge').as('room.store')
		Route.get('unread', 'AdonnisLegadoController.bridge').as('room.unread')
	}).prefix('room')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('ingredients.index')
		Route.get('/:id', 'AdonnisLegadoController.bridge').as('ingredients.show')
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('ingredients.update')
		Route.delete('/:id', 'AdonnisLegadoController.bridge').as('ingredients.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('ingredients.store')
	}).prefix('ingredients')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('ingredients-list.index')
		Route.get('/:id', 'AdonnisLegadoController.bridge').as('ingredients-list.show')
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('ingredients-list.update')
		Route.delete('/:id', 'AdonnisLegadoController.bridge').as(
			'ingredients-list.destroy',
		)
		Route.post('', 'AdonnisLegadoController.bridge').as('ingredients-list.store')
	}).prefix('ingredients-list')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('sick-notes.index')
		Route.get('/:id', 'AdonnisLegadoController.bridge').as('sick-notes.show')
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('sick-notes.update')
		Route.delete('/:id', 'AdonnisLegadoController.bridge').as('sick-notes.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('sick-notes.store')
	}).prefix('sick-notes')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('directMail.index')
		Route.get('/:id', 'AdonnisLegadoController.bridge').as('directMail.show')
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('directMail.update')
		Route.delete('/:id', 'AdonnisLegadoController.bridge').as('directMail.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('directMail.store')
	}).prefix('direct-mail')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('pictures.index')
		Route.get('/:id', 'AdonnisLegadoController.bridge').as('pictures.show')
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('pictures.update')
		Route.delete('/:id', 'AdonnisLegadoController.bridge').as('pictures.destroy')
		Route.post('', 'AdonnisLegadoController.bridge').as('pictures.store')
	}).prefix('pictures')

	Route.get('activities-date', 'AdonnisLegadoController.bridge').as(
		'activities-date.index',
	)

	Route.group(() => {
		Route.get('', 'PaymentProfController.findAllPaymentProfs').as(
			'payments-prof.index',
		)
		Route.get('/:id', 'PaymentProfController.findPaymentProfById').as(
			'payments-prof.show',
		)
		Route.put('/:id', 'PaymentProfController.updatePaymentProfById').as(
			'payments-prof.update',
		)
		Route.delete('/:id', 'PaymentProfController.deletePaymentProfById').as(
			'payments-prof.destroy',
		)
		Route.post('', 'PaymentProfController.createPaymentProf').as(
			'payments-prof.store',
		)
	}).prefix('payments-prof')

	Route.group(() => {
		Route.get('', 'FinancialCategoryController.index').as(
			'financial-categories.index',
		)
		Route.get('/inactives', 'FinancialCategoryController.inactives').as(
			'financial-categories.inactives',
		)
		Route.get('/:id', 'FinancialCategoryController.show').as(
			'financial-categories.show',
		)
		Route.put('/:id', 'FinancialCategoryController.update').as(
			'financial-categories.update',
		)
		Route.delete('/:id', 'FinancialCategoryController.destroy').as(
			'financial-categories.destroy',
		)
		Route.post('', 'FinancialCategoryController.store').as(
			'financial-categories.store',
		)
	}).prefix('financial-categories')

	Route.group(() => {
		Route.get('', 'CostCenterController.index').as('cost-centers.index')
		Route.get('/inactives', 'CostCenterController.inactives').as(
			'cost-centers.inactives',
		)
		Route.get('/:id', 'CostCenterController.show').as('cost-centers.show')
		Route.put('/:id', 'CostCenterController.update').as('cost-centers.update')
		Route.delete('/:id', 'CostCenterController.destroy').as('cost-centers.destroy')
		Route.post('', 'CostCenterController.store').as('cost-centers.store')
	}).prefix('cost-centers')

	Route.group(() => {
		Route.get('', 'AccountController.findAllAccounts').as('accounts.index')
		Route.get('/:id', 'AccountController.findAccountById').as('accounts.show')
		Route.put('/:id', 'AccountController.updateAccountById').as('accounts.update')
		Route.delete('/:id', 'AccountController.deleteAccountById').as('accounts.destroy')
		Route.post('', 'AccountController.createAccount').as('accounts.store')
	}).prefix('accounts')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('default-config.index')
		Route.get('/:id', 'AdonnisLegadoController.bridge').as('default-config.show')
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('default-config.update')
		Route.delete('/:id', 'AdonnisLegadoController.bridge').as(
			'default-config.destroy',
		)
		Route.post('', 'AdonnisLegadoController.bridge').as('default-config.store')
	}).prefix('default-config')

	Route.group(() => {
		Route.get('', 'AdonnisLegadoController.bridge').as('transactions.index')
		Route.put('/stts/:id', 'AdonnisLegadoController.bridge').as(
			'transactions.updateStatus',
		)
		Route.put('/:id', 'AdonnisLegadoController.bridge').as('transactions.update')
		Route.post('', 'AdonnisLegadoController.bridge').as('transactions.store')
	}).prefix('transactions')

	Route.post('import', 'ImportController.import').as('import')
}).middleware(['auth', 'role'])
