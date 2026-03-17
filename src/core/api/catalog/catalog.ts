import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { PaginatedResponse } from '#types/api/api.js'
import type { Catalogo, GetCatalogo } from '#types/api/index.js'
import type { AxiosResponse } from 'axios'

export class CatalogAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })
    }

    /**
     * Get a list of all catalogs.
     * @param {GetCatalogo} [params] - Parameters to filter the catalogs.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Catalogo[]>> | PaginatedResponse<Catalogo[]>>} - A promise with the list of catalogs.
     * @example const catalogs = await api.catalog.list()
     * @example const catalogs = await api.catalog.list({segmento: '123'})
     */
    async list(params?: GetCatalogo, withResponseMetadata = false): Promise<AxiosResponse<PaginatedResponse<Catalogo[]>> | PaginatedResponse<Catalogo[]>> {
        return await this.request<PaginatedResponse<Catalogo[]>>({
            method: 'GET',
            url: '/catalogo',
            params,
        }, withResponseMetadata)
    }
}
