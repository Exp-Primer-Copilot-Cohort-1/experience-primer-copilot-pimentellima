export interface IPaymentActivity {
	activityId: string;
	bankAccountId: string;
	costCenterId: string;
	categoryId: string;
	paid: boolean;
	paymentDate: string;
	paymentForm: string;
	installment: boolean;
	installmentsNumber: number;
	installmentCurrent: number;
	value: string;
	description?: string;
};
