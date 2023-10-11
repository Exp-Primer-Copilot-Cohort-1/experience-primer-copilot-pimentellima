import Redis from "@ioc:Adonis/Addons/Redis";
import { container, singleton } from "tsyringe";

const DAY = 60 * 60 * 24 // 1 day

interface CacheInterface {
	set(key: string, value: string, seconds?: number): Promise<string>
	get(key: string): Promise<string | null>
	delete(key: string): Promise<number>
	flush(): Promise<string>
}

@singleton()
class Cache implements CacheInterface {
	private static time = DAY // 1 day in seconds

	set(key: string, value: string, seconds: number = Cache.time) {
		return Redis.set(key, value, 'EX', seconds)
	}

	get(key: string) {
		return Redis.get(key)
	}

	delete(key: string) {
		return Redis.del(key)
	}

	flush() {
		return Redis.flushdb()
	}

}

export default container.resolve(Cache);