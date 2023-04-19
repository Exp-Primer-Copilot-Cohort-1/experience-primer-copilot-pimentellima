export interface HttpResponse {
	statusCode: number;
	body: any;
}

export interface HttpRequest {
	body?: any;
	params?: any;
}

export interface HttpParams {
	[key: string]: any;
}
