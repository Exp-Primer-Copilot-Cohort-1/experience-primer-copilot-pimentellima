// index => list (all)
// show => view (specific)
// update => edit (specific)
// destroy => delete (specific)
// store => create (specific)

import { ROLES } from './helpers'

type Permission = {
	[key: string]: {
		roles: string[]
		permissions: string[]
	}
}

const PERMISSIONS_HEALTH_INSURANCES: Permission = {
	'health-insurance.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_health_insurance'],
	},
	'health-insurance.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_health_insurance'],
	},
	'health-insurance.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_health_insurance'],
	},
	'health-insurance.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_health_insurance'],
	},
	'health-insurance.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_health_insurance'],
	},
}

const PERMISSIONS_FORMS: Permission = {
	'form.prof.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['view_form_by_prof'],
	},
	'form.category.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['view_form_by_category'],
	},
	'form.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_form'],
	},
	'form.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_all_forms'],
	},
	'form.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_form'],
	},
	'form.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_form'],
	},
	'form.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_form'],
	},
}

const PERMISSIONS_ANSWERS: Permission = {
	'answer.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['create_answer'],
	},
	'answer.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_all_answers'],
	},
	'answer.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_answer'],
	},
	'answer.form.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['view_answers_by_form'],
	},
	'answer.client.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_answers_by_client'],
	},
	'answer.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_answer'],
	},
	'answer.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_answer'],
	},
}

const PERMISSIONS_ACTIVITY_AWAIT: Permission = {
	'activity-await.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_activity_awaits'],
	},
	'activity-await.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_activity_await'],
	},
	'activity-await.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_activity_await'],
	},
	'activity-await.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_activity_await'],
	},
	'activity-await.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_activity_await'],
	},
}

const PERMISSIONS_STOCK: Permission = {
	'stock.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_stocks'],
	},
	'stock.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_stock'],
	},
	'stock.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_stock'],
	},
	'stock.update.id': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['custom_update_stock'],
	},
	'stock.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_stock'],
	},
	'stock.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_stock'],
	},
}

const PERMISSIONS_PROCEDURES: Permission = {
	'procedures.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['view_all_procedures'],
	},
	'procedures.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_procedure'],
	},
	'procedures.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_procedure'],
	},
	'procedures.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_procedure'],
	},
	'procedures.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_procedure'],
	},
}

const PERMISSIONS_PARTNER: Permission = {
	'partner.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_partners'],
	},
	'partner.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_partner'],
	},
	'partner.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_partner'],
	},
	'partner.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_partner'],
	},
	'partner.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_partner'],
	},
}

const PERMISSIONS_CLIENTS: Permission = {
	'clients.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_clients'],
	},
	'clients.inactives': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_inactive_clients'],
	},
	'clients.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_client'],
	},
	'clients.verify': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['verify_client_existence'],
	},
	'clients.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['update_client'],
	},
	'clients.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['create_client'],
	},
}

const PERMISSIONS_USERS: Permission = {
	'users.prof.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_prof_users'],
	},
	'users.secs.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_secs_users'],
	},
	'users.prof.inactives': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_inactive_prof_users'],
	},
	'users.secs.inactives': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_all_inactive_secs_users'],
	},
	'users.prof.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_prof_user'],
	},
	'users.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_user'],
	},
	'users.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_user'],
	},
}

const PERMISSIONS_CATEGORY: Permission = {
	'category.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_all_categories'],
	},
	'category.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_category'],
	},
	'category.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_category'],
	},
	'category.destroy': {
		roles: [ROLES.ADMIN],
		permissions: ['delete_category'],
	},
	'category.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['create_category'],
	},
}

const PERMISSIONS_LOG_ANSWER: Permission = {
	'logAnswer.byFormId': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_log_by_form_id'],
	},
}

const PERMISSIONS_ACTIVITY: Permission = {
	'activity.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC, ROLES.PROF],
		permissions: ['view_all_activities'],
	},
	'activity.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC, ROLES.PROF],
		permissions: ['update_activity'],
	},
	'activity.byProfId': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_activities_by_prof_id'],
	},
	'activity.byClientId': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_activities_by_client_id'],
	},
	'activity.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_activity'],
	},
	'activity.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['create_activity'],
	},
	'activity.payment': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['make_activity_payment'],
	},
}

const PERMISSIONS_PROCEDURE: Permission = {
	'procedure.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_all_procedures'],
	},
	'procedure.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_procedure'],
	},
	'procedure.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['update_procedure'],
	},
	'procedure.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_procedure'],
	},
	'procedure.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['create_procedure'],
	},
}

const PERMISSIONS_SCHEDULE: Permission = {
	'schedule.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_all_schedules'],
	},
	'schedule.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_schedule'],
	},
	'schedule.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['update_schedule'],
	},
	'schedule.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_schedule'],
	},
	'schedule.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['create_schedule'],
	},
}

const PERMISSIONS_UPLOAD: Permission = {
	'upload.image': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['upload_image'],
	},
}

const PERMISSIONS_REPORTS: Permission = {
	'reports.activities': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_activity_reports'],
	},
	'reports.activities.partner': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_partner_activity_reports'],
	},
	'reports.payment': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_payment_reports'],
	},
	'reports.payment.type': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_payment_type_reports'],
	},
	'reports.payment.prof': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_prof_payment_reports'],
	},
	'reports.payment.prof.date': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_datewise_prof_payment_reports'],
	},
	'reports.procedure': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_procedure_reports'],
	},
	'reports.canceled': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['view_canceled_reports'],
	},
}

const PERMISSIONS_ROOM: Permission = {
	'room.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_rooms'],
	},
	'room.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_room'],
	},
	'room.support': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['get_room_support'],
	},
	'room.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['create_room'],
	},
	'room.unread': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_unread_rooms'],
	},
}

const PERMISSIONS_INGREDIENTS: Permission = {
	'ingredients.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_ingredients'],
	},
	'ingredients.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_ingredient'],
	},
	'ingredients.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_ingredient'],
	},
	'ingredients.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_ingredient'],
	},
	'ingredients.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['create_ingredient'],
	},
}

const PERMISSIONS_INGREDIENTS_LIST: Permission = {
	'ingredients-list.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_ingredients_list'],
	},
	'ingredients-list.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_ingredients_list'],
	},
	'ingredients-list.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_ingredients_list'],
	},
	'ingredients-list.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_ingredients_list'],
	},
	'ingredients-list.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_ingredients_list'],
	},
}

const PERMISSIONS_SICK_NOTES: Permission = {
	'sick-notes.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['view_all_sick_notes'],
	},
	'sick-notes.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['view_specific_sick_note'],
	},
	'sick-notes.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_sick_note'],
	},
	'sick-notes.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_sick_note'],
	},
	'sick-notes.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
		permissions: ['create_sick_note'],
	},
}

const PERMISSIONS_DIRECT_MAIL: Permission = {
	'directMail.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_direct_mail'],
	},
	'directMail.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_direct_mail'],
	},
	'directMail.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_direct_mail'],
	},
	'directMail.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_direct_mail'],
	},
	'directMail.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['create_direct_mail'],
	},
}

const PERMISSIONS_PICTURES: Permission = {
	'pictures.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_all_pictures'],
	},
	'pictures.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_specific_picture'],
	},
	'pictures.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['update_picture'],
	},
	'pictures.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['delete_picture'],
	},
	'pictures.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['create_picture'],
	},
}

const PERMISSIONS_ACTIVITIES_DATE: Permission = {
	'activities-date.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
		permissions: ['view_activities_date'],
	},
}

const PERMISSIONS_PAYMENTS_PROF: Permission = {
	'payments-prof.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_payment_profs'],
	},
	'payments-prof.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_payment_prof'],
	},
	'payments-prof.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_payment_prof'],
	},
	'payments-prof.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_payment_prof'],
	},
	'payments-prof.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_payment_prof'],
	},
}

const PERMISSIONS_FINANCIAL_CATEGORIES: Permission = {
	'financial-categories.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_financial_categories'],
	},
	'financial-categories.inactives': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_inactive_financial_categories'],
	},
	'financial-categories.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_financial_category'],
	},
	'financial-categories.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_financial_category'],
	},
	'financial-categories.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_financial_category'],
	},
	'financial-categories.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_financial_category'],
	},
}

const PERMISSIONS_COST_CENTERS: Permission = {
	'cost-centers.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_cost_centers'],
	},
	'cost-centers.inactives': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_inactive_cost_centers'],
	},
	'cost-centers.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_cost_center'],
	},
	'cost-centers.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_cost_center'],
	},
	'cost-centers.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_cost_center'],
	},
	'cost-centers.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_cost_center'],
	},
}

const PERMISSIONS_ACCOUNTS: Permission = {
	'accounts.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_accounts'],
	},
	'accounts.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC, ROLES.SEC],
		permissions: ['view_specific_account'],
	},
	'accounts.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_account'],
	},
	'accounts.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_account'],
	},
	'accounts.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_account'],
	},
}

const PERMISSIONS_DEFAULT_CONFIG: Permission = {
	'default-config.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_default_configs'],
	},
	'default-config.show': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_specific_default_config'],
	},
	'default-config.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_default_config'],
	},
	'default-config.destroy': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['delete_default_config'],
	},
	'default-config.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['create_default_config'],
	},
}

const PERMISSIONS_TRANSACTIONS: Permission = {
	'transactions.index': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['view_all_transactions'],
	},
	'transactions.updateStatus': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['update_transaction_status'],
	},
	'transactions.update': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['update_transaction'],
	},
	'transactions.store': {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
		permissions: ['create_transaction'],
	},
}

const PERMISSIONS_IMPORT: Permission = {
	import: {
		roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
		permissions: ['import_data'],
	},
}

export default {
	...PERMISSIONS_ACCOUNTS,
	...PERMISSIONS_ACTIVITIES_DATE,
	...PERMISSIONS_ACTIVITY,
	...PERMISSIONS_ACTIVITY_AWAIT,
	...PERMISSIONS_ANSWERS,
	...PERMISSIONS_CATEGORY,
	...PERMISSIONS_CLIENTS,
	...PERMISSIONS_COST_CENTERS,
	...PERMISSIONS_DEFAULT_CONFIG,
	...PERMISSIONS_DIRECT_MAIL,
	...PERMISSIONS_FINANCIAL_CATEGORIES,
	...PERMISSIONS_FORMS,
	...PERMISSIONS_HEALTH_INSURANCES,
	...PERMISSIONS_IMPORT,
	...PERMISSIONS_INGREDIENTS,
	...PERMISSIONS_INGREDIENTS_LIST,
	...PERMISSIONS_LOG_ANSWER,
	...PERMISSIONS_PARTNER,
	...PERMISSIONS_PAYMENTS_PROF,
	...PERMISSIONS_PICTURES,
	...PERMISSIONS_PROCEDURES,
	...PERMISSIONS_PROCEDURE,
	...PERMISSIONS_REPORTS,
	...PERMISSIONS_ROOM,
	...PERMISSIONS_SCHEDULE,
	...PERMISSIONS_SICK_NOTES,
	...PERMISSIONS_STOCK,
	...PERMISSIONS_TRANSACTIONS,
	...PERMISSIONS_PROCEDURES,
	...PERMISSIONS_PARTNER,
	...PERMISSIONS_USERS,
	...PERMISSIONS_UPLOAD,
}
