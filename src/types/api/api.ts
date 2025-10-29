export interface ApiResponse<T> {
    code: number
    hasError: boolean
    payload: {
        content: T
        message: string
        errors?: string[]
    }
}

export interface PaginationRequest {
    page?: number
    limit?: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    page: number
    limit: number
    totalResults: number
    pages: number
}

export type APIDate = `${number}-${number}-${number}`;
