export enum STATUS {
    AWAITING = 'awaiting',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
}

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
    REFUNDED = 'refunded',
}

export enum AppointmentStatus {
    AWAITING = 'awaiting',
    MARKED = 'marked',
    RESCHEDULED = 'rescheduled',
    CANCELED = 'canceled',
    COMPLETED = 'completed'
}

export enum PaymentType {
    CREDIT_CARD = 'credit_card',
    BANK_SLIP = 'bank_slip',
    BANK_TRANSFER = 'bank_transfer',
    OTHER = 'other',
}
