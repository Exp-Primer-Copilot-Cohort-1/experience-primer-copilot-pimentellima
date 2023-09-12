export enum ROLES {
	ADMIN = 'admin',
	ADMIN_PROF = 'admin_prof',
	PROF = 'prof',
	SEC = 'sec',
	CLIENT = 'client',
	SUPERADMIN = 'superadmin',
	DR_PERFORMANCE = 'dr_performance',
}

export enum TYPE_PERMISSIONS {
	VIEW_ALL = 'view_all',
	VIEW = 'view',
	CREATE = 'create',
	UPDATE = 'update',
	DELETE = 'delete',
	TOGGLE_STATUS = 'toggle_status',
}

export enum SCREENS {
	VIEW_DASHBOARD = '/dashboard',
	VIEW_HEALTH_INSURANCE = '/dashboard/health-insurance',
	VIEW_ACTIVITIES_AWAIT = '/dashboard/activities-await',
	VIEW_ACTIVITIES = '/dashboard/activities',
	VIEW_CLIENTS = '/dashboard/clients',
	VIEW_CLIENTS_CREATE = '/dashboard/clients/new',
	VIEW_CLIENTS_UPDATE = '/dashboard/clients/:id',
	VIEW_PROFS = '/dashboard/users/prof',
	VIEW_SECS = '/dashboard/users/sec',
	VIEW_TRANSACTIONS = '/dashboard/transactions',
	VIEW_PROCEDURES = '/dashboard/procedures',
	VIEW_COMPANY = '/dashboard/company',
	VIEW_DEFAULT_CONFIG = '/dashboard/default-config',
	VIEW_PROFILE = '/dashboard/profile',
	VIEW_STOCK = '/dashboard/stock',
	VIEW_PERMISSIONS = '/dashboard/permissions',
	VIEW_PAYMENTS_PROF = '/dashboard/payments/prof',
	VIEW_FINANCIAL_CATEGORY = '/dashboard/financial-category',
	VIEW_COST_CENTER = '/dashboard/cost-center',
	VIEW_ACCOUNTS = '/dashboard/accounts',
	VIEW_SCHEDULES = '/dashboard/schedules',
	VIEW_PARTNER = '/dashboard/partner',
	VIEW_CATEGORIES = '/dashboard/categories',
	VIEW_FORMS = '/dashboard/forms',
	VIEW_FORMS_CREATE = '/dashboard/forms/new',
	VIEW_FORMS_UPDATE = '/dashboard/forms/:id',
	VIEW_MEDICAL_CERTIFICATES = '/dashboard/medical-certificate',
	VIEW_INGREDIENTS_MODEL = '/dashboard/ingredients-model',
}
