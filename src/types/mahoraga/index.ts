export interface MahoFile {
    id: number
    file_id: string
    app_id: string
    file_name: string
    type: string
    file_size: number
    deleted: boolean
    content: string
    created_at: string
    updated_at: string
}

export interface MahoFileInfo {
    file_id: string
    download_url: string
    file_name: string
    file_type: string
    file_size: number
    created_at: Date
}

export interface MahoUser {
    id: string
    username?: string
}

export interface MahoLogin {
    username: string
    password: string
}

export interface LoginServicePayload {
    user: MahoUser
    accessToken: string
    refreshToken: string
}

export interface App {
    id: string
    name?: string
    description?: string
    tenant_id?: string
    created_at?: Date
    updated_at?: Date
}

export interface AppSettings {
    id?: number
    app_id?: string
    max_storage_mb?: number
    used_storage_mb?: number
    max_file_size_mb?: number
    state?: string
    created_at?: Date
    updated_at?: Date
}