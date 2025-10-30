import { BaseClient } from '#client/base.js'
import type { InternalSDKConfig } from '#config/config.js'
import type { MahoragaPaginatedResponse, MahoragaResponse } from '#types/mahoraga/api.js'
import type { PaginationRequest } from '#types/shared.js'
import type { MahoFileInfo } from '#types/mahoraga/index.js'

export class Files extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super(config)
    }

    async list(params: PaginationRequest): Promise<MahoragaPaginatedResponse<MahoFileInfo[]>> {
        const data = await this.request<MahoragaPaginatedResponse<MahoFileInfo[]>>({
            method: 'get',
            url: '/files',
            params,
        })
        data.payload.content.forEach((f) => (f.created_at = new Date(f.created_at)))
        return data
    }

    async upload(files: File[]): Promise<MahoragaResponse<MahoFileInfo>> {
        const formData = new FormData()
        files.forEach((f) => formData.append('files', f))
        return await this.request<MahoragaResponse<MahoFileInfo>>({
            method: 'post',
            url: '/files/upload',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
    
    async delete(fileId: string): Promise<MahoragaResponse<string>> {
        return await this.request<MahoragaResponse<string>>({
            method: 'delete',
            url: '/files/delete/' + fileId,
        })
    }
    
    async download(fileId: string): Promise<Blob> {
        return await this.request<Blob>({
            method: 'get',
            url: '/files/download',
            params: { id: fileId },
            responseType: 'blob',
        })
    }
}
