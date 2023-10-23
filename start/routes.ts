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

Route.group(() => {
	Route.get('/client-model', 'FileController.downloadClientModel')
}).prefix('file')

Route.group(() => {
	Route.put('/profile-picture', 'FileController.uploadProfilePicture')
	Route.post('/treatment-picture', 'FileController.createClientPicture')
	Route.get('/treatment-picture', 'FileController.downloadClientPictures')
}).prefix('file').middleware(['auth'])

Route.get('/', async () => {
	return { hello: 'world' }
})

Route.post('sessions', 'SessionController.store')
Route.get('script', 'AdminController.script')

Route.post('admin', 'UserController.storeAdmin')

Route.get('unities/:email', 'UnityController.findByName')

Route.get('activity/single/:id', 'ActivityController.findActivityById')

Route.get('permissions-default', 'PermissionController.defaultPermissions')

Route.post('recover', 'RecoverController.store')

Route.group(() => {
	Route.post('user', 'SignUpAdminController.store')
	Route.put('users-confirm/:code', 'SignUpAdminController.activeUser')
})

Route.group(() => {
	Route.get('sessions/user', 'SessionController.getUser')
	Route.post('sessions/refresh', 'SessionController.refreshToken')
	Route.get('sessions/check', 'SessionController.checkToken')
}).middleware('auth')

Route.post('sessions/logout', 'SessionController.logout')

Route.group(() => {
	Route.post('users', 'UserController.store')

	Route.group(() => {
		Route.get('', 'ClientController.index').as('clients.index')

		Route.get(':id', 'ClientController.findUserClientByID').as('clients.show')
		Route.get('verify/client', 'ClientController.verifyExistenceClient').as(
			'clients.verify',
		)
		Route.put(':id', 'ClientController.update').as('clients.update')
		Route.post('', 'ClientController.create').as('clients.store')
		Route.put('answer/:client_id', 'ClientController.putAnswer')
		Route.put('share-access/:client_id', 'ClientController.putProfAccess')
		Route.get('answer/:id', 'ClientController.getAnswers')
		Route.post('/many', 'ClientController.createMany').as('clients.storeMany')
	}).prefix('clients')

	Route.group(() => {
		Route.get(
			'profs/medical',
			'UserControllerV2.findAllUsersPerformsMedicalAppointments',
		).as('users.profs.performs_medical_appointments.index')

		Route.get('profs/:id', 'UserController.show').as('users.prof.show')
		Route.put(':id', 'UserController.update').as('users.update')
	}).prefix('users')

	Route.group(() => {
		Route.get('', 'SecsController.index').as('users.secs.index')
	}).prefix('secs')

	Route.group(() => {
		Route.get('', 'ProfsController.index').as('users.prof.index')
	}).prefix('profs')

	Route.group(() => {
		Route.put(':id', 'ScheduledConfigController.update').as('scheduled.update')
	}).prefix('scheduled')

	Route.group(() => {
		Route.get('', 'HealthInsuranceController.index').as('health-insurances.index')
		Route.get(':id', 'HealthInsuranceController.show').as('health-insurances.show')
		Route.put(':_id', 'HealthInsuranceController.update').as(
			'health-insurances.update',
		)
		Route.delete(':id', 'HealthInsuranceController.destroy').as(
			'health-insurances.destroy',
		)
		Route.post('', 'HealthInsuranceController.store').as('health-insurances.store')
	}).prefix('health-insurances')

	Route.group(() => {
		Route.get('', 'ScheduleBlockController.findAllScheduleBlocks').as(
			'schedule-block.index',
		)
		Route.get(
			'prof/:prof_id',
			'ScheduleBlockController.findScheduleBlocksByProfId',
		).as('schedule-block.profId')
		Route.delete(':id', 'ScheduleBlockController.deleteScheduleBlockById').as(
			'schedule-block.destroy',
		)
		Route.post('', 'ScheduleBlockController.createScheduleBlock').as(
			'schedule-block.store',
		)
	}).prefix('schedule-block')

	Route.group(() => {
		Route.get('', 'StocksController.index').as('stocks.index')
		Route.get(':id', 'StocksController.show').as('stocks.show')
		Route.delete(':id', 'StocksController.destroy').as('stocks.destroy')
		Route.post('', 'StocksController.store').as('stocks.store')
		Route.put(':id', 'StocksController.update').as('stocks.update')
		Route.put('/active/:id', 'StocksController.updateActive').as(
			'stocks.updateActive',
		)
	}).prefix('stocks')

	Route.group(() => {
		Route.get('', 'ProcedureController.index').as('procedures.index')
		Route.get(':id', 'ProcedureController.show').as('procedures.show')
		Route.put(':_id', 'ProcedureController.update').as('procedures.update')
		Route.delete(':id', 'ProcedureController.destroy').as('procedures.destroy')
		Route.post('', 'ProcedureController.store').as('procedures.store')
		Route.post(':id/products', 'ProcedureController.addProduct').as(
			'procedures.addProduct',
		)
		Route.delete(':id/products', 'ProcedureController.removeProduct').as(
			'procedures.removeProduct',
		)
		Route.get(
			':id/:health_insurance_id',
			'ProcedureController.showByHealthInsurance',
		).as('procedures.showByHealthInsurance')
	}).prefix('procedures')

	Route.group(() => {
		Route.get('', 'CategoryController.index').as('categories.index')
		Route.get(':id', 'CategoryController.show').as('categories.show')
		Route.put(':_id', 'CategoryController.update').as('categories.update')
		Route.delete(':_id', 'CategoryController.destroy').as('categories.destroy')
		Route.post('', 'CategoryController.store').as('categories.store')
	}).prefix('categories')

	Route.group(() => {
		Route.get('', 'PartnerController.index').as('partners.index')
		Route.get(':id', 'PartnerController.show').as('partners.show')
		Route.put(':id', 'PartnerController.update').as('partners.update')
		Route.delete(':id', 'PartnerController.destroy').as('partners.destroy')
		Route.post('', 'PartnerController.store').as('partners.store')
	}).prefix('partners')

	Route.group(() => {
		Route.get('', 'FormController.findAllForms')
		Route.get('single/:id', 'FormController.findFormById')
		Route.get('inactives', 'FormController.findAllInactiveForms')
		Route.post('', 'FormController.createNewForm')
		Route.put(':id', 'FormController.updateForm')
		Route.put('status/:id', 'FormController.updateFormStatus')
	}).prefix('forms')

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
	}).prefix('answers')

	Route.group(() => {
		Route.get(':id', 'UnityController.show')
		// Route.delete('unity/:id', 'UnityController.destroy')
		Route.put(':_id', 'UnityController.update')
	}).prefix('unity')

	Route.group(() => {

		Route.get('/day/:prof_id', 'ActivityController.findDayActivities').as(
			'activity.day',
		)

		Route.put(':id', 'ActivityController.updateActivityById').as('activity.update')
		Route.get('', 'ActivityController.findAllActivities').as('activity.index')


		Route.group(() => {
			Route.put('status/:id', 'ActivityController.updateStatus').as(
				'activity.status',
			)

			Route.put('started_at/:id', 'AttendanceController.start').as(
				'activity.startedAt',
			)
			Route.put('finished_at/:id', 'AttendanceController.stop').as(
				'activity.finishedAt',
			)
		}).as('attendance')

		Route.group(() => {
			Route.get('await', 'ActivityAwaitController.index').as(
				'index',
			)

			Route.post('await', 'ActivityAwaitController.store').as(
				'store',
			)
		}).as('activity-await')

		Route.group(() => {
			Route.post('recurrent', 'ActivityController.createRecurrentActivity').as(
				'activity.storeRecurrent',
			)

			Route.get('pending', 'ActivityController.findAllActivitiesPending').as(
				'activity.indexPending',
			)
		}).as('recurrent')

		Route.get('prof/:prof_id', 'ActivityController.findActivitiesByProfId').as(
			'activity.byProfId',
		)
		Route.get('client/:client_id', 'ActivityController.findActivitiesByClientId').as(
			'activity.byClientId',
		)
		Route.post('', 'ActivityController.createActivity').as('activity.store')

		Route.delete(':id', 'ActivityController.deleteActivityById').as(
			'activity.destroy',
		)
	}).prefix('activities')

	Route.group(() => {
		Route.get('', 'ProcedureController.index').as('procedure.index')
		Route.get(':id', 'ProcedureController.show').as('procedure.show')
		Route.put(':_id', 'ProcedureController.update').as('procedure.update')
		Route.delete(':id', 'ProcedureController.destroy').as('procedure.destroy')
		Route.post('', 'ProcedureController.store').as('procedure.store')
	}).prefix('procedure')

	Route.group(() => {
		Route.get('/work-hours/:prof_id', 'ScheduleController.getWorkHours').as(
			'schedule.show',
		)
	}).prefix('schedule')

	Route.group(() => {
		Route.get('/:client_id', 'MedicalCertificateIssuanceController.findByClient').as(
			'medical-certificate-issuance.findByClient',
		)
		Route.post('', 'MedicalCertificateIssuanceController.store').as(
			'medical-certificate-issuance.store',
		)
	}).prefix('medical-certificate-issuance')

	Route.group(() => {
		Route.get('/:client_id', 'PrescriptionIssuanceController.findByClient').as(
			'prescription-issuance.findByClient',
		)
		Route.post('', 'PrescriptionIssuanceController.store').as(
			'prescription-issuance.store',
		)
	}).prefix('prescription-issuance')

	Route.group(() => {
		Route.get('', 'PrescriptionController.index').as('prescriptions.index')

		Route.get('/:id', 'PrescriptionController.show').as('prescriptions.show')
		Route.put('/:id', 'PrescriptionController.update').as('prescriptions.update')
		Route.put('/status/:id', 'PrescriptionController.updateStatus').as(
			'prescriptions.updateStatus',
		)
		Route.delete('/:id', 'PrescriptionController.destroy').as('prescriptions.destroy')
		Route.post('', 'PrescriptionController.store').as('prescriptions.store')
	}).prefix('prescriptions')

	Route.group(() => {
		Route.get('', 'IngredientController.index').as('ingredients.index')
		Route.get('/:id', 'IngredientController.show').as('ingredients.show')
		Route.put('/:id', 'IngredientController.update').as('ingredients.update')
		Route.delete('/:id', 'IngredientController.destroy').as('ingredients.destroy')
		Route.post('', 'IngredientController.store').as('ingredients.store')
	}).prefix('ingredients')

	Route.group(() => {
		Route.get('', 'MedicalCertificateController.index').as(
			'medical-certificates.index',
		)

		Route.get('/:id', 'MedicalCertificateController.show').as(
			'medical-certificates.show',
		)
		Route.put('/:id', 'MedicalCertificateController.update').as(
			'medical-certificates.update',
		)
		Route.put('/status/:id', 'MedicalCertificateController.updateStatus').as(
			'medical-certificates.updateStatus',
		)
		Route.delete('/:id', 'MedicalCertificateController.destroy').as(
			'medical-certificates.destroy',
		)
		Route.post('', 'MedicalCertificateController.store').as(
			'medical-certificates.store',
		)
	}).prefix('medical-certificate')

	Route.group(() => {
		Route.get('', 'PaymentProfController.findAllPaymentProfs').as(
			'payments-prof.index',
		)
		Route.get('/:id', 'PaymentProfController.findPaymentProfById').as(
			'payments-prof.show',
		)
		Route.put('/:prof_id/:id', 'PaymentProfController.updatePaymentProfById').as(
			'payments-prof.update',
		)
		Route.delete('/:prof_id/:id', 'PaymentProfController.deletePaymentProfById').as(
			'payments-prof.destroy',
		)
		Route.post('', 'PaymentProfController.createOrUpdatePaymentProf').as(
			'payments-prof.store',
		)
	}).prefix('payment-participations')

	Route.group(() => {
		Route.get('', 'FinancialCategoryController.index').as(
			'financial-categories.index',
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
		Route.get('/:id', 'CostCenterController.show').as('cost-centers.show')
		Route.put('/:id', 'CostCenterController.update').as('cost-centers.update')
		Route.delete('/:id', 'CostCenterController.destroy').as('cost-centers.destroy')
		Route.post('', 'CostCenterController.store').as('cost-centers.store')
	}).prefix('cost-centers')

	Route.group(() => {
		Route.get('', 'AccountController.index').as('accounts.index')
		Route.get('/:id', 'AccountController.show').as('accounts.show')
		Route.put('/:id', 'AccountController.update').as('accounts.update')
		Route.delete('/:id', 'AccountController.destroy').as('accounts.destroy')
		Route.post('', 'AccountController.store').as('accounts.store')
	}).prefix('accounts')

	Route.group(() => {
		Route.get('', 'DefaultConfigController.index').as('default-configs.index')
		Route.get('/:id', 'DefaultConfigController.show').as('default-configs.show')
		Route.put('/:id', 'DefaultConfigController.update').as('default-configs.update')
		Route.delete('/:id', 'DefaultConfigController.destroy').as(
			'default-configs.destroy',
		)
		Route.post('/:id', 'DefaultConfigController.store').as('default-configs.store')
	}).prefix('default-configs')

	Route.group(() => {
		Route.get('', 'TransactionController.index').as('transactions.index')
		Route.put('/:id', 'TransactionController.update').as('transactions.update')
		Route.get('/:id', 'TransactionController.show').as('transactions.show')
		Route.post('', 'TransactionController.store').as('transactions.store')
	}).prefix('transactions')

	Route.post('import', 'ImportController.import').as('import')

	Route.group(() => {
		Route.get('', 'HolidaysController.index').as('holidays.index')
		Route.post('', 'HolidaysController.store').as('holidays.store')
		Route.delete('/:_id', 'HolidaysController.destroy').as('holidays.destroy')
	}).prefix('holidays')

	Route.group(() => {
		Route.get('', 'RevenuesController.index').as('revenues.index')
		Route.get('/minimum', 'RevenuesController.updateMinimum').as('revenues.minimum')
		Route.put('/desirable', 'RevenuesController.updateDesirable').as(
			'revenues.updateDesirable',
		)
	}).prefix('revenues')

	Route.group(() => {
		Route.get('', 'CensusController.index').as('census.index')
		Route.get('payments', 'CensusController.indexPayments').as('census.payments')
		Route.get('health-insurances', 'CensusController.indexHealthInsurance')
		Route.get('activities-days-month', 'CensusController.indexActivitiesByDaysMonth')
		Route.get('payments-by-forms', 'CensusController.indexPaymentsByForm')
		Route.get(
			'activities-prof-by-profs',
			'CensusController.indexActivitiesProfByProf',
		)
		Route.get('payments-by-partners', 'CensusController.indexPaymentsByPartner')
		Route.get('payments-by-profs', 'CensusController.indexPaymentsByProf')
		Route.get(
			'payments-participations',
			'CensusController.indexPaymentsParticipation',
		)
		Route.get('revenues-activities', 'CensusController.indexRevenuesActivities')
		Route.get('idleness', 'CensusController.indexIdlenessByProf')
	}).prefix('census')

	Route.group(() => {
		Route.get('', 'LogController.index').as('logs.index')
		Route.get('/:id', 'LogController.show').as('logs.show')
	}).prefix('logs')

	Route.group(() => {
		Route.get('', 'UnityController.index').as('unities.index')
		Route.get('/:id', 'UnityController.show').as('unities.show')
		Route.put('/:id', 'UnityController.update').as('unities.update')
	}).prefix('unities')

	Route.group(() => {
		Route.get('', 'BusinessFranchisesController.index').as(
			'business-franchises.index',
		)
		Route.get('/:id', 'BusinessFranchisesController.show').as(
			'business-franchises.show',
		)
	}).prefix('business-franchises')

	Route.group(() => {
		Route.get('issues', 'StandardFormFranchisesController.index').as('business-franchises.issues')
		Route.get('issues/:type', 'StandardFormFranchisesController.show').as('business-franchises.issues.show')
		Route.get(
			'is-a-franchise',
			'BusinessFranchisesController.isAFranchise',
		).as('business-franchises.isAFranchise')
		Route.get(
			'form/:activity',
			'ReplyStandardFormController.show',
		).as('business-franchises.form-standard')
		Route.post(
			'form',
			'ReplyStandardFormController.store',
		).as('business-franchises.form-standard.store')
	}).prefix('franchises')

	Route.group(() => {
		Route.get('', 'ProfileController.show').as('profile.show')
		Route.put('', 'ProfileController.update').as('profile.update')
		Route.get('unity', 'UnityController.showProfile').as('profile.unity.showProfile')
		Route.put('unity', 'UnityController.updateProfile').as('profile.unity.update')
	}).prefix('profile')

	Route.group(() => {
		Route.get('accounts', 'AccountController.counts').as('account.counts')
		Route.get('procedures', 'ProcedureController.counts').as('procedure.counts')
		Route.get('clients', 'ClientController.counts').as('client.counts')
		Route.get('categories', 'CategoryController.counts').as('categories.counts')
		Route.get('cost-centers', 'CostCenterController.counts').as('cost-centers.counts')
		Route.get('financial-categories', 'FinancialCategoryController.counts').as('financial-categories.counts')
		Route.get('health-insurances', 'HealthInsuranceController.counts').as('health-insurances.counts')
		Route.get('medical-certificates', 'MedicalCertificateController.counts').as('medical-certificates.counts')
		Route.get('partners', 'PartnerController.counts').as('partners.counts')
		Route.get('payments-participations', 'PaymentProfController.counts').as('payments-participations.counts')
		Route.get('stocks', 'StocksController.counts').as('stocks.counts')
		Route.get('profs', 'ProfsController.counts').as('profs.counts')
		Route.get('secs', 'SecsController.counts').as('secs.counts')
	}).prefix('counts')

	Route.group(() => {
		Route.post('activation/:id', 'SendEmailController.resend').as('emails.resend')
	}).prefix('emails')
		.middleware('throttle:resend_email')

}).middleware(['auth', 'role', 'statusPermission', 'successNoContent',])
