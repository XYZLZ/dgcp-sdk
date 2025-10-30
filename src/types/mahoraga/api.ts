export interface MahoragaResponse<T> {
    code: number
    hasError: boolean
    payload: {
        content: T
        message: string
        errors?: string[]
    }
}
export interface MahoragaPaginatedResponse<T> extends MahoragaResponse<T> {
    page: number
    limit: number
    totalResults: number
    pages: number
}