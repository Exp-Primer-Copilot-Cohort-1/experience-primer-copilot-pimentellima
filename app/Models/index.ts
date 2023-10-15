import Account, { COLLECTION_NAME as COLLECTION_NAME_ACCOUNT } from './Account'
import Activity, { COLLECTION_NAME as COLLECTION_NAME_ACTIVITY } from './Activity'
import Category, { COLLECTION_NAME as COLLECTION_NAME_CATEGORY } from './Category'
import Client, { COLLECTION_NAME as COLLECTION_NAME_CLIENT } from './Client'
import CostCenter, { COLLECTION_NAME as COLLECTION_NAME_COST_CENTER } from './CostCenter'
import FinancialCategory, {
	COLLECTION_NAME as COLLECTION_NAME_FINANCIAL_CATEGORY,
} from './FinancialCategory'
import HealthInsurance, {
	COLLECTION_NAME as COLLECTION_NAME_HEALTH_INSURANCE,
} from './HealthInsurance'
import MedicalCertificate, {
	COLLECTION_NAME as COLLECTION_NAME_MEDICAL_CERTIFICATE,
} from './MedicalCertificate'
import Partner, { COLLECTION_NAME as COLLECTION_NAME_PARTNER } from './Partner'
import PaymentParticipations, {
	COLLECTION_NAME as COLLECTION_NAME_PAYMENT_PARTICIPATIONS,
} from './PaymentParticipations'
import Procedure, { COLLECTION_NAME as COLLECTION_NAME_PROCEDURE } from './Procedure'
import ScheduleBlock, {
	COLLECTION_NAME as COLLECTION_NAME_SCHEDULE_BLOCK,
} from './ScheduleBlock'
import ScheduledConfig, {
	COLLECTION_NAME as COLLECTION_NAME_SCHEDULED_CONFIG,
} from './ScheduledConfig'
import Stock, { COLLECTION_NAME as COLLECTION_NAME_STOCK } from './Stock'
import Transactions, {
	COLLECTION_NAME as COLLECTION_NAME_TRANSACTIONS,
} from './Transactions'
import Unity, { COLLECTION_NAME as COLLECTION_NAME_UNITY } from './Unity'
import User, { COLLECTION_NAME as COLLECTION_NAME_USER } from './User'

const COLLECTIONS = {
	[COLLECTION_NAME_ACCOUNT]: Account,
	[COLLECTION_NAME_ACTIVITY]: Activity,
	[COLLECTION_NAME_CATEGORY]: Category,
	[COLLECTION_NAME_CLIENT]: Client,
	[COLLECTION_NAME_COST_CENTER]: CostCenter,
	[COLLECTION_NAME_FINANCIAL_CATEGORY]: FinancialCategory,
	[COLLECTION_NAME_HEALTH_INSURANCE]: HealthInsurance,
	[COLLECTION_NAME_PARTNER]: Partner,
	[COLLECTION_NAME_PROCEDURE]: Procedure,
	[COLLECTION_NAME_MEDICAL_CERTIFICATE]: MedicalCertificate,
	[COLLECTION_NAME_PAYMENT_PARTICIPATIONS]: PaymentParticipations,
	[COLLECTION_NAME_SCHEDULE_BLOCK]: ScheduleBlock,
	[COLLECTION_NAME_SCHEDULED_CONFIG]: ScheduledConfig,
	[COLLECTION_NAME_STOCK]: Stock,
	[COLLECTION_NAME_TRANSACTIONS]: Transactions,
	[COLLECTION_NAME_UNITY]: Unity,
	[COLLECTION_NAME_USER]: User,
}

export type COLLECTIONS_NAMES = keyof typeof COLLECTIONS

export default COLLECTIONS
