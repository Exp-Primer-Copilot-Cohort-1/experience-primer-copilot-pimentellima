'use strict';

const Route = use('Route');

Route.post('users', 'UserController.store');

Route.get('unity', 'UnityController.index');
Route.get('unity/:id', 'UnityController.show');
Route.delete('unity/:id', 'UnityController.destroy');
Route.put('unity/:id', 'UnityController.update');

Route.put('activity-stts/:id', 'ActivityController.updateStatus');
Route.get('activity/:id', 'ActivityController.show');
Route.put('activity-user/:id', 'ActivityController.updateStatusUser');

Route.post('sessions', 'SessionController.store');
Route.post('recover', 'RecoverController.store');

Route.group(() => {
  Route.put('active/:_id', 'AdminController.activeUser');
  Route.get('prof/:type', 'AdminController.findAllByProfs');
  Route.get('unity/:unity_id', 'AdminController.findAllByUnity');
  Route.get('inatives', 'AdminController.findAllInatives');
  Route.get('unities', 'AdminController.findAllUnities');
  Route.put('unity/:unity_id/:days', 'AdminController.addDateExpiration');
}).prefix('admin').middleware('apiKey');

Route.group(() => {
  Route.post('unity', 'SingUpController.storeUnity');
  Route.post('user', 'SingUpController.storeUserAdmin');
  Route.post('existUnity', 'SingUpController.existUnity');
  Route.post('existUser', 'SingUpController.existUser');
  Route.put('users-confirm/:id', 'SingUpController.activeUser');
});

Route.group(() => {
  Route.get('professionals', 'UserControllerV2.findAllUsersProfs');
  Route.get('secs', 'UserControllerV2.findAllUsersSecs');
  Route.get('clients', 'UserControllerV2.findAllUsersClients');
  Route.get('professionals/inative', 'UserControllerV2.findAllUsersProfsInative');
  Route.get('secs/inative', 'UserControllerV2.findAllUsersSecsInative');
  Route.get('clients/inative', 'UserControllerV2.findAllUsersClientsInative');
  Route.get('verify/client', 'ClientControllerV2.verifyExistenceClient');
  Route.get('clients/:id', 'UserControllerV2.findUserClientByID');
  Route.get('professionals/:id', 'UserControllerV2.findUserProfsByID');
  Route.put(':id', 'UserController.update');
  Route.delete(':id', 'UserController.destroy');
}).prefix('users').middleware('auth');

Route.group(() => {
  Route.get('sessions/user', 'SessionController.getUser')
  Route.post('sessions/refresh', 'SessionController.refreshToken')
  Route.get('sessions/check', 'SessionController.checkToken')
}).middleware('auth');

Route.group(() => {


  Route.get('users', 'UserController.index');
  Route.get('users-type', 'UserController.indexByType');
  Route.post('users/client', 'ClientControllerV2.create');

  Route.get('stock', 'StockController.index');
  Route.get('stock/:id', 'StockController.show');
  Route.put('stock/:id', 'StockController.update');
  Route.put('stock-update/:id', 'StockController.updateLot');
  Route.delete('stock/:id', 'StockController.destroy');
  Route.post('stock', 'StockController.store');

  Route.get('category', 'CategoryController.index');
  Route.get('category/:id', 'CategoryController.show');
  Route.put('category/:id', 'CategoryController.update');
  Route.delete('category/:id', 'CategoryController.destroy');
  Route.post('category', 'CategoryController.store');

  Route.get('form/prof/:id', 'FormController.findFormByProfID');
  Route.get('form/unity', 'FormController.findFormByUnityID');
  Route.get('form', 'FormController.index');
  Route.get('form/:id', 'FormController.show');
  Route.put('form/:id', 'FormController.update');
  Route.delete('form/:id', 'FormController.destroy');
  Route.post('form', 'FormController.store');

  Route.get('answer', 'AnswerController.index');
  Route.get('answer/:id', 'AnswerController.show');
  Route.get('answer-by-form/:form_id', 'AnswerController.showByFormId');
  Route.get('answer-log-by-form/:form_id', 'LogAnswerController.showByFormId');
  Route.put('answer/:id', 'AnswerController.update');
  Route.delete('answer/:id', 'AnswerController.destroy');
  Route.post('answer', 'AnswerController.store');

  Route.get('activity-stock', 'ActivityStockController.index');

  Route.get('activities-client/:id', 'ActivityController.indexByClient');
  Route.put('activity/:id', 'ActivityController.update');
  Route.get('activity', 'ActivityController.index');
  Route.delete('activity/:id', 'ActivityController.destroy');
  Route.post('activity', 'ActivityController.store');
  Route.post('activity-pay', 'ActivityController.payment');
  Route.get('activities', 'ActivityController.findAllActivitiesByUnity');
  Route.get('activities/prof/:id', 'ActivityControllerV2.findAllActivitiesByUser');

  Route.get('activity-await', 'ActivityAwaitController.index');
  Route.get('activity-await/:id', 'ActivityAwaitController.show');
  Route.put('activity-await/:id', 'ActivityAwaitController.update');
  Route.delete('activity-await/:id', 'ActivityAwaitController.destroy');
  Route.post('activity-await', 'ActivityAwaitController.store');

  Route.get('partner', 'PartnerController.index');
  Route.get('partner/:id', 'PartnerController.show');
  Route.put('partner/:id', 'PartnerController.update');
  Route.delete('partner/:id', 'PartnerController.destroy');
  Route.post('partner', 'PartnerController.store');

  Route.get('health-insurance', 'HealthInsuranceController.index');
  Route.get('health-insurance/:id', 'HealthInsuranceController.show');
  Route.put('health-insurance/:id', 'HealthInsuranceController.update');
  Route.delete('health-insurance/:id', 'HealthInsuranceController.destroy');
  Route.post('health-insurance', 'HealthInsuranceController.store');

  Route.get('procedure', 'ProcedureController.index');
  Route.get('procedure/:id', 'ProcedureController.show');
  Route.put('procedure/:id', 'ProcedureController.update');
  Route.delete('procedure/:id', 'ProcedureController.destroy');
  Route.post('procedure', 'ProcedureController.store');

  Route.get('schedule', 'ScheduleController.index');
  Route.get('schedule/:id', 'ScheduleController.show');
  Route.put('schedule/:id', 'ScheduleController.update');
  Route.delete('schedule/:id', 'ScheduleController.destroy');
  Route.post('schedule', 'ScheduleController.store');

  Route.get('permissions', 'PermissionController.index');
  Route.get('permissions/:id', 'PermissionController.show');
  Route.put('permissions/:id', 'PermissionController.update');
  Route.post('permissions', 'PermissionController.store');

  Route.post('/upload', 'FileController.store');

  Route.get('reports-activities', 'ReportController.indexActivities');
  Route.get('reports-activities-partner', 'ReportController.indexActivitiesPartner');
  Route.get('reports-payment', 'ReportController.indexByPayment');
  Route.get('reports-payment-type', 'ReportController.indexByPaymentType');
  Route.get('reports-payment-prof', 'ReportController.indexByPaymentProf');
  Route.get('reports-payment-prof-date', 'ReportController.indexByPaymentProfDate');
  Route.get('reports-procedure', 'ReportController.indexByPaymentProcedure');
  Route.get('reports-canceled', 'ReportController.indexActivitiesCanceled');

  Route.get('rooms', 'RoomController.index');
  Route.get('room/:userId', 'RoomController.showByUnity');
  Route.get('room-support', 'RoomController.showBySupportUnity');
  Route.post('room/:id', 'RoomController.createMessage');
  Route.get('room-unread', 'RoomController.showMyChatsUnread');

  Route.get('ingredients', 'IngredientController.index');
  Route.get('ingredients/:id', 'IngredientController.show');
  Route.put('ingredients/:id', 'IngredientController.update');
  Route.delete('ingredients/:id', 'IngredientController.destroy');
  Route.post('ingredients', 'IngredientController.store');

  Route.get('ingredients-list', 'IngredientlistController.index');
  Route.get('ingredients-list/:id', 'IngredientlistController.show');
  Route.put('ingredients-list/:id', 'IngredientlistController.update');
  Route.delete('ingredients-list/:id', 'IngredientlistController.destroy');
  Route.post('ingredients-list', 'IngredientlistController.store');

  Route.get('direct-mail', 'DirectmailController.index');
  Route.get('direct-mail/:id', 'DirectmailController.show');
  Route.put('direct-mail/:id', 'DirectmailController.update');
  Route.delete('direct-mail/:id', 'DirectmailController.destroy');
  Route.post('direct-mail', 'DirectmailController.store');

  Route.get('pictures', 'PictureController.index');
  Route.get('pictures/:id', 'PictureController.show');
  Route.put('pictures/:id', 'PictureController.update');
  Route.delete('pictures/:id', 'PictureController.destroy');
  Route.post('pictures', 'PictureController.store');

  Route.get('activities-date', 'ReportController.indexHome');

  Route.get('payments-prof', 'PaymentProfController.index');
  Route.get('payments-prof/:id', 'PaymentProfController.show');
  Route.put('payments-prof/:id', 'PaymentProfController.update');
  Route.delete('payments-prof/:id', 'PaymentProfController.destroy');
  Route.post('payments-prof', 'PaymentProfController.store');

  Route.get('financial-category', 'FinancialCategoryController.index');
  Route.get('financial-category/:id', 'FinancialCategoryController.show');
  Route.put('financial-category/:id', 'FinancialCategoryController.update');
  Route.delete('financial-category/:id', 'FinancialCategoryController.destroy');
  Route.post('financial-category', 'FinancialCategoryController.store');

  Route.get('cost-center', 'CostCenterController.index');
  Route.get('cost-center/:id', 'CostCenterController.show');
  Route.put('cost-center/:id', 'CostCenterController.update');
  Route.delete('cost-center/:id', 'CostCenterController.destroy');
  Route.post('cost-center', 'CostCenterController.store');

  Route.get('accounts', 'AccountController.index');
  Route.get('accounts/:id', 'AccountController.show');
  Route.put('accounts/:id', 'AccountController.update');
  Route.delete('accounts/:id', 'AccountController.destroy');
  Route.post('accounts', 'AccountController.store');

  Route.get('default-config', 'DefaultConfigController.index');
  Route.get('default-config/:id', 'DefaultConfigController.show');
  Route.put('default-config/:id', 'DefaultConfigController.update');
  Route.delete('default-config/:id', 'DefaultConfigController.destroy');
  Route.post('default-config', 'DefaultConfigController.store');

  Route.get('payments-list', 'TransactionController.indexByPayment');
  Route.put('payments-stts/:id', 'TransactionController.updateStatus');
  Route.put('payments-transaction/:id', 'TransactionController.update');
  Route.post('payments-transaction', 'TransactionController.storeTransaction');

  Route.post('import', 'ImportController.import');
}).middleware('auth');
