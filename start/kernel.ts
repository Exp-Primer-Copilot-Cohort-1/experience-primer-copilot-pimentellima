/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|  'App/Middleware/ConvertEmptyStringsToNull',
|  'App/Middleware/LogMiddleware',
*/
Server.middleware.register([
	() => import('@ioc:Adonis/Core/BodyParser'),
	() => import('@ioc:Adonis/Addons/Shield'),
	() => import('App/Middleware/Log'),
])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/

const config = {
	auth: 'App/Middleware/Auth',
	role: 'App/Middleware/Role',
	statusPermission: 'App/Middleware/PermissionStatus',
	successNoContent: 'App/Middleware/SuccessNoContent',
	cache: 'App/Middleware/Cache',
	throttle: () => import('@adonisjs/limiter/build/throttle'),
}

Server.middleware.registerNamed(config)

export enum KeysCache {
	AUTH = 'auth',
	ROLE = 'role',
	STATUS_PERMISSION = 'statusPermission',
	SUCCESS_NO_CONTENT = 'successNoContent',
	CACHE = 'cache',
	THROTTLE = 'throttle',
}