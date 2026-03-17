import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ReadStream } from 'node:fs';

declare enum APIEndpoint {
    API = "api",
    MAHORAGA = "mahoraga"
}
interface SDKConfig {
    apiKey?: string;
    timeout?: number;
    retryConfig?: RetryConfig;
    headers?: Record<string, string>;
    version?: string;
    debug?: boolean;
}
interface InternalSDKConfig extends SDKConfig {
    endpoint: APIEndpoint;
    baseUrl: string;
}
interface RetryConfig {
    maxRetries: number;
    retryDelay: number;
    retryableStatuses: number[];
}

declare class BaseClient {
    protected axios: AxiosInstance;
    protected config: InternalSDKConfig;
    protected endpoint: APIEndpoint;
    constructor(config: InternalSDKConfig);
    private setupInterceptors;
    protected request<T>(config: AxiosRequestConfig, setRequestInfo: boolean): Promise<AxiosResponse<T> | T>;
    getEndpoint(): APIEndpoint;
    getBaseUrl(): string;
}

interface ApiResponse<T> {
    code: number;
    hasError: boolean;
    payload: {
        content: T;
        message: string;
        errors?: string[];
    };
}
interface PaginatedResponse<T> extends ApiResponse<T> {
    page: number;
    limit: number;
    totalResults: number;
    pages: number;
}
type APIDate = `${number}-${number}-${number}`;

interface PaginationRequest {
    page?: number;
    limit?: number;
}

interface Procesos {
    codigo_proceso: string;
    codigo_unidad_compra: number;
    unidad_compra: string;
    modalidad: string;
    tipo_excepcion: string;
    titulo: string;
    descripcion: string;
    estado_proceso: string;
    divisa: string;
    monto_estimado: number;
    fecha_publicacion: Date;
    fecha_enmienda: Date;
    fecha_fin_recepcion_ofertas: Date;
    fecha_apertura_ofertas: Date;
    fecha_apertura_ofertas2: Date;
    fecha_estimada_adjudicacion: Date;
    fecha_suscripcion: Date;
    fecha_habilitacion_oferente: Date;
    dirigido_mipymes: string;
    dirigido_mipymes_mujeres: string;
    proceso_lotificado: string;
    es_snip: string;
    codigo_snip: string;
    numero_proveedores_notificados: string;
    area_requiriente: string;
    url: string;
    adquisicion_planeada: string;
    justificacion_no_pacc: string;
    objeto_proceso: string;
    subobjeto_proceso: string;
    decreto_presidencial: string;
    resolucion_maxima_autoridad: string;
    organismo_financiero_externo: string;
    marco_decreto_3122: string;
    compra_verde: string;
    compra_conjunta: string;
    duracion_contrato: string;
}
interface GetProcesos extends PaginationRequest {
    proceso?: string;
    unidad_compra?: string;
    modalidad?: string;
    estado?: string;
    mipyme?: boolean;
    mipyme_mujer?: boolean;
    marco_decreto_3122?: boolean;
    objeto_proceso?: string;
    startdate?: APIDate;
    enddate?: APIDate;
}
interface CuotaMipymes {
    año: number;
    monto_adjudicado: number;
    adjudicado_mipymes: number;
    porcentaje_mipymes: number;
    adjudicado_mipymes_mujeres: number;
    porcentaje_mipymes_mujeres: number;
    codigo_unidad_compra: number;
    unidad_compra: string;
}
interface CuotaMipymesGlobal {
    año: number;
    monto_adjudicado: number;
    adjudicado_mipymes: number;
    porcentaje_mipymes: number;
    adjudicado_mipymes_mujeres: number;
    porcentaje_mipymes_mujeres: number;
}
interface ArticulosMipymes {
    total: number;
    total_mujeres: number;
    subclase: string;
    descripcion: string;
    adjudicado: number;
    adjudicado_mujeres: number;
}
interface ArticulosProcesos {
    codigo_proceso: string;
    fecha_publicacion: Date;
    familia_unspsc: string;
    clase_unspsc: string;
    subclase_unspsc: string;
    descripcion_articulo: string;
    cuenta_presupuestaria: string;
    descripcion_usuario: string;
    cantidad: number;
    unidad_medida: string;
    precio_unitario_estimado: number;
    precio_total_estimado: number;
}
interface GetArticulosProcesos extends PaginationRequest {
    proceso?: string;
    familia?: number;
    clase?: number;
    subclase?: number;
}
interface DocumentosProcesos {
    nombre_documento: string;
    codigo_proceso: string;
    tipo_documento: string;
    fecha_carga_archivo: string;
    url_documento: string;
}
interface Ofertas {
    id_oferta: string;
    codigo_proceso: string;
    codigo_unidad_compra: number;
    unidad_compra: string;
    rpe: string;
    razon_social: string;
    nombre_oferta: string;
    valor_oferta: number;
    moneda: string;
    estado_oferta: string;
    estado_evaluacion: string;
    tipo_oferta: string;
    fecha_creacion: Date;
    fecha_entrega_oferta: Date;
    fecha_evaluacion: Date | null;
}
interface GetOfertas extends PaginationRequest {
    proceso?: string;
    unidad_compra?: string;
    rpe?: number;
}
interface Contratos {
    codigo_contrato: string;
    codigo_proceso: string;
    estado_contrato: string;
    estado_adjudicacion: string;
    fecha_adjudicacion: Date;
    divisa: string;
    valor_contratado: number;
    metodo_pago: string;
    plazo_pago_factura: string;
    descripcion: string;
    fecha_creacion_contrato: Date;
    url_contrato: string;
    unidad_compra: string;
    codigo_unidad_compra: string;
    rpe: string;
    razon_social: string;
}
interface GetContratos extends PaginationRequest {
    proceso?: string;
    unidad_compra?: string;
    rpe?: number;
    contrato?: string;
}
interface ArticulosContratos {
    codigo_contrato: string;
    codigo_proceso: string;
    familia: string;
    clase: string;
    subclase: string;
    cuenta_presupuestaria: string;
    descripcion_articulo: string;
    descripcion_usuario: string;
    unidad_medida: string;
    cantidad: number;
    precio_unitario: number;
    itbis: number;
    otros_impuestos: number;
    descuentos: number;
    costo_total: number;
    fecha_creacion_contrato: Date;
}
interface GetArticulosContratos extends PaginationRequest {
    contrato?: string;
    familia?: number;
    clase?: number;
    subclase?: number;
    proceso?: string;
}
interface PACC {
    codigo_unidad_compra: number;
    unidad_compra: string;
    periodo: number;
    fecha_publicacion: Date;
    version: string;
    responsable: string;
    correo_responsable: string;
    url: string;
}
interface GetPACC extends PaginationRequest {
    unidad_compra?: number;
}
interface Adquisiciones {
    id_adquisicion: string;
    codigo_unidad_compra: number;
    unidad_compra: string;
    version: string;
    descripcion: string;
    finalidad: string;
    fecha_inicio_proceso_compra: Date;
    objeto_adquisicion: string;
    valor_presupuestado: number;
    dirigido_mipymes: string;
    dirigido_mipymes_mujeres: string;
}
interface GetAdquisicionesPACC extends PaginationRequest {
    unidad_compra?: number;
}
interface ArticulosPACC {
    id_adquisicion: string;
    codigo_unidad_compra: number;
    unidad_compra: string;
    familia_unspsc: number;
    clase_unspsc: number;
    subclase_unspsc: number;
    descripcion: string;
    cantidad: number;
    unidad_medida: string;
    precio_unitario_estimado: number;
    precio_total_estimado: number;
}
interface GetArticulosPACC extends PaginationRequest {
    unidad_compra?: number;
    adquisicion?: string;
}
interface Catalogo {
    segmento: string;
    descripcion_segmento: string;
    familia: string;
    descripcion_familia: string;
    clase: string;
    descripcion_clase: string;
    subclase: string;
    descripcion_subclase: string;
    definicion_subclase: string;
    sinonimos_subclase: string;
}
interface GetCatalogo extends PaginationRequest {
    segmento?: string;
    familia?: string;
    clase?: string;
    subclase?: string;
}
interface UnidadCompra {
    codigo_unidad_compra: number;
    unidad_compra: string;
    acronimo: string;
    fecha_registro: string;
    tipo: string;
    estado: string;
    direccion: string;
    telefono: string;
    correo: string;
    correo_notificaciones: string;
    codigo_capitulo: string;
    implementada: string;
}
interface GetUnidadCompra extends PaginationRequest {
    unidad_compra?: number;
}
interface Proveedor {
    rpe: number;
    razon_social: string;
    tipo_documento: string;
    numero_documento: string;
    estado: string;
    genero: string;
    tipo_persona: string;
    forma_juridica: string;
    fecha_creacion_empresa: Date | null;
    fecha_registro_rpe: Date | null;
    numero_registro_mercantil: string;
    fecha_registro_mercantil: Date | null;
    es_mipyme: string;
    certificacion_micm: string;
    fecha_vencimiento_certificacion_micm: Date | null;
    clasificacion: string;
    productor_nacional: string;
    clasificacion_empresarial: string;
    clasificacion_empresarial_2: string;
    telefono_comercial: string | null;
    celular_comercial: string | null;
    correo_comercial: string | null;
    direccion: string | null;
    provee: string | null;
    contacto: string | null;
    posicion_contacto: string | null;
    telefono_contacto: string | null;
    celular_contacto: string | null;
    correo_contacto: string | null;
    url_certificacion: string | null;
    pais: string | null;
    region: string | null;
    provincia: string | null;
    municipio: string | null;
    distrito_municipal: string | null;
}
interface GetProveedores extends PaginationRequest {
    rpe?: number;
    numero_documento?: string;
    estado?: string;
    pais?: string;
    region?: string;
    provincia?: string;
    municipio?: string;
}
interface RubroProveedor {
    rpe: number;
    razon_social: string;
    familia_unspsc: string;
    descripcion: string;
}
interface GetRubroProveedor extends PaginationRequest {
    rpe?: number;
    rubro?: string;
}
interface TransparenciaMipymesMujeres {
    mujeres_proveedores: number;
    micm_mujeres: number;
    mipyme_mujer: number;
    procesos_exclusivos_mujeres: number;
    mujeres_adjudicadas: number;
    contratos_mujeres: number;
}

declare class ContractsAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of contracts.
     * @param {GetContratos} [params] - Parameters to filter the contracts.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Contratos[]>> | PaginatedResponse<Contratos[]>>} - A promise with the list of contracts.
     * @example const contracts = await api.contracts.list()
     * @example const contracts = await api.contracts.list({ unidad_compra: 123 })
     */
    list(params?: GetContratos, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<Contratos[]>> | PaginatedResponse<Contratos[]>>;
    /**
     * Get a list of articles related to a contract.
     * @param {GetArticulosContratos} [params] - Parameters to filter the articles.
     * @returns {Promise<PaginatedResponse<ArticulosContratos[]>>} - A promise with the list of articles.
     * @example const articles = await api.contracts.articles()
     * @example const articles = await api.contracts.articles({ contrato: 123 })
     */
    articles(params?: GetArticulosContratos, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<ArticulosContratos[]>> | PaginatedResponse<ArticulosContratos[]>>;
}

declare class OffersAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of all offers.
     * @param {GetOfertas} [params] - Parameters to filter the offers.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Ofertas[]>> | PaginatedResponse<Ofertas[]>>} - A promise with the list of offers.
     * @example const offers = await api.offers.list()
     * @example const offers = await api.offers.list({ proceso: 123 })
     */
    list(params?: GetOfertas, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<Ofertas[]>> | PaginatedResponse<Ofertas[]>>;
}

declare class ProcessesAPIResource extends BaseClient {
    mipymes: {
        articles: (withResponseMetadata?: boolean) => Promise<AxiosResponse<ArticulosMipymes[]> | ArticulosMipymes[]>;
        globalQuota: (year?: number, withResponseMetadata?: boolean) => Promise<AxiosResponse<CuotaMipymesGlobal[]> | CuotaMipymesGlobal[]>;
        purcharseUnitQuota: ({ unitCode, year }: {
            unitCode?: number;
            year?: number;
        }, withResponseMetadata?: boolean) => Promise<AxiosResponse<CuotaMipymes[]> | CuotaMipymes[]>;
    };
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of all processes.
     * @param {GetProcesos} [params] - Query parameters.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Procesos[]>> | PaginatedResponse<Procesos[]>>} - A promise with the list of processes.
     * @example const processes = await api.processes.list()
     * @example const processes = await api.processes.list({ unidad_compra: 123 })
     */
    list(params?: GetProcesos, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<Procesos[]>> | PaginatedResponse<Procesos[]>>;
    /**
     * Get a grouped list of processes by unit code.
     * @param {number} unitCode - Unit code.
     * @returns {Promise<Procesos>} - A promise with the grouped list of processes.
     * @example const processes = await api.processes.group(123)
     */
    group(unitCode: number, withResponseMetadata?: boolean): Promise<AxiosResponse<Procesos> | Procesos>;
    /**
     * Get a list of articles related to a process.
     * @param {GetArticulosProcesos} params - Parameters to filter the articles.
     * @returns {Promise<AxiosResponse<PaginatedResponse<ArticulosProcesos[]>> | PaginatedResponse<ArticulosProcesos[]>>} - A promise with the list of articles.
     * @example const articles = await api.processes.articles({ proceso: 123})
     */
    articles(params?: GetArticulosProcesos, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<ArticulosProcesos[]>> | PaginatedResponse<ArticulosProcesos[]>>;
    /**
     * Get a list of documents related to a process.
     * @param {string} processCode - Process code.
     * @returns {Promise<AxiosResponse<DocumentosProcesos[]> | DocumentosProcesos[]>} - A promise with the list of documents.
     * @example const documents = await api.processes.documents('123')
     */
    documents(processCode: string, withResponseMetadata?: boolean): Promise<AxiosResponse<DocumentosProcesos[]> | DocumentosProcesos[]>;
    /**
     * Get a list of global quotas for a given year.
     * If year is not provided, it will return the list for the current year.
     * @param {number} year - Year to get the global quotas for.
     * @returns {Promise<AxiosResponse<CuotaMipymesGlobal[]> | CuotaMipymesGlobal[]>} - A promise with the list of global quotas.
     * @example const globalQuotas = await api.processes.globalQuota(2022)
     */
    globalQuota(year?: number, withResponseMetadata?: boolean): Promise<AxiosResponse<CuotaMipymesGlobal[]> | CuotaMipymesGlobal[]>;
    /**
     * Get a list of unit quotas for a given unit code and year.
     * If unit code or year is not provided, it will return the list for the current year and all units.
     * @param {Object} options - Options to get the unit quotas.
     * @param {number} [options.unitCode] - Unit code to get the unit quotas for.
     * @param {number} [options.year] - Year to get the unit quotas for.
     * @returns {Promise<CuotaMipymes[]>} - A promise with the list of unit quotas.
     * @example const unitQuotas = await api.processes.purcharseUnitQuota({ unitCode: 123, year: 2022 })
     */
    purcharseUnitQuota({ unitCode, year }: {
        unitCode?: number;
        year?: number;
    }, withResponseMetadata?: boolean): Promise<AxiosResponse<CuotaMipymes[]> | CuotaMipymes[]>;
    /**
     * Get a list of articles for the mipymes.
     * @returns {Promise<ArticulosMipymes[]>} - A promise with the list of articles.
     * @example const articles = await api.processes.mipymesArticles()
     */
    mipymesArticles(withResponseMetadata?: boolean): Promise<AxiosResponse<ArticulosMipymes[]> | ArticulosMipymes[]>;
}

declare class CatalogAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of all catalogs.
     * @param {GetCatalogo} [params] - Parameters to filter the catalogs.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Catalogo[]>> | PaginatedResponse<Catalogo[]>>} - A promise with the list of catalogs.
     * @example const catalogs = await api.catalog.list()
     * @example const catalogs = await api.catalog.list({segmento: '123'})
     */
    list(params?: GetCatalogo, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<Catalogo[]>> | PaginatedResponse<Catalogo[]>>;
}

declare class PACCResource extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of PACCs.
     * @param {GetPACC} [params] - Parameters to filter the PACCs.
     * @returns {Promise<AxiosResponse<PaginatedResponse<PACC[]>> | PaginatedResponse<PACC[]>>} - A promise with the list of PACCs.
     * @example const paccs = await api.pacc.list({ unidad_compra: 123 })
     */
    list(params?: GetPACC, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<PACC[]>> | PaginatedResponse<PACC[]>>;
    /**
     * Get a list of articles related to a PACC.
     * @param {GetArticulosPACC} [params] - Parameters to filter the articles.
     * @returns {Promise<PaginatedResponse<ArticulosPACC[]>>} - A promise with the list of articles.
     * @example const articles = await api.pacc.articles({ unidad_compra: 123 })
     */
    articles(params?: GetArticulosPACC, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<ArticulosPACC[]>> | PaginatedResponse<ArticulosPACC[]>>;
    /**
     * Get a list of adquisitions related to a PACC.
     * @param {GetAdquisicionesPACC} [params] - Parameters to filter the adquisitions.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Adquisiciones[]>> | PaginatedResponse<Adquisiciones[]>>} - A promise with the list of adquisitions.
     * @example const adquisitions = await api.pacc.acquirements({ unidad_compra: 123 })
     */
    acquirements(params?: GetAdquisicionesPACC, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<Adquisiciones[]>> | PaginatedResponse<Adquisiciones[]>>;
}

declare class PurcharseUnitsAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of purchase units.
     * @param {GetUnidadCompra} [params] - Parameters to filter the purchase units.
     * @returns {Promise<AxiosResponse<PaginatedResponse<UnidadCompra[]>> | PaginatedResponse<UnidadCompra[]>>} - A promise with the list of purchase units.
     * @example const purchaseUnits = await api.purcharseUnits.list()
     * @example const purchaseUnits = await api.purcharseUnits.list({ unidad_compra: 123 })
     **/
    list(params?: GetUnidadCompra, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<UnidadCompra[]>> | PaginatedResponse<UnidadCompra[]>>;
}

declare class SuppliersAPIResource extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of all suppliers.
     * @param {GetProveedores} [params] - Parameters to filter the suppliers.
     * @returns {Promise<AxiosResponse<PaginatedResponse<Proveedor[]>> | PaginatedResponse<Proveedor[]>>} - A promise with the list of suppliers.
     * @example const suppliers = await api.suppliers.list()
     * @example const suppliers = await api.suppliers.list({ rpe: 123 })
     */
    list(params?: GetProveedores, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<Proveedor[]>> | PaginatedResponse<Proveedor[]>>;
    /**
     * Get a statistic about women in suppliers.
     * @returns {Promise<AxiosResponse<TransparenciaMipymesMujeres> | TransparenciaMipymesMujeres>} - A promise with the statistic.
     * @example const statistic = await api.suppliers.womenStatistic()
     */
    womenStatistic(withResponseMetadata?: boolean): Promise<AxiosResponse<TransparenciaMipymesMujeres> | TransparenciaMipymesMujeres>;
    /**
     * Get a list of all suppliers rubro.
     * @param {GetRubroProveedor} [params] - Parameters to filter the suppliers rubro.
     * @returns {Promise<PaginatedResponse<RubroProveedor[]>>} - A promise with the list of suppliers rubro.
     * @example const rubro = await api.suppliers.rubro()
     * @example const rubro = await api.suppliers.rubro({ rpe: 123 })
     */
    rubro(params: GetRubroProveedor, withResponseMetadata?: boolean): Promise<AxiosResponse<PaginatedResponse<RubroProveedor[]>> | PaginatedResponse<RubroProveedor[]>>;
}

interface MahoragaResponse<T> {
    code: number;
    hasError: boolean;
    payload: {
        content: T;
        message: string;
        errors?: string[];
    };
}
interface MahoragaPaginatedResponse<T> extends MahoragaResponse<T> {
    page: number;
    limit: number;
    totalResults: number;
    pages: number;
}

interface MahoFileInfo {
    file_id: string;
    download_url: string;
    file_name: string;
    file_type: string;
    file_size: number;
    created_at: Date;
}
interface MahoUser {
    id: string;
    username?: string;
}
interface MahoLogin {
    username: string;
    password: string;
}
interface LoginServicePayload {
    user: MahoUser;
    accessToken: string;
    refreshToken: string;
}
interface App {
    id: string;
    name?: string;
    description?: string;
    tenant_id?: string;
    created_at?: Date;
    updated_at?: Date;
}
interface AppSettings {
    id?: number;
    app_id?: string;
    max_storage_mb?: number;
    used_storage_mb?: number;
    max_file_size_mb?: number;
    state?: string;
    created_at?: Date;
    updated_at?: Date;
}

declare class Auth extends BaseClient {
    constructor(config: InternalSDKConfig);
    login(credentials: MahoLogin, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<LoginServicePayload>> | MahoragaResponse<LoginServicePayload>>;
}

type MahoFile = {
    file: ReadStream | Buffer | ArrayBuffer;
    name: string;
};
declare class Files extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Get a list of all files.
     * @param {PaginationRequest} [params] - Parameters to filter the files.
     * @returns {Promise<AxiosResponse<MahoragaPaginatedResponse<MahoFileInfo[] | null>> | MahoragaPaginatedResponse<MahoFileInfo[] | null>} - A promise with the list of files.
     * @example const files = await api.files.list()
     * @example const files = await api.files.list({ page: 1, limit: 10 })
     */
    list(params: PaginationRequest, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaPaginatedResponse<MahoFileInfo[] | null>> | MahoragaPaginatedResponse<MahoFileInfo[] | null>>;
    /**
     * Upload files to the Mahoraga storage.
     * @param {MahoFile[]} files - List of files to be uploaded.
     * @returns {Promise<AxiosResponse<MahoragaResponse<MahoFileInfo>> | MahoragaResponse<MahoFileInfo>>} - A promise with the list of uploaded files.
     * @throws ValidationError - If no files are provided or if any of the files have invalid types.
     * @throws SDKError - If any of the files have invalid types.
     * @example const files = await api.files.upload([{ file: new ReadStream('file.txt'), name: 'file.txt' }])
     */
    upload(files: MahoFile[], withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<MahoFileInfo[]>> | MahoragaResponse<MahoFileInfo[]>>;
    /**
     * Deletes a file from Mahoraga.
     * @param {string} fileId - The id of the file to be deleted.
     * @returns {Promise<AxiosResponse<MahoragaResponse<string>> | MahoragaResponse<string>>} - A promise with the response from the server.
     * @throws SDKError - If the file does not exist or if any error occurs during the deletion process.
     * @example const response = await api.files.delete('1234567890abcdef')
     */
    delete(fileId: string, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<string>> | MahoragaResponse<string>>;
    /**
     * Downloads a file from Mahoraga.
     * @param {string} fileId - The id of the file to be downloaded.
     * @returns {Promise<AxiosResponse<Buffer> | Blob>} - A promise with the blob of the downloaded file.
     * @throws SDKError - If the file does not exist or if any error occurs during the download process.
     * @example const blob = await api.files.download('1234567890abcdef')
     */
    download(fileId: string, withResponseMetadata?: boolean): Promise<AxiosResponse<Buffer> | Buffer>;
}

declare class Apps extends BaseClient {
    constructor(config: InternalSDKConfig);
    /**
     * Retrieves a list of apps for a given user.
     * @param {string} userId - The id of the user.
     * @returns {Promise<AxiosResponse<MahoragaResponse<App[]>>> | MahoragaResponse<App[]>>} - A promise with the list of apps.
     * @example const response = await api.apps.list('1234567890abcdef')
     */
    list(userId: string, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<App[]>> | MahoragaResponse<App[]>>;
    /**
     * Creates a new app.
     * @param {Omit<App, 'id' | 'created_at' | 'updated_at'>} app - The app to be created.
     * @returns {Promise<AxiosResponse<MahoragaResponse<App>> |MahoragaResponse<App>>} - A promise with the created app.
     * @example const response = await api.apps.create({ name: 'My App', description: 'This is my app' })
     */
    create(app: Omit<App, 'id' | 'created_at' | 'updated_at'>, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<App>> | MahoragaResponse<App>>;
    /**
     * Updates an existing app.
     * @param {App} app - The app to be updated.
     * @returns {Promise<AxiosResponse<MahoragaResponse<App>> | MahoragaResponse<App>>} - A promise with the updated app.
     * @example const response = await api.apps.update({ id: '1234567890abcdef', name: 'My Updated App' })
     */
    update(app: App, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<App>> | MahoragaResponse<App>>;
    /**
     * Retrieves the settings for an app.
     * @param {string} appId - The id of the app.
     * @returns {Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>>} - A promise with the app settings.
     * @example const response = await api.apps.getSettings('1234567890abcdef')
     */
    getSettings(appId: string, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>>;
    /**
     * Creates new settings for an app.
     * @param {Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>} settings - The settings to be created.
     * @returns {Promise<AxiosResponse<MahoragaResponse<AppSettings>> |MahoragaResponse<AppSettings>>} - A promise with the created settings.
     * @example const response = await api.apps.createSettings({ app_id: '1234567890abcdef', max_storage_mb: 1000 })
     */
    createSettings(settings: Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>>;
    /**
     * Updates the settings for an app.
     * @param {AppSettings} settings - The settings to be updated.
     * @returns {Promise<MahoragaResponse<AppSettings>>} - A promise with the updated settings.
     * @example const response = await api.apps.updateSettings({ id: '1234567890abcdef', max_storage_mb: 2000 })
     */
    updateSettings(settings: AppSettings, withResponseMetadata?: boolean): Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>>;
}

declare class SDKError extends Error {
    message: string;
    code: string;
    statusCode: number;
    details?: Record<string, any>;
    constructor(code: string, message: string, statusCode: number, details?: Record<string, any>);
}
declare const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
declare const RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR";
declare const VALIDATION_ERROR = "VALIDATION_ERROR";
declare const API_ERROR = "API_ERROR";
declare const NOT_FOUND_ERROR = "NOT_FOUND_ERROR";
declare const CONFLICT_ERROR = "CONFLICT_ERROR";
declare const UNPROCESSABLE_ENTITY_ERROR = "UNPROCESSABLE_ENTITY_ERROR";
declare const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
declare const NETWORK_ERROR = "NETWORK_ERROR";
declare function AuthenticationError(message: string, cause: Error): SDKError;
declare function RateLimitError(message: string, cause: Error): SDKError;
declare function ValidationError(message: string, cause: Error): SDKError;
declare function NetworkError(message: string, cause: Error): SDKError;
declare function APIError(message: string, cause: Error): SDKError;
declare function NotFoundError(message: string, cause: Error): SDKError;
declare function ConflictError(message: string, cause: Error): SDKError;
declare function UnprocessableEntityError(message: string, cause: Error): SDKError;
declare function InternalServerError(message: string, cause: Error): SDKError;
declare function ApiKeyRequiredError(message: string, cause: Error): SDKError;

type ApiInstances = {
    processes: ProcessesAPIResource;
    offers: OffersAPIResource;
    contracts: ContractsAPIResource;
    catalog: CatalogAPIResource;
    pacc: PACCResource;
    purcharseUnits: PurcharseUnitsAPIResource;
    suppliers: SuppliersAPIResource;
};
declare class DGCP {
    api: ApiInstances;
    private config;
    constructor(options?: Partial<Omit<SDKConfig, 'apiKey'>>);
    updateConfig(config: Partial<Omit<SDKConfig, 'apiKey'>>): void;
}
declare class Mahoraga {
    auth: Auth;
    files: Files;
    apps: Apps;
    private config;
    constructor(apiKey: string, options?: Partial<Omit<SDKConfig, 'apiKey'>>);
    updateConfig(config: Partial<Omit<SDKConfig, 'apiKey'>>): void;
}
declare function dgcp(config?: Omit<SDKConfig, 'apiKey' | 'baseUrl'>): DGCP;
declare function mahoraga(apiKey: string, config?: Omit<SDKConfig, 'apiKey' | 'baseUrl'>): Mahoraga;

export { type APIDate, APIError, API_ERROR, AUTHENTICATION_ERROR, ApiKeyRequiredError, type ApiResponse, AuthenticationError, CONFLICT_ERROR, ConflictError, INTERNAL_SERVER_ERROR, InternalServerError, type MahoragaPaginatedResponse, type MahoragaResponse, NETWORK_ERROR, NOT_FOUND_ERROR, NetworkError, NotFoundError, type PaginatedResponse, RATE_LIMIT_ERROR, RateLimitError, SDKError, UNPROCESSABLE_ENTITY_ERROR, UnprocessableEntityError, VALIDATION_ERROR, ValidationError, dgcp, mahoraga };
