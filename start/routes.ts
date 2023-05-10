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

Route.post('users', 'UserController.store')

Route.get('unity', 'UnityController.index')
Route.get('unity/:id', 'UnityController.show')
Route.delete('unity/:id', 'UnityController.destroy')
Route.put('unity/:id', 'UnityController.update')

Route.put('activity-stts/:id', 'ActivityController.updateStatus')
Route.get('activity/:id', 'ActivityController.findActivityById')
Route.put('activity-user/:id', 'ActivityController.updateStatusUser')

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
	Route.post('unity', 'SingUpController.storeUnity')
	Route.post('user', 'SingUpController.storeUserAdmin')
	Route.post('existUnity', 'SingUpController.existUnity')
	Route.post('existUser', 'SingUpController.existUser')
	Route.put('users-confirm/:id', 'SingUpController.activeUser')
})

Route.group(() => {
	Route.get('professionals', 'UserControllerV2.findAllUsersProfs')
	Route.get('secs', 'UserControllerV2.findAllUsersSecs')
	Route.get('clients', 'UserControllerV2.findAllUsersClients')
	Route.get('professionals/inative', 'UserControllerV2.findAllUsersProfsInative')
	Route.get('secs/inative', 'UserControllerV2.findAllUsersSecsInative')
	Route.get('clients/inative', 'UserControllerV2.findAllUsersClientsInative')
	Route.get('verify/client', 'ClientControllerV2.verifyExistenceClient')
	Route.get('clients/:id', 'UserControllerV2.findUserClientByID')
	Route.get('professionals/:id', 'UserControllerV2.findUserProfsByID')
	Route.put(':id', 'UserController.update')
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
	Route.post('users/client', 'ClientControllerV2.create')

	Route.get('form/prof/:id', 'FormController.findFormByProfId')
	Route.get('form/category/:id', 'FormController.findFormByCategoryId')
	Route.post('form', 'FormController.createForm')
	Route.get('form', 'FormController.findAllForms')
	Route.get('form/:id', 'FormController.findFormById')
	Route.put('form/:id', 'FormController.updateFormById')
	Route.delete('form/:id', 'FormController.deleteFormById')

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
	Route.put('procedure/:id', 'ProcedureController.update')
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

	Route.get('payments-prof', 'AdonnisLegadoController.bridge')
	Route.get('payments-prof/:id', 'AdonnisLegadoController.bridge')
	Route.put('payments-prof/:id', 'AdonnisLegadoController.bridge')
	Route.delete('payments-prof/:id', 'AdonnisLegadoController.bridge')
	Route.post('payments-prof', 'AdonnisLegadoController.bridge')

	Route.get('financial-category', 'AdonnisLegadoController.bridge')
	Route.get('financial-category/:id', 'AdonnisLegadoController.bridge')
	Route.put('financial-category/:id', 'AdonnisLegadoController.bridge')
	Route.delete('financial-category/:id', 'AdonnisLegadoController.bridge')
	Route.post('financial-category', 'AdonnisLegadoController.bridge')

	Route.get('cost-center', 'AdonnisLegadoController.bridge')
	Route.get('cost-center/:id', 'AdonnisLegadoController.bridge')
	Route.put('cost-center/:id', 'AdonnisLegadoController.bridge')
	Route.delete('cost-center/:id', 'AdonnisLegadoController.bridge')
	Route.post('cost-center', 'AdonnisLegadoController.bridge')

	Route.get('account', 'AccountController.findAllAccounts')
	Route.get('account/:id', 'AccountController.findAccountById')
	Route.put('account/:id', 'AccountController.updateAccountById')
	Route.delete('account/:id', 'AccountController.deleteAccountById')
	Route.post('account', 'AccountController.createAccount')

	Route.get('default-config', 'AdonnisLegadoController.bridge')
	Route.get('default-config/:id', 'AdonnisLegadoController.bridge')
	Route.put('default-config/:id', 'AdonnisLegadoController.bridge')
	Route.delete('default-config/:id', 'AdonnisLegadoController.bridge')
	Route.post('default-config', 'AdonnisLegadoController.bridge')

	Route.get('payments-list', 'AdonnisLegadoController.bridge')
	Route.put('payments-stts/:id', 'AdonnisLegadoController.bridge')
	Route.put('payments-transaction/:id', 'AdonnisLegadoController.bridge')
	Route.post('payments-transaction', 'AdonnisLegadoController.bridge')

	Route.post('import', 'ImportController.import')
}).middleware('auth')
