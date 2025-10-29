import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { PaginatedResponse } from '#types/api/api.js'
import type { ArticulosContratos, Contratos, GetArticulosContratos, GetContratos } from '#types/api/index.js'

export class ContractsAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })
    }
    /**
     * Get a list of contracts.
     * @param {GetContratos} [params] - Parameters to filter the contracts.
     * @returns {Promise<PaginatedResponse<Contratos[]>>} - A promise with the list of contracts.
     * @example const contracts = await api.contracts.list()
     * @example const contracts = await api.contracts.list({ unidad_compra: 123 })
     */
    public async list(params?: GetContratos): Promise<PaginatedResponse<Contratos[]>> {
        return await this.request<PaginatedResponse<Contratos[]>>({
            method: 'GET',
            url: '/contratos',
            params,
        })
    }

    /**
     * Get a list of articles related to a contract.
     * @param {GetArticulosContratos} [params] - Parameters to filter the articles.
     * @returns {Promise<PaginatedResponse<ArticulosContratos[]>>} - A promise with the list of articles.
     * @example const articles = await api.contracts.articles()
     * @example const articles = await api.contracts.articles({ contrato: 123 })
     */
    public async articles(params?: GetArticulosContratos): Promise<PaginatedResponse<ArticulosContratos[]>> {
        return await this.request<PaginatedResponse<ArticulosContratos[]>>({
            method: 'GET',
            url: '/contratos/articulos',
            params,
        })
    }
}
