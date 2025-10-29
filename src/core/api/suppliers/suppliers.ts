import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { PaginatedResponse } from '#types/api/api.js'
import type {
    GetProveedores,
    GetRubroProveedor,
    Proveedor,
    RubroProveedor,
    TransparenciaMipymesMujeres,
} from '#types/api/index.js'

export class SuppliersAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })
    }

    /**
     * Get a list of all suppliers.
     * @param {GetProveedores} [params] - Parameters to filter the suppliers.
     * @returns {Promise<PaginatedResponse<Proveedor[]>>} - A promise with the list of suppliers.
     * @example const suppliers = await api.suppliers.list()
     * @example const suppliers = await api.suppliers.list({ rpe: 123 })
     */
    async list(params?: GetProveedores): Promise<PaginatedResponse<Proveedor[]>> {
        const res = await this.request<PaginatedResponse<Proveedor[]>>({
            method: 'GET',
            url: '/suppliers',
            params,
        })

        res.payload.content.forEach((p) => {
            if (p.fecha_creacion_empresa) p.fecha_creacion_empresa = new Date(p.fecha_creacion_empresa)
            if (p.fecha_registro_mercantil) p.fecha_registro_mercantil = new Date(p.fecha_registro_mercantil)
            if (p.fecha_registro_rpe) p.fecha_registro_rpe = new Date(p.fecha_registro_rpe)
            if (p.fecha_vencimiento_certificacion_micm)
                p.fecha_vencimiento_certificacion_micm = new Date(p.fecha_vencimiento_certificacion_micm)
            return p
        })
        return res
    }

    /**
     * Get a statistic about women in suppliers.
     * @returns {Promise<TransparenciaMipymesMujeres>} - A promise with the statistic.
     * @example const statistic = await api.suppliers.womenStatistic()
     */
    async womenStatistic(): Promise<TransparenciaMipymesMujeres> {
        return await this.request<TransparenciaMipymesMujeres>({
            method: 'GET',
            url: '/suppliers/women-statistic',
        })
    }

    /**
     * Get a list of all suppliers rubro.
     * @param {GetRubroProveedor} [params] - Parameters to filter the suppliers rubro.
     * @returns {Promise<PaginatedResponse<RubroProveedor[]>>} - A promise with the list of suppliers rubro.
     * @example const rubro = await api.suppliers.rubro()
     * @example const rubro = await api.suppliers.rubro({ rpe: 123 })
     */
    async rubro(params: GetRubroProveedor): Promise<PaginatedResponse<RubroProveedor[]>> {
        return await this.request<PaginatedResponse<RubroProveedor[]>>({
            method: 'GET',
            url: '/suppliers/rubro',
            params,
        })
    }
}
