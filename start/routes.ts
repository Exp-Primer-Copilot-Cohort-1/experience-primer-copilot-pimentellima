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
Route.get('unity/:id', 'UnityController.show')
Route.delete('unity/:id', 'UnityController.destroy')
Route.put('unity/:_id', 'UnityController.update')

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
	Route.get('', 'ClientController.findAllUsersClients')
	Route.get('inactives', 'ClientController.findAllUsersClientsInative')
	Route.get(':id', 'ClientController.findUserClientByID')
	Route.get('verify/client', 'ClientController.verifyExistenceClient')
	Route.put(':id', 'ClientController.update')
	Route.post('', 'ClientController.create')
})
	.prefix('clients')
	.middleware('auth')

Route.group(() => {
	Route.get('prof', 'UserControllerV2.findAllUsersProfs')
	Route.get('secs', 'UserControllerV2.findAllUsersSecs')
	Route.get('prof/inactives', 'UserControllerV2.findAllUsersProfsInative')
	Route.get('secs/inative', 'UserControllerV2.findAllUsersSecsInative')
	Route.get('prof/:id', 'AdonnisLegadoController.bridge')
	Route.put(':id', 'AdonnisLegadoController.bridge')
	Route.delete(':id', 'UserController.destroy')
})
	.prefix('users')
	.middleware('auth')

Route.group(() => {
	Route.get('sessions/user', 'SessionController.getUser')
	Route.post('sessions/refresh', 'SessionController.refreshToken')
	Route.get('sessions/check', 'SessionController.checkToken')
}).middleware('auth')

Route.group(() => {
	Route.get('', 'HealthInsuranceController.index')
	Route.get(':id', 'HealthInsuranceController.show')
	Route.put(':_id', 'HealthInsuranceController.update')
	Route.delete(':id', 'HealthInsuranceController.destroy')
	Route.post('', 'HealthInsuranceController.store')
})
	.prefix('health-insurance')
	.middleware('auth')

Route.group(() => {
	Route.get('', 'AdonnisLegadoController.bridge')
	Route.get(':id', 'AdonnisLegadoController.bridge')
	Route.put(':id', 'AdonnisLegadoController.bridge')
	Route.delete(':id', 'AdonnisLegadoController.bridge')
	Route.post('', 'AdonnisLegadoController.bridge')
})
	.prefix('activity-await')
	.middleware('auth')

Route.group(() => {
	Route.get('', 'AdonnisLegadoController.bridge')
	Route.get(':id', 'AdonnisLegadoController.bridge')
	Route.put(':id', 'AdonnisLegadoController.bridge')
	Route.put('update/:id', 'AdonnisLegadoController.bridge')
	Route.delete(':id', 'AdonnisLegadoController.bridge')
	Route.post('', 'AdonnisLegadoController.bridge')
})
	.prefix('stock')
	.middleware('auth')

Route.group(() => {
	Route.get('', 'ProcedureController.index')
	Route.get(':id', 'ProcedureController.show')
	Route.put(':_id', 'ProcedureController.update')
	Route.delete(':id', 'ProcedureController.destroy')
	Route.post('', 'ProcedureController.store')
})
	.prefix('procedures')
	.middleware('auth')

Route.group(() => {
	Route.get('', 'AdonnisLegadoController.bridge')
	Route.get(':id', 'AdonnisLegadoController.bridge')
	Route.put(':id', 'AdonnisLegadoController.bridge')
	Route.delete(':id', 'AdonnisLegadoController.bridge')
	Route.post('', 'AdonnisLegadoController.bridge')
})
	.prefix('category')
	.middleware('auth')

Route.group(() => {
	Route.get('', 'AdonnisLegadoController.bridge')
	Route.get(':id', 'AdonnisLegadoController.bridge')
	Route.put(':id', 'AdonnisLegadoController.bridge')
	Route.delete(':id', 'AdonnisLegadoController.bridge')
	Route.post('', 'AdonnisLegadoController.bridge')
})
	.prefix('partner')
	.middleware('auth')

Route.group(() => {
	Route.get('users', 'UserController.index')
	Route.get('users-type', 'UserController.indexByType')

	Route.get('form/prof/:prof_id', 'FormController.findFormByProfId')
	Route.get('form/category/:category_id', 'AdonnisLegadoController.bridge')
	Route.post('form', 'AdonnisLegadoController.bridge')
	Route.get('form', 'FormController.findAllForms')
	Route.get('form/:id', 'AdonnisLegadoController.bridge')
	Route.put('form/:id', 'AdonnisLegadoController.bridge')
	Route.delete('form/:id', 'AdonnisLegadoController.bridge')

	Route.post('answer', 'AnswerController.createAnswer')
	Route.get('answer', 'AnswerController.findAllAnswers')
	Route.get('answer/:id', 'AnswerController.findAnswerById')
	Route.get('answer/form/:form_id', 'AnswerController.findAnswersByFormId')
	Route.get('answer/client/:client_id', 'AnswerController.findAnswersByClientId')
	Route.put('answer/:id', 'AnswerController.updateAnswerById')
	Route.delete('answer/:id', 'AnswerController.deleteAnswerById')

	Route.get('answer-log-by-form/:form_id', 'LogAnswerController.showByFormId')

	Route.get('activity-stock', 'AdonnisLegadoController.bridge')

	Route.get('activity', 'ActivityController.findAllActivities')
	Route.put('activity/:id', 'ActivityController.updateActivityById')
	Route.get('activity/prof/:prof_id', 'ActivityController.findActivitiesByProfId')
	Route.get('activity/client/:client_id', 'ActivityController.findActivitiesByClientId')
	Route.delete('activity/:id', 'ActivityController.deleteActivityById')
	Route.post('activity', 'ActivityController.createActivity')

	Route.post('activity-pay', 'ActivityController.payment')

	Route.get('procedure', 'ProcedureController.index')
	Route.get('procedure/:id', 'ProcedureController.show')
	Route.put('procedure/:_id', 'ProcedureController.update')
	Route.delete('procedure/:id', 'ProcedureController.destroy')
	Route.post('procedure', 'ProcedureController.store')

	Route.get('schedule', 'ScheduleController.index')
	Route.get('schedule/:id', 'ScheduleController.show')
	Route.put('schedule/:id', 'ScheduleController.update')
	Route.delete('schedule/:id', 'ScheduleController.destroy')
	Route.post('schedule', 'ScheduleController.store')

	Route.get('permissions', 'AdonnisLegadoController.bridge')
	Route.get('permissions/:id', 'AdonnisLegadoController.bridge')
	Route.put('permissions/:id', 'AdonnisLegadoController.bridge')
	Route.post('permissions', 'AdonnisLegadoController.bridge')

	Route.post('/upload', 'AdonnisLegadoController.bridge')

	Route.get('reports-activities', 'AdonnisLegadoController.bridge')
	Route.get('reports-activities-partner', 'AdonnisLegadoController.bridge')
	Route.get('reports-payment', 'AdonnisLegadoController.bridge')
	Route.get('reports-payment-type', 'AdonnisLegadoController.bridge')
	Route.get('reports-payment-prof', 'AdonnisLegadoController.bridge')
	Route.get('reports-payment-prof-date', 'AdonnisLegadoController.bridge')
	Route.get('reports-procedure', 'AdonnisLegadoController.bridge')
	Route.get('reports-canceled', 'AdonnisLegadoController.bridge')

	Route.get('rooms', 'AdonnisLegadoController.bridge')
	Route.get('room/:userId', 'AdonnisLegadoController.bridge')
	Route.get('room-support', 'AdonnisLegadoController.bridge')
	Route.post('room/:id', 'AdonnisLegadoController.bridge')
	Route.get('room-unread', 'AdonnisLegadoController.bridge')

	Route.get('ingredients', 'AdonnisLegadoController.bridge')
	Route.get('ingredients/:id', 'AdonnisLegadoController.bridge')
	Route.put('ingredients/:id', 'AdonnisLegadoController.bridge')
	Route.delete('ingredients/:id', 'AdonnisLegadoController.bridge')
	Route.post('ingredients', 'AdonnisLegadoController.bridge')

	Route.get('ingredients-list', 'AdonnisLegadoController.bridge')
	Route.get('ingredients-list/:id', 'AdonnisLegadoController.bridge')
	Route.put('ingredients-list/:id', 'AdonnisLegadoController.bridge')
	Route.delete('ingredients-list/:id', 'AdonnisLegadoController.bridge')
	Route.post('ingredients-list', 'AdonnisLegadoController.bridge')

	Route.get('sick-notes', 'AdonnisLegadoController.bridge')
	Route.get('sick-notes/:id', 'AdonnisLegadoController.bridge')
	Route.put('sick-notes/:id', 'AdonnisLegadoController.bridge')
	Route.delete('sick-notes/:id', 'AdonnisLegadoController.bridge')
	Route.post('sick-notes', 'AdonnisLegadoController.bridge')

	Route.get('direct-mail', 'AdonnisLegadoController.bridge')
	Route.get('direct-mail/:id', 'AdonnisLegadoController.bridge')
	Route.put('direct-mail/:id', 'AdonnisLegadoController.bridge')
	Route.delete('direct-mail/:id', 'AdonnisLegadoController.bridge')
	Route.post('direct-mail', 'AdonnisLegadoController.bridge')

	Route.get('pictures', 'AdonnisLegadoController.bridge')
	Route.get('pictures/:id', 'AdonnisLegadoController.bridge')
	Route.put('pictures/:id', 'AdonnisLegadoController.bridge')
	Route.delete('pictures/:id', 'AdonnisLegadoController.bridge')
	Route.post('pictures', 'AdonnisLegadoController.bridge')

	Route.get('activities-date', 'AdonnisLegadoController.bridge')

	Route.get('payments-prof', 'PaymentProfController.findAllPaymentProfs')
	Route.get('payments-prof/:id', 'PaymentProfController.findPaymentProfById')
	Route.put('payments-prof/:id', 'PaymentProfController.updatePaymentProfById')
	Route.delete('payments-prof/:id', 'PaymentProfController.deletePaymentProfById')
	Route.post('payments-prof', 'PaymentProfController.createPaymentProf')

	Route.get('financial-categories', 'FinancialCategoryController.index')
	Route.get('financial-categories/inactives', 'FinancialCategoryController.inactives')
	Route.get('financial-categories/:id', 'FinancialCategoryController.show')
	Route.put('financial-categories/:id', 'FinancialCategoryController.update')
	Route.delete('financial-categories/:id', 'FinancialCategoryController.destroy')
	Route.post('financial-categories', 'FinancialCategoryController.store')

	Route.get('cost-centers', 'CostCenterController.index')
	Route.get('cost-centers/inactives', 'CostCenterController.inactives')
	Route.get('cost-centers/:id', 'CostCenterController.show')
	Route.put('cost-centers/:id', 'CostCenterController.update')
	Route.delete('cost-centers/:id', 'CostCenterController.destroy')
	Route.post('cost-centers', 'CostCenterController.store')

	Route.get('accounts', 'AccountController.findAllAccounts')
	Route.get('accounts/:id', 'AccountController.findAccountById')
	Route.put('accounts/:id', 'AccountController.updateAccountById')
	Route.delete('accounts/:id', 'AccountController.deleteAccountById')
	Route.post('accounts', 'AccountController.createAccount')

	Route.get('default-config', 'AdonnisLegadoController.bridge')
	Route.get('default-config/:id', 'AdonnisLegadoController.bridge')
	Route.put('default-config/:id', 'AdonnisLegadoController.bridge')
	Route.delete('default-config/:id', 'AdonnisLegadoController.bridge')
	Route.post('default-config', 'AdonnisLegadoController.bridge')

	Route.get('transactions', 'AdonnisLegadoController.bridge')
	Route.put('transactions/stts/:id', 'AdonnisLegadoController.bridge')
	Route.put('transactions/:id', 'AdonnisLegadoController.bridge')
	Route.post('transactions', 'AdonnisLegadoController.bridge')

	Route.post('import', 'ImportController.import')
}).middleware('auth')
