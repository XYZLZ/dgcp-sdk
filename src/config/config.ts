export enum APIEndpoint {
    API = 'api',
    MAHORAGA = 'mahoraga',
}

export interface SDKConfig {
    apiKey: string
    timeout?: number
    retryConfig?: RetryConfig
    headers?: Record<string, string>
    version?: string
    debug?: boolean
}

export interface InternalSDKConfig extends SDKConfig {
    endpoint: APIEndpoint
    baseUrl: string
}

export interface RetryConfig {
    maxRetries: number
    retryDelay: number
    retryableStatuses: number[]
}

export const DEFAULT_CONFIG: Partial<SDKConfig> = {
    timeout: 30000,
    retryConfig: {
        maxRetries: 3,
        retryDelay: 1000,
        retryableStatuses: [408, 429, 500, 502, 503, 504],
    },
    version: '1.0.0',
    debug: false,
}

export const BASE_URLS: Record<APIEndpoint, string> = {
    [APIEndpoint.API]: 'https://datosabiertos.dgcp.gob.do/api-dgcp/v1/',
    [APIEndpoint.MAHORAGA]: 'https://api.mahoraga.com/v1/',
}

export const VERSION = '1.0.0'

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': `my-sdk-js/${VERSION}`,
}
