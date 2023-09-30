/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'

Event.on('new:user', 'User.onNewUser')
Event.on('new:password', 'User.onNewPassword')
Event.on('new:log:put', 'Log.onNewLogPut')
Event.on('new:log:post', 'Log.onNewLogPost')