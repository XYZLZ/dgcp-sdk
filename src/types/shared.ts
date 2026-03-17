export interface PaginationRequest {
    page?: number
    limit?: number
}

export interface ResponseMetadata {
    headers: Record<string, string>
    statusCode: number
    requestId: string
}

export interface CallOptions {
    includeMetadata: boolean
    metadata?: ResponseMetadata
}