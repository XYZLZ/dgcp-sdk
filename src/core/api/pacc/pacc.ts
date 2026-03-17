import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { PaginatedResponse } from '#types/api/api.js'
import type {
    Adquisiciones,
    ArticulosPACC,
    GetAdquisicionesPACC,
    GetArticulosPACC,
    GetPACC,
    PACC,
} from '#types/api/index.js'
import type { AxiosResponse } from 'axios'

export class PACCResource extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })
    }

    /**
     * Get a list of PACCs.
     * @param {GetPACC} [params] - Parameters to filter the PACCs.
     * @returns {Promise<AxiosResponse<PaginatedResponse<PACC[]>> | PaginatedResponse<PACC[]>>} - A promise with the list of PACCs.
     * @example const paccs = await api.pacc.list({ unidad_compra: 123 })
     */
    async list(params?: GetPACC, withResponseMetadata = false): Promise<AxiosResponse<PaginatedResponse<PACC[]>> | PaginatedResponse<PACC[]>> {
        return await this.request<PaginatedResponse<PACC[]>>({
            method: 'get',
            url: '/pacc',
            params,
        }, withResponseMetadata)
    }

    /**
     * Get a list of articles related to a PACC.
     * @param {GetArticulosPACC} [params] - Parameters to filter the articles.
     * @returns {Promise<PaginatedResponse<ArticulosPACC[]>>} - A promise with the list of articles.
     * @example const articles = await api.pacc.articles({ unidad_compra: 123 })
     */
    async articles(
        params?: GetArticulosPACC,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<PaginatedResponse<ArticulosPACC[]>> | PaginatedResponse<ArticulosPACC[]>> {
        return await this.request<PaginatedResponse<ArticulosPACC[]>>(
            {
                method: 'get',
                url: '/pacc/articulos',
                params,
            },
            withResponseMetadata,
        )
    }

    /**
     * Get a list of adquisitions related to a PACC.
     * @param {GetAdquisicionesPACC} [params] - Parameters to filter the adquisitions.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Adquisiciones[]>> | PaginatedResponse<Adquisiciones[]>>} - A promise with the list of adquisitions.
     * @example const adquisitions = await api.pacc.acquirements({ unidad_compra: 123 })
     */
    async acquirements(
        params?: GetAdquisicionesPACC,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<PaginatedResponse<Adquisiciones[]>> | PaginatedResponse<Adquisiciones[]>> {
        return await this.request<PaginatedResponse<Adquisiciones[]>>(
            {
                method: 'get',
                url: '/pacc/adquisiciones',
                params,
            },
            withResponseMetadata,
        )
    }
}
