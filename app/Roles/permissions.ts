// index => list (all)
// show => view (specific)
// update => edit (specific)
// destroy => delete (specific)
// store => create (specific)

import { ROLES, SCREENS, TYPE_PERMISSIONS } from './types'

type Permission = {
	name: string
	permissions: {
		[key: string]: {
			roles: ROLES[]
			permissions: TYPE_PERMISSIONS[]
			screens?: SCREENS[]
		}
	}
}

const PERMISSIONS_HEALTH_INSURANCES: Permission = {
	name: 'health-insurance',
	permissions: {
		'health-insurance.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_HEALTH_INSURANCE],
		},
		'health-insurance.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_HEALTH_INSURANCE],
		},
		'health-insurance.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_HEALTH_INSURANCE],
		},
		'health-insurance.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_HEALTH_INSURANCE],
		},
		'health-insurance.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_HEALTH_INSURANCE],
		},
	},
}

const PERMISSIONS_FORMS: Permission = {
	name: 'form',
	permissions: {
		'form.prof.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_FORMS, SCREENS.VIEW_FORMS_UPDATE],
		},
		'form.category.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_FORMS, SCREENS.VIEW_FORMS_UPDATE],
		},
		'form.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_FORMS_CREATE],
		},
		'form.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_FORMS],
		},
		'form.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_FORMS_CREATE],
		},
		'form.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_FORMS_CREATE, SCREENS.VIEW_FORMS_UPDATE],
		},
		'form.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
	},
}

const PERMISSIONS_ANSWERS: Permission = {
	name: 'answer',
	permissions: {
		'answer.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
		'answer.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
		},
		'answer.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'answer.form.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'answer.client.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'answer.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
		'answer.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
	},
}

const PERMISSIONS_ACTIVITY_AWAIT: Permission = {
	name: 'activity-await',
	permissions: {
		'activity-await.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_ACTIVITIES_AWAIT],
		},
		'activity-await.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_ACTIVITIES_AWAIT],
		},
		'activity-await.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_ACTIVITIES_AWAIT],
		},
		'activity-await.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_ACTIVITIES_AWAIT],
		},
		'activity-await.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_ACTIVITIES_AWAIT, SCREENS.VIEW_SCHEDULES],
		},
	},
}

const PERMISSIONS_STOCK: Permission = {
	name: 'stock',
	permissions: {
		'stock.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_STOCK],
		},
		'stock.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_STOCK],
		},
		'stock.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_STOCK],
		},
		'stock.update.id': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_STOCK],
		},
		'stock.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_STOCK],
		},
		'stock.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_STOCK],
		},
	},
}

const PERMISSIONS_PROCEDURES: Permission = {
	name: 'procedure',
	permissions: {
		'procedures.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedures.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedures.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedures.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedures.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
	},
}

const PERMISSIONS_PARTNER: Permission = {
	name: 'partner',
	permissions: {
		'partner.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_PARTNER],
		},
		'partner.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_PARTNER],
		},
		'partner.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_PARTNER],
		},
		'partner.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_PARTNER],
		},
		'partner.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_PARTNER],
		},
	},
}

const PERMISSIONS_CLIENTS: Permission = {
	name: 'client',
	permissions: {
		'clients.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_CLIENTS],
		},
		'clients.inatives': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_CLIENTS],
		},
		'clients.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_CLIENTS],
		},
		'clients.verify': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [],
		},
		'clients.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_CLIENTS_UPDATE],
		},
		'clients.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_CLIENTS_CREATE],
		},
	},
}

const PERMISSIONS_USERS: Permission = {
	name: 'user',
	permissions: {
		'users.prof.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_PROFS],
		},
		'users.secs.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_SECS],
		},
		'users.prof.inatives': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_PROFS],
		},
		'users.secs.inatives': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_SECS],
		},
		'users.prof.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_PROFS],
		},
		'users.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_PROFS],
		},
		'users.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
	},
}

const PERMISSIONS_CATEGORY: Permission = {
	name: 'category',
	permissions: {
		'category.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_CATEGORIES],
		},
		'category.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_CATEGORIES],
		},
		'category.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_CATEGORIES],
		},
		'category.destroy': {
			roles: [ROLES.ADMIN],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_CATEGORIES],
		},
		'category.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_CATEGORIES],
		},
	},
}

const PERMISSIONS_LOG_ANSWER: Permission = {
	name: 'logAnswer',
	permissions: {
		'logAnswer.byFormId': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
	},
}

const PERMISSIONS_ACTIVITY: Permission = {
	name: 'activity',
	permissions: {
		'activity.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_ACTIVITIES, SCREENS.VIEW_SCHEDULES],
		},
		'activity.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_ACTIVITIES],
		},
		'activity.byProfId': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_ACTIVITIES],
		},
		'activity.byClientId': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_ACTIVITIES],
		},
		'activity.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
		'activity.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_ACTIVITIES, SCREENS.VIEW_SCHEDULES],
		},
		'activity.payment': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
		'activity.status': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
	},
}

const PERMISSIONS_PROCEDURE: Permission = {
	name: 'procedure',
	permissions: {
		'procedure.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedure.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedure.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedure.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
		'procedure.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_PROCEDURES],
		},
	},
}

const PERMISSIONS_SCHEDULE: Permission = {
	name: 'schedule',
	permissions: {
		'schedule.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_SCHEDULES],
		},
		'schedule.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_SCHEDULES],
		},
		'schedule.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_SCHEDULES],
		},
		'schedule.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_SCHEDULES],
		},
		'schedule.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_SCHEDULES],
		},
	},
}

const PERMISSIONS_UPLOAD: Permission = {
	name: 'upload',
	permissions: {
		'upload.image': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [],
		},
	},
}

const PERMISSIONS_REPORTS: Permission = {
	name: 'reports',
	permissions: {
		'reports.activities': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'reports.activities.partner': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'reports.payment': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'reports.payment.type': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [],
		},
		'reports.payment.prof': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [],
		},
		'reports.payment.prof.date': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [],
		},
		'reports.procedure': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'reports.canceled': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
	},
}

const PERMISSIONS_ROOM: Permission = {
	name: 'room',
	permissions: {
		'room.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
		},
		'room.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'room.support': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [],
		},
		'room.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
		'room.unread': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
	},
}

const PERMISSIONS_INGREDIENTS: Permission = {
	name: 'ingredients',
	permissions: {
		'ingredients.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
		},
		'ingredients.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'ingredients.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
		'ingredients.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
		'ingredients.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
	},
}

const PERMISSIONS_INGREDIENTS_LIST: Permission = {
	name: 'ingredients-list',
	permissions: {
		'ingredients-list.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
		},
		'ingredients-list.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'ingredients-list.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
		'ingredients-list.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
		'ingredients-list.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
	},
}

const PERMISSIONS_MEDICAL_CERTIFICATES: Permission = {
	name: 'medical-certificate',
	permissions: {
		'medical-certificate.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_MEDICAL_CERTIFICATES],
		},
		'medical-certificate.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_MEDICAL_CERTIFICATES],
		},
		'medical-certificate.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_MEDICAL_CERTIFICATES],
		},
		'medical-certificate.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_MEDICAL_CERTIFICATES],
		},
		'medical-certificate.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_MEDICAL_CERTIFICATES],
		},
	},
}

const PERMISSIONS_DIRECT_MAIL: Permission = {
	name: 'direct-mail',
	permissions: {
		'medicalCertificate.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
		},
		'medicalCertificate.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'medicalCertificate.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
		'medicalCertificate.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
		'medicalCertificate.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
	},
}

const PERMISSIONS_PICTURES: Permission = {
	name: 'pictures',
	permissions: {
		'pictures.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
		},
		'pictures.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
		'pictures.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.UPDATE],
		},
		'pictures.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.DELETE],
		},
		'pictures.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
	},
}

const PERMISSIONS_ACTIVITIES_DATE: Permission = {
	name: 'activities-date',
	permissions: {
		'activities-date.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
		},
	},
}

const PERMISSIONS_PAYMENTS_PROF: Permission = {
	name: 'payments-prof',
	permissions: {
		'payments-prof.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_PAYMENTS_PROF],
		},
		'payments-prof.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_PAYMENTS_PROF],
		},
		'payments-prof.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_PAYMENTS_PROF],
		},
		'payments-prof.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_PAYMENTS_PROF],
		},
		'payments-prof.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_PAYMENTS_PROF],
		},
	},
}

const PERMISSIONS_FINANCIAL_CATEGORIES: Permission = {
	name: 'financial-categories',
	permissions: {
		'financial-categories.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_FINANCIAL_CATEGORY],
		},
		'financial-categories.inatives': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_FINANCIAL_CATEGORY],
		},
		'financial-categories.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_FINANCIAL_CATEGORY],
		},
		'financial-categories.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_FINANCIAL_CATEGORY],
		},
		'financial-categories.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_FINANCIAL_CATEGORY],
		},
		'financial-categories.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_FINANCIAL_CATEGORY],
		},
	},
}

const PERMISSIONS_COST_CENTERS: Permission = {
	name: 'cost-centers',
	permissions: {
		'cost-centers.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_COST_CENTER],
		},
		'cost-centers.inatives': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_COST_CENTER],
		},
		'cost-centers.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_COST_CENTER],
		},
		'cost-centers.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_COST_CENTER],
		},
		'cost-centers.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_COST_CENTER],
		},
		'cost-centers.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_COST_CENTER],
		},
	},
}

const PERMISSIONS_ACCOUNTS: Permission = {
	name: 'accounts',
	permissions: {
		'accounts.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_ACCOUNTS],
		},
		'accounts.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_ACCOUNTS],
		},
		'accounts.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_ACCOUNTS],
		},
		'accounts.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_ACCOUNTS],
		},
		'accounts.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_ACCOUNTS],
		},
	},
}

const PERMISSIONS_DEFAULT_CONFIG: Permission = {
	name: 'default-config',
	permissions: {
		'default-config.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_DEFAULT_CONFIG],
		},
		'default-config.show': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW],
			screens: [SCREENS.VIEW_DEFAULT_CONFIG],
		},
		'default-config.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_DEFAULT_CONFIG],
		},
		'default-config.destroy': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.DELETE],
			screens: [SCREENS.VIEW_DEFAULT_CONFIG],
		},
		'default-config.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_DEFAULT_CONFIG],
		},
	},
}

const PERMISSIONS_TRANSACTIONS: Permission = {
	name: 'transactions',
	permissions: {
		'transactions.index': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.VIEW_ALL],
			screens: [SCREENS.VIEW_TRANSACTIONS],
		},
		'transactions.updateStatus': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_TRANSACTIONS],
		},
		'transactions.update': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.UPDATE],
			screens: [SCREENS.VIEW_TRANSACTIONS],
		},
		'transactions.store': {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SEC],
			permissions: [TYPE_PERMISSIONS.CREATE],
			screens: [SCREENS.VIEW_TRANSACTIONS],
		},
	},
}

const PERMISSIONS_IMPORT: Permission = {
	name: 'import',
	permissions: {
		import: {
			roles: [ROLES.ADMIN, ROLES.ADMIN_PROF],
			permissions: [TYPE_PERMISSIONS.CREATE],
		},
	},
}

type ALL_PERMISSIONS = {
	[key: string]: Permission
}

const PERMISSIONS: ALL_PERMISSIONS = {
	[PERMISSIONS_ACCOUNTS.name]: PERMISSIONS_ACCOUNTS,
	[PERMISSIONS_ACTIVITIES_DATE.name]: PERMISSIONS_ACTIVITIES_DATE,
	[PERMISSIONS_ACTIVITY.name]: PERMISSIONS_ACTIVITY,
	[PERMISSIONS_ACTIVITY_AWAIT.name]: PERMISSIONS_ACTIVITY_AWAIT,
	[PERMISSIONS_ANSWERS.name]: PERMISSIONS_ANSWERS,
	[PERMISSIONS_CATEGORY.name]: PERMISSIONS_CATEGORY,
	[PERMISSIONS_CLIENTS.name]: PERMISSIONS_CLIENTS,
	[PERMISSIONS_COST_CENTERS.name]: PERMISSIONS_COST_CENTERS,
	[PERMISSIONS_DEFAULT_CONFIG.name]: PERMISSIONS_DEFAULT_CONFIG,
	[PERMISSIONS_DIRECT_MAIL.name]: PERMISSIONS_DIRECT_MAIL,
	[PERMISSIONS_FINANCIAL_CATEGORIES.name]: PERMISSIONS_FINANCIAL_CATEGORIES,
	[PERMISSIONS_FORMS.name]: PERMISSIONS_FORMS,
	[PERMISSIONS_HEALTH_INSURANCES.name]: PERMISSIONS_HEALTH_INSURANCES,
	[PERMISSIONS_IMPORT.name]: PERMISSIONS_IMPORT,
	[PERMISSIONS_INGREDIENTS.name]: PERMISSIONS_INGREDIENTS,
	[PERMISSIONS_INGREDIENTS_LIST.name]: PERMISSIONS_INGREDIENTS_LIST,
	[PERMISSIONS_LOG_ANSWER.name]: PERMISSIONS_LOG_ANSWER,
	[PERMISSIONS_PARTNER.name]: PERMISSIONS_PARTNER,
	[PERMISSIONS_PAYMENTS_PROF.name]: PERMISSIONS_PAYMENTS_PROF,
	[PERMISSIONS_PICTURES.name]: PERMISSIONS_PICTURES,
	[PERMISSIONS_PROCEDURES.name]: PERMISSIONS_PROCEDURES,
	[PERMISSIONS_PROCEDURE.name]: PERMISSIONS_PROCEDURE,
	[PERMISSIONS_REPORTS.name]: PERMISSIONS_REPORTS,
	[PERMISSIONS_ROOM.name]: PERMISSIONS_ROOM,
	[PERMISSIONS_SCHEDULE.name]: PERMISSIONS_SCHEDULE,
	[PERMISSIONS_MEDICAL_CERTIFICATES.name]: PERMISSIONS_MEDICAL_CERTIFICATES,
	[PERMISSIONS_STOCK.name]: PERMISSIONS_STOCK,
	[PERMISSIONS_TRANSACTIONS.name]: PERMISSIONS_TRANSACTIONS,
	[PERMISSIONS_PROCEDURE.name]: PERMISSIONS_PROCEDURE,
	[PERMISSIONS_USERS.name]: PERMISSIONS_USERS,
	[PERMISSIONS_UPLOAD.name]: PERMISSIONS_UPLOAD,
}

export default PERMISSIONS
