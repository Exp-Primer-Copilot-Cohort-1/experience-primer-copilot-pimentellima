
type Nullable<T> = {
	[P in keyof T]: T[P] | null
}

type Message = {
	message: string
}

type Hours = number

type Year = number
