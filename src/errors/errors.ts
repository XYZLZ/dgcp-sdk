export class SDKError extends Error {
    public message: string
    public code: string
    public statusCode: number
    public details?: Record<string, any>
    constructor(code: string, message: string, statusCode: number, details: Record<string, any> = {}) {
        super(message)
        this.name = 'SDKError'
        this.message = message
        this.code = code
        this.statusCode = statusCode
        this.details = details
        Object.setPrototypeOf(this, SDKError.prototype)
    }
}

// client errors
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
export const RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR'
export const VALIDATION_ERROR = 'VALIDATION_ERROR'

// api errors
export const API_ERROR = 'API_ERROR'
export const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR'
export const CONFLICT_ERROR = 'CONFLICT_ERROR'
export const UNPROCESSABLE_ENTITY_ERROR = 'UNPROCESSABLE_ENTITY_ERROR'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'

// network errors
export const NETWORK_ERROR = 'NETWORK_ERROR'

export function AuthenticationError(message: string, cause: Error) {
    if ('response' in cause && typeof (cause as any).response === 'object' && (cause as any).response?.data)
        return new SDKError(AUTHENTICATION_ERROR, 'Invalid API key', 401, { message, cause: (cause as any).response.data })
    return new SDKError(AUTHENTICATION_ERROR, 'Invalid API key', 401, { message, cause: cause.message })
}

export function RateLimitError(message: string, cause: Error) {
    return new SDKError(RATE_LIMIT_ERROR, 'Rate limit exceeded', 429, { message, cause: cause.message })
}

export function ValidationError(message: string, cause: Error) {
    return new SDKError(VALIDATION_ERROR, 'Validation error', 400, { message, cause: cause.message })
}

export function NetworkError(message: string, cause: Error) {
    return new SDKError(NETWORK_ERROR, 'Network request error', 0, { message, cause: cause.message })
}

export function APIError(message: string, cause: Error) {
    return new SDKError(API_ERROR, 'API request failed', 500, { message, cause: cause.message })
}

export function NotFoundError(message: string, cause: Error) {
    return new SDKError(NOT_FOUND_ERROR, 'Resource not found', 404, { message, cause: cause.message })
}

export function ConflictError(message: string, cause: Error) {
    return new SDKError(CONFLICT_ERROR, 'Conflict error', 409, { message, cause: cause.message })
}

export function UnprocessableEntityError(message: string, cause: Error) {
    return new SDKError(UNPROCESSABLE_ENTITY_ERROR, 'Unprocessable entity error', 422, {
        message,
        cause: cause.message,
    })
}

export function InternalServerError(message: string, cause: Error) {
    return new SDKError(INTERNAL_SERVER_ERROR, 'Internal server error', 500, { message, cause: cause.message })
}
