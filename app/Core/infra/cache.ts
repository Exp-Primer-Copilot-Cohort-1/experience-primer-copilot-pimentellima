import Redis from "@ioc:Adonis/Addons/Redis";
import { container, singleton } from "tsyringe";
import { CacheContract } from "./infra";

const DAY = 60 * 60 * 24 // 1 day

@singleton()
export class Cache implements CacheContract {
	private static time = DAY // 1 day in seconds

	async set(key: string, value: Object, seconds: number = Cache.time) {
		const stringified = JSON.stringify(value)
		return await Redis.set(key, stringified, 'EX', seconds)
	}

	async get(key: string): Promise<Object | null> {
		const value = await Redis.get(key)
		if (!value) return null
		return JSON.parse(value)
	}

	async delete(key: string) {
		return await Redis.del(key)
	}

	async flushKey(startingKey: string) {
		const pattern = `superKey:${startingKey}*`;

		const k = await Redis.keys(pattern, async (err, keys) => {
			if (err) return console.log(err)
			if (!keys?.length) return 0
			const deleted = await Redis.del(...keys)
			return deleted
		})

		return k.length
	}

	async flush() {
		return await Redis.flushdb()
	}

}

export default container.resolve(Cache);