import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Cliente Redis desde variables de entorno
const redis = new Redis({
	url: import.meta.env.UPSTASH_REDIS_REST_URL!,
	token: import.meta.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Rate limiter para operaciones de escritura
export const writeRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(10, '10 s'),
	analytics: true,
	prefix: '@upstash/ratelimit/write',
})

// Rate limiter para operaciones de lectura
export const readRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(30, '10 s'),
	analytics: true,
	prefix: '@upstash/ratelimit/read',
})
