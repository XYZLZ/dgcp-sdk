import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { MahoragaResponse } from '#types/mahoraga/api.js'
import type { LoginServicePayload, MahoLogin } from '#types/mahoraga/index.js'
import type { AxiosResponse } from 'axios'

export class Auth extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.MAHORAGA,
            baseUrl: BASE_URLS[APIEndpoint.MAHORAGA],
        })
    }

    async login(credentials: MahoLogin, withResponseMetadata = false): Promise<AxiosResponse<MahoragaResponse<LoginServicePayload>> | MahoragaResponse<LoginServicePayload>> {
        return await this.request<MahoragaResponse<LoginServicePayload>>({
            method: 'POST',
            url: '/auth/login',
            data: { username: credentials.username, password: credentials.password },
        }, withResponseMetadata)
        
    }
}
