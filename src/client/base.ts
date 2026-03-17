import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { RateLimitError, AuthenticationError, NetworkError, APIError } from '#errors/errors.js'
import { APIEndpoint, type InternalSDKConfig } from '#config/config.js'
import https from 'node:https'

export class BaseClient {
    protected axios: AxiosInstance
    protected config: InternalSDKConfig
    protected endpoint: APIEndpoint

    constructor(config: InternalSDKConfig) {
        const agent = new https.Agent({ rejectUnauthorized: false }) // todo: delete this in the future
        this.config = config
        this.endpoint = config.endpoint
        this.axios = axios.create({
            baseURL: config.baseUrl,
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': `dgcp-sdk-js/${config.version}`,
                ...config.headers,
            },
            httpsAgent: agent,
        })

        this.setupInterceptors()
    }

    private setupInterceptors(): void {
        this.axios.interceptors.request.use(
            (config) => {
                if (this.config.apiKey) {
                    config.headers['X-API-Key'] = `${this.config.apiKey}`
                }

                if (this.config.debug) {
                    console.log('[SDK REQUEST]', {
                        method: config.method,
                        url: config.baseURL! + config.url,
                        headers: config.headers,
                    })
                }

                return config
            },
            (error) => Promise.reject(error),
        )

        this.axios.interceptors.response.use(
            (response) => {
                if (this.config.debug) {
                    console.log('[SDK RESPONSE]', {
                        status: response.status,
                        url: response.config.url + response.config.params ? `?${response.config.params}` : '',
                    })
                }

                return response
            },

            (error) => {
                console.log(error)
                if (error.response) {
                    const status = error.response.status

                    if (status === 401) throw AuthenticationError('Invalid API key', error)
                    if (status === 429) throw RateLimitError('Rate limit exceeded', error)

                    throw APIError(error.response.data.message || 'API request failed', error)
                }
                throw NetworkError('Network error', error)
            },
        )
    }

    protected async request<T>(
        config: AxiosRequestConfig,
        setRequestInfo: boolean,
    ): Promise<AxiosResponse<T> | T> {
        const response = await this.axios.request<T>(config)
        if (setRequestInfo) return response
        return response.data
    }

    getEndpoint(): APIEndpoint {
        return this.endpoint
    }

    getBaseUrl(): string {
        return this.config.baseUrl
    }
}
