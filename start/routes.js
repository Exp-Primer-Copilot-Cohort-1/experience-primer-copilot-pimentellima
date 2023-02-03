`use strict`;

const Route = use(`Route`);
const PERMISSIONS = require(`../app/Domain/Constants/permissions`)

Route.post(`users`, `UserController.store`);

Route.get(`unity`, `UnityController.index`);
Route.get(`unity/:id`, `UnityController.show`);
Route.delete(`unity/:id`, `UnityController.destroy`);
Route.put(`unity/:id`, `UnityController.update`);

Route.put(`activity-stts/:id`, `ActivityController.updateStatus`);
Route.get(`activity/:id`, `ActivityController.show`);
Route.put(`activity-user/:id`, `ActivityController.updateStatusUser`);

Route.post(`sessions`, `SessionController.store`);
Route.post(`recover`, `RecoverController.store`);

Route.group(() => {
  Route.get(`permissions-config/test`, `PermissionsConfigController.generateConfig`);
  Route.post(`permissions-config`, `PermissionsConfigController.store`);
  Route.put(`permissions-config/:id`, `PermissionsConfigController.update`);
  Route.get(`permissions-config`, `PermissionsConfigController.show`);
}).prefix(`admin`)

Route.group(() => {
  Route.put(`active/:_id`, `AdminController.activeUser`);
  Route.get(`${PERMISSIONS.PROFESSIONALS.$route}/:type`, `AdminController.findAllByProfs`);
  Route.get(`unity/:unity_id`, `AdminController.findAllByUnity`);
  Route.get(`inatives`, `AdminController.findAllInatives`);
  Route.get(`unities`, `AdminController.findAllUnities`);
  Route.put(`unity/:unity_id/:days`, `AdminController.addDateExpiration`);
}).prefix(`admin`).middleware(`apiKey`);

Route.group(() => {
  Route.post(`unity`, `SingUpController.storeUnity`);
  Route.post(`user`, `SingUpController.storeUserAdmin`);
  Route.post(`existUnity`, `SingUpController.existUnity`);
  Route.post(`existUser`, `SingUpController.existUser`);
  Route.put(`users-confirm/:id`, `SingUpController.activeUser`);
});

Route.group(() => {
  Route.get(`${PERMISSIONS.PROFESSIONALS.$route}`, `UserControllerV2.findAllUsersProfs`);
  Route.get(`${PERMISSIONS.SECRETARIES.$route}`, `UserControllerV2.findAllUsersSecs`);
  Route.get(`${PERMISSIONS.PATIENTS.$route}`, `UserControllerV2.findAllUsersClients`);
  Route.get(`${PERMISSIONS.PROFESSIONALS.$route}/inative`, `UserControllerV2.findAllUsersProfsInative`);
  Route.get(`${PERMISSIONS.SECRETARIES.$route}/inative`, `UserControllerV2.findAllUsersSecsInative`);
  Route.get(`${PERMISSIONS.PATIENTS.$route}/inative`, `UserControllerV2.findAllUsersClientsInative`);
  Route.get(`verify/client`, `ClientControllerV2.verifyExistenceClient`);
  Route.get(`${PERMISSIONS.PATIENTS.$route}/:id`, `UserControllerV2.findUserClientByID`);
  Route.get(`${PERMISSIONS.PROFESSIONALS.$route}/:id`, `UserControllerV2.findUserProfsByID`);
  Route.put(`:id`, `UserController.update`);
  Route.post(`${PERMISSIONS.PATIENTS.$route}`, `ClientControllerV2.create`);
  Route.delete(`:id`, `UserController.destroy`);
}).prefix(`users`).middleware([`auth`, `permission`]);

Route.group(() => {
  Route.get(`sessions/user`, `SessionController.getUser`)
  Route.post(`sessions/refresh`, `SessionController.refreshToken`)
  Route.get(`sessions/check`, `SessionController.checkToken`)
}).middleware(`auth`);

Route.group(() => {
  Route.get(`users`, `UserController.index`);
  Route.get(`users-type`, `UserController.indexByType`);

  Route.get(`stock`, `StockController.index`);
  Route.get(`stock/:id`, `StockController.show`);
  Route.put(`stock/:id`, `StockController.update`);
  Route.put(`stock-update/:id`, `StockController.updateLot`);
  Route.delete(`stock/:id`, `StockController.destroy`);
  Route.post(`stock`, `StockController.store`);

  Route.get(`${PERMISSIONS.CATEGORIES.$route}`, `CategoryController.index`);
  Route.get(`${PERMISSIONS.CATEGORIES.$route}/:id`, `CategoryController.show`);
  Route.put(`${PERMISSIONS.CATEGORIES.$route}/:id`, `CategoryController.update`);
  Route.delete(`${PERMISSIONS.CATEGORIES.$route}/:id`, `CategoryController.destroy`);
  Route.post(`${PERMISSIONS.CATEGORIES.$route}`, `CategoryController.store`);

  Route.get(`${PERMISSIONS.CHARTS.$route}/${PERMISSIONS.PROFESSIONALS.$route}/:id`, `FormControllerV2.findFormByProfID`);
  Route.get(`${PERMISSIONS.CHARTS.$route}/unity`, `FormControllerV2.findFormByUnityID`);
  Route.get(`${PERMISSIONS.CHARTS.$route}/${PERMISSIONS.CATEGORIES.$route}/:id`, `FormControllerV2.findFormByCategoryID`);
  Route.post(`${PERMISSIONS.CHARTS.$route}`, `FormControllerV2.store`);

  Route.get(`${PERMISSIONS.CHARTS.$route}`, `FormController.index`);
  Route.get(`${PERMISSIONS.CHARTS.$route}/:id`, `FormController.show`);
  Route.put(`${PERMISSIONS.CHARTS.$route}/:id`, `FormController.update`);
  Route.delete(`${PERMISSIONS.CHARTS.$route}/:id`, `FormController.destroy`);

  Route.get(`${PERMISSIONS.RESPONSE_SHEET.$route}`, `AnswerController.index`);
  Route.get(`${PERMISSIONS.RESPONSE_SHEET.$route}/:id`, `AnswerController.show`);
  Route.get(`${PERMISSIONS.RESPONSE_SHEET.$route}-by-form/:form_id`, `AnswerController.showByFormId`);
  Route.get(`${PERMISSIONS.RESPONSE_SHEET.$route}-log-by-form/:form_id`, `LogAnswerController.showByFormId`);
  Route.put(`${PERMISSIONS.RESPONSE_SHEET.$route}/:id`, `AnswerController.update`);
  Route.delete(`${PERMISSIONS.RESPONSE_SHEET.$route}/:id`, `AnswerController.destroy`);
  Route.post(`${PERMISSIONS.RESPONSE_SHEET.$route}`, `AnswerController.store`);

  Route.get(`activity-stock`, `ActivityStockController.index`);

  Route.get(`${PERMISSIONS.CONSULT.$route}/client/:id`, `ActivityController.indexByClient`);
  Route.put(`${PERMISSIONS.CONSULT.$route}/:id`, `ActivityController.update`);
  Route.get(`${PERMISSIONS.CONSULT.$route}`, `ActivityController.index`);
  Route.delete(`${PERMISSIONS.CONSULT.$route}/:id`, `ActivityController.destroy`);
  Route.post(`${PERMISSIONS.CONSULT.$route}`, `ActivityController.store`);
  Route.post(`activity-pay`, `ActivityController.payment`);
  Route.get(`${PERMISSIONS.CONSULT.$route}`, `ActivityController.findAllActivitiesByUnity`);
  Route.get(`${PERMISSIONS.CONSULT.$route}/${PERMISSIONS.PROFESSIONALS.$route}/:id`, `ActivityControllerV2.findAllActivitiesByUser`);

  Route.get(`${PERMISSIONS.CONSULT_AWAITING.$route}`, `ActivityAwaitController.index`);
  Route.get(`${PERMISSIONS.CONSULT_AWAITING.$route}/:id`, `ActivityAwaitController.show`);
  Route.put(`${PERMISSIONS.CONSULT_AWAITING.$route}/:id`, `ActivityAwaitController.update`);
  Route.delete(`${PERMISSIONS.CONSULT_AWAITING.$route}/:id`, `ActivityAwaitController.destroy`);
  Route.post(`${PERMISSIONS.CONSULT_AWAITING.$route}`, `ActivityAwaitController.store`);

  Route.get(`${PERMISSIONS.PARTNERS.$route}`, `PartnerController.index`);
  Route.get(`${PERMISSIONS.PARTNERS.$route}/:id`, `PartnerController.show`);
  Route.put(`${PERMISSIONS.PARTNERS.$route}/:id`, `PartnerController.update`);
  Route.delete(`${PERMISSIONS.PARTNERS.$route}/:id`, `PartnerController.destroy`);
  Route.post(`${PERMISSIONS.PARTNERS.$route}`, `PartnerController.store`);

  Route.get(`${PERMISSIONS.HEALTH_INSURANCES.$route}`, `HealthInsuranceController.index`);
  Route.get(`${PERMISSIONS.HEALTH_INSURANCES.$route}/:id`, `HealthInsuranceController.show`);
  Route.put(`${PERMISSIONS.HEALTH_INSURANCES.$route}/:id`, `HealthInsuranceController.update`);
  Route.delete(`${PERMISSIONS.HEALTH_INSURANCES.$route}/:id`, `HealthInsuranceController.destroy`);
  Route.post(`${PERMISSIONS.HEALTH_INSURANCES.$route}`, `HealthInsuranceController.store`);

  Route.get(`${PERMISSIONS.PROCEDURES.$route}`, `ProcedureController.index`);
  Route.get(`${PERMISSIONS.PROCEDURES.$route}/:id`, `ProcedureController.show`);
  Route.put(`${PERMISSIONS.PROCEDURES.$route}/:id`, `ProcedureController.update`);
  Route.delete(`${PERMISSIONS.PROCEDURES.$route}/:id`, `ProcedureController.destroy`);
  Route.post(`${PERMISSIONS.PROCEDURES.$route}`, `ProcedureController.store`);

  Route.get(`schedule`, `ScheduleController.index`);
  Route.get(`schedule/:id`, `ScheduleController.show`);
  Route.put(`schedule/:id`, `ScheduleController.update`);
  Route.delete(`schedule/:id`, `ScheduleController.destroy`);
  Route.post(`schedule`, `ScheduleController.store`);

  Route.get(`permissions`, `PermissionController.index`);
  Route.get(`permissions/:id`, `PermissionController.show`);
  Route.put(`permissions/:id`, `PermissionController.update`);
  Route.post(`permissions`, `PermissionController.store`);

  Route.post(`/upload`, `FileController.store`);

  Route.get(`reports-activities`, `ReportController.indexActivities`);
  Route.get(`reports-activities-partner`, `ReportController.indexActivitiesPartner`);
  Route.get(`reports-payment`, `ReportController.indexByPayment`);
  Route.get(`reports-payment-type`, `ReportController.indexByPaymentType`);
  Route.get(`reports-payment-prof`, `ReportController.indexByPaymentProf`);
  Route.get(`reports-payment-prof-date`, `ReportController.indexByPaymentProfDate`);
  Route.get(`reports-procedure`, `ReportController.indexByPaymentProcedure`);
  Route.get(`reports-canceled`, `ReportController.indexActivitiesCanceled`);

  Route.get(`rooms`, `RoomController.index`);
  Route.get(`room/:userId`, `RoomController.showByUnity`);
  Route.get(`room-support`, `RoomController.showBySupportUnity`);
  Route.post(`room/:id`, `RoomController.createMessage`);
  Route.get(`room-unread`, `RoomController.showMyChatsUnread`);

  Route.get(`ingredients`, `IngredientController.index`);
  Route.get(`ingredients/:id`, `IngredientController.show`);
  Route.put(`ingredients/:id`, `IngredientController.update`);
  Route.delete(`ingredients/:id`, `IngredientController.destroy`);
  Route.post(`ingredients`, `IngredientController.store`);

  Route.get(`ingredients-list`, `IngredientlistController.index`);
  Route.get(`ingredients-list/:id`, `IngredientlistController.show`);
  Route.put(`ingredients-list/:id`, `IngredientlistController.update`);
  Route.delete(`ingredients-list/:id`, `IngredientlistController.destroy`);
  Route.post(`ingredients-list`, `IngredientlistController.store`);

  Route.get(`direct-mail`, `DirectmailController.index`);
  Route.get(`direct-mail/:id`, `DirectmailController.show`);
  Route.put(`direct-mail/:id`, `DirectmailController.update`);
  Route.delete(`direct-mail/:id`, `DirectmailController.destroy`);
  Route.post(`direct-mail`, `DirectmailController.store`);

  Route.get(`pictures`, `PictureController.index`);
  Route.get(`pictures/:id`, `PictureController.show`);
  Route.put(`pictures/:id`, `PictureController.update`);
  Route.delete(`pictures/:id`, `PictureController.destroy`);
  Route.post(`pictures`, `PictureController.store`);

  Route.get(`activities-date`, `ReportController.indexHome`);

  Route.get(`payments-prof`, `PaymentProfController.index`);
  Route.get(`payments-prof/:id`, `PaymentProfController.show`);
  Route.put(`payments-prof/:id`, `PaymentProfController.update`);
  Route.delete(`payments-prof/:id`, `PaymentProfController.destroy`);
  Route.post(`payments-prof`, `PaymentProfController.store`);

  Route.get(`financial-category`, `FinancialCategoryController.index`);
  Route.get(`financial-category/:id`, `FinancialCategoryController.show`);
  Route.put(`financial-category/:id`, `FinancialCategoryController.update`);
  Route.delete(`financial-category/:id`, `FinancialCategoryController.destroy`);
  Route.post(`financial-category`, `FinancialCategoryController.store`);

  Route.get(`cost-center`, `CostCenterController.index`);
  Route.get(`cost-center/:id`, `CostCenterController.show`);
  Route.put(`cost-center/:id`, `CostCenterController.update`);
  Route.delete(`cost-center/:id`, `CostCenterController.destroy`);
  Route.post(`cost-center`, `CostCenterController.store`);

  Route.get(`accounts`, `AccountController.index`);
  Route.get(`accounts/:id`, `AccountController.show`);
  Route.put(`accounts/:id`, `AccountController.update`);
  Route.delete(`accounts/:id`, `AccountController.destroy`);
  Route.post(`accounts`, `AccountController.store`);

  Route.get(`default-config`, `DefaultConfigController.index`);
  Route.get(`default-config/:id`, `DefaultConfigController.show`);
  Route.put(`default-config/:id`, `DefaultConfigController.update`);
  Route.delete(`default-config/:id`, `DefaultConfigController.destroy`);
  Route.post(`default-config`, `DefaultConfigController.store`);

  Route.get(`payments-list`, `TransactionController.indexByPayment`);
  Route.put(`payments-stts/:id`, `TransactionController.updateStatus`);
  Route.put(`payments-transaction/:id`, `TransactionController.update`);
  Route.post(`payments-transaction`, `TransactionController.storeTransaction`);

  Route.post(`import`, `ImportController.import`);
}).middleware(`auth`);
