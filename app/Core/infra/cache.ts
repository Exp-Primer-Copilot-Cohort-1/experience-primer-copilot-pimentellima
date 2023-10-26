import Redis from "@ioc:Adonis/Addons/Redis";
import { container, singleton } from "tsyringe";
import { CacheContract } from "./infra";

const DAY = 60 * 60 * 24 // 1 day

@singleton()
export class Cache implements CacheContract {
	private static time = DAY // 1 day in seconds

	async set(key: string, value: Object, seconds: number = Cache.time) {
		const stringified = JSON.stringify(value)
		return Redis.set(key, stringified, 'EX', seconds)
	}

	async get(key: string): Promise<Object | null> {
		const value = await Redis.get(key)
		if (!value) return null
		return JSON.parse(value)
	}

	delete(key: string) {
		return Redis.del(key)
	}

	flushKey(key: string) {
		return Redis.del([`${key}*`])
	}

	flush() {
		return Redis.flushdb()
	}

}

export default container.resolve(Cache);