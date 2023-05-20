'use strict'
import Redis from '@ioc:Adonis/Addons/Redis'

class RedisController {
	async clear() {
		await Redis.flushall()
		return { message: 'Redis cleared' }
	}
}

export default RedisController
