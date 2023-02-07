import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Log from '../../config/log';

class LogMiddleware {
  async handle({ request }: HttpContextContract, next) {
    Log.info(`${new Date().toISOString()} -  ${request.url()}`)
    await next();
  }
}

export default LogMiddleware;
