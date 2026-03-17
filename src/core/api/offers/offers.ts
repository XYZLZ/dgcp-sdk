import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { PaginatedResponse } from '#types/api/api.js'
import type { AxiosResponse } from 'axios'
import type { GetOfertas, Ofertas } from '#types/api/index.js'

export class OffersAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })
    }

    /**
     * Get a list of all offers.
     * @param {GetOfertas} [params] - Parameters to filter the offers.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Ofertas[]>> | PaginatedResponse<Ofertas[]>>} - A promise with the list of offers.
     * @example const offers = await api.offers.list()
     * @example const offers = await api.offers.list({ proceso: 123 })
     */
    public async list(params?: GetOfertas, withResponseMetadata = false): Promise<AxiosResponse<PaginatedResponse<Ofertas[]>> | PaginatedResponse<Ofertas[]>> {
        return await this.request<PaginatedResponse<Ofertas[]>>({
            method: 'GET',
            url: '/ofertas',
            params,
        }, withResponseMetadata)

    }
}
