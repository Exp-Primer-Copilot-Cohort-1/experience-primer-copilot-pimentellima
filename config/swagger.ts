import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'
/**
 * Configuration file for Swagger documentation.
 * This file defines the options and settings for Swagger UI and Swagger specification.
 * This API is used for managing medical clinics, including employees, payroll, vacations, benefits, and other features.
 * The API documentation contains detailed information about each endpoint, including examples of requests and responses.
 * Additionally, the API uses JWT authentication (BearerAuth) to ensure the security of information.
 * Technologies used: Node.js, TypeScript, AdonisJS, JWT.
 * Node.js version: 18
 * TypeScript version: ^5.1.6
 * AdonisJS version: ^5.9.0
 */
export default {
	uiEnabled: true,
	uiUrl: 'docs',
	specEnabled: true,
	specUrl: '/swagger.json',

	middleware: [],

	options: {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'DpSystem API',
				version: '1.0.0',
				description:
					'API do DpSystem, um sistema de gestão de clínicas. Com esta API, é possível gerenciar funcionários, folhas de pagamento, férias, benefícios, entre outras funcionalidades. A documentação da API contém informações detalhadas sobre cada endpoint, incluindo exemplos de requisições e respostas. Além disso, a API utiliza autenticação JWT (BearerAuth) para garantir a segurança das informações. As tecnologias utilizadas incluem Node.js, TypeScript, AdonisJS e JWT. Node.js versão 18, TypeScript versão 5 e AdonisJS versão 5',
			},
			servers: [
				{
					url: 'http://localhost:3333',
					description: 'Local server',
				},
			],
			security: [
				{
					bearerAuth: [],
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
		},

		// Especifique as definições de segurança para autenticação JWT (BearerAuth)

		servers: [
			{
				url: 'http://localhost:3333',
				description: 'Local server',
			},
		],
		// Lista de arquivos que descrevem suas rotas
		apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],

		basePath: '/',
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
	specFilePath: 'docs/swagger.json',
} as SwaggerConfig
