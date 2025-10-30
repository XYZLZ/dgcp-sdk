import type { APIDate } from '#types/api/api.js'
import type { PaginationRequest } from '../shared.js'

export interface ApiResponse<T> {
    code: number
    hasError: boolean
    page: number
    limit: number
    totalResults: number
    pages: number
    payload: {
        content: T
        message: string
        errors?: string[]
    }
}

export interface Procesos {
    codigo_proceso: string
    codigo_unidad_compra: number
    unidad_compra: string
    modalidad: string
    tipo_excepcion: string
    titulo: string
    descripcion: string
    estado_proceso: string
    divisa: string
    monto_estimado: number
    fecha_publicacion: Date
    fecha_enmienda: Date
    fecha_fin_recepcion_ofertas: Date
    fecha_apertura_ofertas: Date
    fecha_apertura_ofertas2: Date
    fecha_estimada_adjudicacion: Date
    fecha_suscripcion: Date
    fecha_habilitacion_oferente: Date
    dirigido_mipymes: string
    dirigido_mipymes_mujeres: string
    proceso_lotificado: string
    es_snip: string
    codigo_snip: string
    numero_proveedores_notificados: string
    area_requiriente: string
    url: string
    adquisicion_planeada: string
    justificacion_no_pacc: string
    objeto_proceso: string
    subobjeto_proceso: string
    decreto_presidencial: string
    resolucion_maxima_autoridad: string
    organismo_financiero_externo: string
    marco_decreto_3122: string
    compra_verde: string
    compra_conjunta: string
    duracion_contrato: string
}

export interface GetProcesos extends PaginationRequest {
    proceso?: string
    unidad_compra?: string
    modalidad?: string
    estado?: string
    mipyme?: boolean
    mipyme_mujer?: boolean
    marco_decreto_3122?: boolean
    objeto_proceso?: string
    startdate?: APIDate
    enddate?: APIDate
}

export interface CuotaMipymes {
    año: number
    monto_adjudicado: number
    adjudicado_mipymes: number
    porcentaje_mipymes: number
    adjudicado_mipymes_mujeres: number
    porcentaje_mipymes_mujeres: number
    codigo_unidad_compra: number
    unidad_compra: string
}

export interface CuotaMipymesGlobal {
    año: number
    monto_adjudicado: number
    adjudicado_mipymes: number
    porcentaje_mipymes: number
    adjudicado_mipymes_mujeres: number
    porcentaje_mipymes_mujeres: number
}

export interface ArticulosMipymes {
    total: number
    total_mujeres: number
    subclase: string
    descripcion: string
    adjudicado: number
    adjudicado_mujeres: number
}

export interface ArticulosProcesos {
    codigo_proceso: string
    fecha_publicacion: Date
    familia_unspsc: string
    clase_unspsc: string
    subclase_unspsc: string
    descripcion_articulo: string
    cuenta_presupuestaria: string
    descripcion_usuario: string
    cantidad: number
    unidad_medida: string
    precio_unitario_estimado: number
    precio_total_estimado: number
}

export interface GetArticulosProcesos extends PaginationRequest {
    proceso?: string
    familia?: number
    clase?: number
    subclase?: number
}

export interface DocumentosProcesos {
    nombre_documento: string
    codigo_proceso: string
    tipo_documento: string
    fecha_carga_archivo: string
    url_documento: string
}

export interface Ofertas {
    id_oferta: string
    codigo_proceso: string
    codigo_unidad_compra: number
    unidad_compra: string
    rpe: string
    razon_social: string
    nombre_oferta: string
    valor_oferta: number
    moneda: string
    estado_oferta: string
    estado_evaluacion: string
    tipo_oferta: string
    fecha_creacion: Date
    fecha_entrega_oferta: Date
    fecha_evaluacion: Date | null
}

export interface GetOfertas extends PaginationRequest {
    proceso?: string
    unidad_compra?: string
    rpe?: number
}

export interface Contratos {
    codigo_contrato: string
    codigo_proceso: string
    estado_contrato: string
    estado_adjudicacion: string
    fecha_adjudicacion: Date
    divisa: string
    valor_contratado: number
    metodo_pago: string
    plazo_pago_factura: string
    descripcion: string
    fecha_creacion_contrato: Date
    url_contrato: string
    unidad_compra: string
    codigo_unidad_compra: string
    rpe: string
    razon_social: string
}

export interface GetContratos extends PaginationRequest {
    proceso?: string
    unidad_compra?: string
    rpe?: number
    contrato?: string
}

export interface ArticulosContratos {
    codigo_contrato: string
    codigo_proceso: string
    familia: string
    clase: string
    subclase: string
    cuenta_presupuestaria: string
    descripcion_articulo: string
    descripcion_usuario: string
    unidad_medida: string
    cantidad: number
    precio_unitario: number
    itbis: number
    otros_impuestos: number
    descuentos: number
    costo_total: number
    fecha_creacion_contrato: Date
}

export interface GetArticulosContratos extends PaginationRequest {
    contrato?: string
    familia?: number
    clase?: number
    subclase?: number
    proceso?: string
}

export interface PACC {
    codigo_unidad_compra: number
    unidad_compra: string
    periodo: number
    fecha_publicacion: Date
    version: string
    responsable: string
    correo_responsable: string
    url: string
}

export interface GetPACC extends PaginationRequest {
    unidad_compra?: number
}

export interface Adquisiciones {
    id_adquisicion: string
    codigo_unidad_compra: number
    unidad_compra: string
    version: string
    descripcion: string
    finalidad: string
    fecha_inicio_proceso_compra: Date
    objeto_adquisicion: string
    valor_presupuestado: number
    dirigido_mipymes: string
    dirigido_mipymes_mujeres: string
}

export interface GetAdquisicionesPACC extends PaginationRequest {
    unidad_compra?: number
}

export interface ArticulosPACC {
    id_adquisicion: string
    codigo_unidad_compra: number
    unidad_compra: string
    familia_unspsc: number
    clase_unspsc: number
    subclase_unspsc: number
    descripcion: string
    cantidad: number
    unidad_medida: string
    precio_unitario_estimado: number
    precio_total_estimado: number
}

export interface GetArticulosPACC extends PaginationRequest {
    unidad_compra?: number
    adquisicion?: string
}

export interface Catalogo {
    segmento: string
    descripcion_segmento: string
    familia: string
    descripcion_familia: string
    clase: string
    descripcion_clase: string
    subclase: string
    descripcion_subclase: string
    definicion_subclase: string
    sinonimos_subclase: string
}

export interface GetCatalogo extends PaginationRequest {
    segmento?: string
    familia?: string
    clase?: string
    subclase?: string
}

export interface UnidadCompra {
    codigo_unidad_compra: number
    unidad_compra: string
    acronimo: string
    fecha_registro: string
    tipo: string
    estado: string
    direccion: string
    telefono: string
    correo: string
    correo_notificaciones: string
    codigo_capitulo: string
    implementada: string
}

export interface GetUnidadCompra extends PaginationRequest {
    unidad_compra?: number
}

export interface Proveedor {
    rpe: number
    razon_social: string
    tipo_documento: string
    numero_documento: string
    estado: string
    genero: string
    tipo_persona: string
    forma_juridica: string
    fecha_creacion_empresa: Date | null
    fecha_registro_rpe: Date | null
    numero_registro_mercantil: string
    fecha_registro_mercantil: Date | null
    es_mipyme: string
    certificacion_micm: string
    fecha_vencimiento_certificacion_micm: Date | null
    clasificacion: string
    productor_nacional: string
    clasificacion_empresarial: string
    clasificacion_empresarial_2: string
    telefono_comercial: string | null
    celular_comercial: string | null
    correo_comercial: string | null
    direccion: string | null
    provee: string | null
    contacto: string | null
    posicion_contacto: string | null
    telefono_contacto: string | null
    celular_contacto: string | null
    correo_contacto: string | null
    url_certificacion: string | null
    pais: string | null
    region: string | null
    provincia: string | null
    municipio: string | null
    distrito_municipal: string | null
}

export interface GetProveedores extends PaginationRequest {
    rpe?: number
    numero_documento?: string
    estado?: string
    pais?: string
    region?: string
    provincia?: string
    municipio?: string
}

export interface RubroProveedor {
    rpe: number
    razon_social: string
    familia_unspsc: string
    descripcion: string
}

export interface GetRubroProveedor extends PaginationRequest {
    rpe?: number
    rubro?: string
}

export interface TransparenciaMipymesMujeres {
    mujeres_proveedores: number
    micm_mujeres: number
    mipyme_mujer: number
    procesos_exclusivos_mujeres: number
    mujeres_adjudicadas: number
    contratos_mujeres: number
}
