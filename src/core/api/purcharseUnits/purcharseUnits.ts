import {BaseClient} from '#client/base.js';
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js';
import type { PaginatedResponse } from '#types/api/api.js';
import type { GetUnidadCompra, UnidadCompra } from '#types/api/index.js';

export class PurcharseUnitsAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })
    }

    /**
     * Get a list of purchase units.
     * @param {GetUnidadCompra} [params] - Parameters to filter the purchase units.
     * @returns {Promise<PaginatedResponse<UnidadCompra[]>>} - A promise with the list of purchase units.
     * @example const purchaseUnits = await api.purcharseUnits.list()
     * @example const purchaseUnits = await api.purcharseUnits.list({ unidad_compra: 123 })
     **/
    async list(params?: GetUnidadCompra): Promise<PaginatedResponse<UnidadCompra[]>> {
        return await this.request<PaginatedResponse<UnidadCompra[]>>({
            method: 'GET',
            url: '/unidad_compra',
            params,
        })
    }
}