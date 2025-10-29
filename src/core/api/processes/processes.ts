import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { PaginatedResponse } from '#types/api/api.js'
import type {
    ArticulosMipymes,
    ArticulosProcesos,
    CuotaMipymes,
    CuotaMipymesGlobal,
    DocumentosProcesos,
    GetArticulosProcesos,
    GetProcesos,
    Procesos,
} from '#types/api/index.js'

export class ProcessesAPIResource extends BaseClient {
    public mipymes: {
        articles: () => Promise<ArticulosMipymes[]>
        globalQuota: (year?: number) => Promise<CuotaMipymesGlobal[]>
        purcharseUnitQuota: ({ unitCode, year }: { unitCode?: number; year?: number }) => Promise<CuotaMipymes[]>
    }
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.API,
            baseUrl: BASE_URLS[APIEndpoint.API],
        })

        this.mipymes = {
            articles: this.mipymesArticles.bind(this),
            globalQuota: this.globalQuota.bind(this),
            purcharseUnitQuota: this.purcharseUnitQuota.bind(this),
        }
    }

    /**
     * Get a list of all processes.
     * @param {GetProcesos} [params] - Query parameters.
     * @returns {Promise<PaginatedResponse<Procesos[]>>} - A promise with the list of processes.
     * @example const processes = await api.processes.list()
     * @example const processes = await api.processes.list({ unidad_compra: 123 })
     */
    public async list(params?: GetProcesos): Promise<PaginatedResponse<Procesos[]>> {
        const res = await this.request<PaginatedResponse<Procesos[]>>({ method: 'GET', url: '/procesos', params })
        res.payload.content.forEach((p) => {
            p.fecha_apertura_ofertas = new Date(p.fecha_apertura_ofertas)
            p.fecha_apertura_ofertas2 = new Date(p.fecha_apertura_ofertas2)
            p.fecha_enmienda = new Date(p.fecha_enmienda)
            p.fecha_habilitacion_oferente = new Date(p.fecha_habilitacion_oferente)
            p.fecha_estimada_adjudicacion = new Date(p.fecha_estimada_adjudicacion)
            p.fecha_fin_recepcion_ofertas = new Date(p.fecha_fin_recepcion_ofertas)
            p.fecha_publicacion = new Date(p.fecha_publicacion)
            p.fecha_suscripcion = new Date(p.fecha_suscripcion)
            return p
        })
        return res
    }

    /**
     * Get a grouped list of processes by unit code.
     * @param {number} unitCode - Unit code.
     * @returns {Promise<Procesos>} - A promise with the grouped list of processes.
     * @example const processes = await api.processes.group(123)
     */
    public async group(unitCode: number): Promise<Procesos> {
        const res = await this.request<Procesos>({
            method: 'GET',
            url: `/procesos/agrupados`,
            params: { unidad_compra: unitCode },
        })

        res.fecha_apertura_ofertas = new Date(res.fecha_apertura_ofertas)
        res.fecha_apertura_ofertas2 = new Date(res.fecha_apertura_ofertas2)
        res.fecha_enmienda = new Date(res.fecha_enmienda)
        res.fecha_habilitacion_oferente = new Date(res.fecha_habilitacion_oferente)
        res.fecha_estimada_adjudicacion = new Date(res.fecha_estimada_adjudicacion)
        res.fecha_fin_recepcion_ofertas = new Date(res.fecha_fin_recepcion_ofertas)
        res.fecha_publicacion = new Date(res.fecha_publicacion)
        res.fecha_suscripcion = new Date(res.fecha_suscripcion)
        return res
    }

    /**
     * Get a list of articles related to a process.
     * @param {GetArticulosProcesos} params - Parameters to filter the articles.
     * @returns {Promise<PaginatedResponse<ArticulosProcesos[]>>} - A promise with the list of articles.
     * @example const articles = await api.processes.articles({ proceso: 123})
     */
    public async articles(params?: GetArticulosProcesos): Promise<PaginatedResponse<ArticulosProcesos[]>> {
        const res = await this.request<PaginatedResponse<ArticulosProcesos[]>>({
            method: 'GET',
            url: '/procesos/articulos',
            params,
        })

        res.payload.content.forEach((a) => {
            a.fecha_publicacion = new Date(a.fecha_publicacion)
        })
        return res
    }

    /**
     * Get a list of documents related to a process.
     * @param {string} processCode - Process code.
     * @returns {Promise<DocumentosProcesos[]>} - A promise with the list of documents.
     * @example const documents = await api.processes.documents('123')
     */
    public async documents(processCode: string): Promise<DocumentosProcesos[]> {
        return await this.request<DocumentosProcesos[]>({
            method: 'GET',
            url: `/procesos/documentos`,
            params: { proceso: processCode },
        })
    }

    /**
     * Get a list of global quotas for a given year.
     * If year is not provided, it will return the list for the current year.
     * @param {number} year - Year to get the global quotas for.
     * @returns {Promise<CuotaMipymesGlobal[]>} - A promise with the list of global quotas.
     * @example const globalQuotas = await api.processes.globalQuota(2022)
     */
    public async globalQuota(year?: number): Promise<CuotaMipymesGlobal[]> {
        if (year) {
            return await this.request<CuotaMipymesGlobal[]>({
                method: 'GET',
                url: `/procesos/mipymes/cuota_global`,
                params: { anio: year },
            })
        }
        return await this.request<CuotaMipymesGlobal[]>({
            method: 'GET',
            url: '/procesos/mipymes/cuota_global',
        })
    }

    /**
     * Get a list of unit quotas for a given unit code and year.
     * If unit code or year is not provided, it will return the list for the current year and all units.
     * @param {Object} options - Options to get the unit quotas.
     * @param {number} [options.unitCode] - Unit code to get the unit quotas for.
     * @param {number} [options.year] - Year to get the unit quotas for.
     * @returns {Promise<CuotaMipymes[]>} - A promise with the list of unit quotas.
     * @example const unitQuotas = await api.processes.purcharseUnitQuota({ unitCode: 123, year: 2022 })
     */
    public async purcharseUnitQuota({ unitCode, year }: { unitCode?: number; year?: number }): Promise<CuotaMipymes[]> {
        return await this.request<CuotaMipymes[]>({
            method: 'GET',
            url: `/procesos/cuota_unidad_compra`,
            params: { unidad_compra: unitCode, año: year },
        })
    }

    /**
     * Get a list of articles for the mipymes.
     * @returns {Promise<ArticulosMipymes[]>} - A promise with the list of articles.
     * @example const articles = await api.processes.mipymesArticles()
     */
    public async mipymesArticles(): Promise<ArticulosMipymes[]> {
        return await this.request<ArticulosMipymes[]>({
            method: 'GET',
            url: `/procesos/mipymes/articulos`,
        })
    }
}
