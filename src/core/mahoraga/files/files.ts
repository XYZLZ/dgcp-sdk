import NodeFormData from 'form-data'
import { ReadStream } from 'node:fs'
import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { MahoragaPaginatedResponse, MahoragaResponse } from '#types/mahoraga/api.js'
import type { PaginationRequest } from '#types/shared.js'
import type { MahoFileInfo } from '#types/mahoraga/index.js'
import { SDKError, ValidationError } from '#errors/errors.js'

type MahoFile = {
    file: ReadStream | Buffer | ArrayBuffer
    name: string
}

export class Files extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.MAHORAGA,
            baseUrl: BASE_URLS[APIEndpoint.MAHORAGA],
        })
    }

    /**
     * Get a list of all files.
     * @param {PaginationRequest} [params] - Parameters to filter the files.
     * @returns {Promise<MahoragaPaginatedResponse<MahoFileInfo[] | null>>} - A promise with the list of files.
     * @example const files = await api.files.list()
     * @example const files = await api.files.list({ page: 1, limit: 10 })
     */
    async list(params: PaginationRequest): Promise<MahoragaPaginatedResponse<MahoFileInfo[] | null>> {
        const data = await this.request<MahoragaPaginatedResponse<MahoFileInfo[]>>({
            method: 'get',
            url: '/files',
            params,
        })

        if (data.payload.content) {
            data.payload.content.forEach((f) => (f.created_at = new Date(f.created_at)))
        }

        return data
    }

    /**
     * Upload files to the Mahoraga storage.
     * @param {MahoFile[]} files - List of files to be uploaded.
     * @returns {Promise<MahoragaResponse<MahoFileInfo>>} - A promise with the list of uploaded files.
     * @throws ValidationError - If no files are provided or if any of the files have invalid types.
     * @throws SDKError - If any of the files have invalid types.
     * @example const files = await api.files.upload([{ file: new ReadStream('file.txt'), name: 'file.txt' }])
     */
    async upload(files: MahoFile[]): Promise<MahoragaResponse<MahoFileInfo>> {
        if (!files || !Array.isArray(files) || files.length === 0)
            throw ValidationError('No files provided', new Error('No files provided'))

        files.forEach((f) => {
            if (!(f.file instanceof ReadStream) && !(f.file instanceof Buffer) && !(f.file instanceof ArrayBuffer))
                throw ValidationError('Invalid file type', new Error('Invalid file type'))
        })

        const formData = new NodeFormData()

        files.forEach((file, index) => {
            if (file.file instanceof Buffer) {
                formData.append('files', file.file, { filename: file.name })
            } else if (file.file instanceof ReadStream) {
                formData.append('files', file.file, { filename: file.name })
            } else if (file.file instanceof ArrayBuffer) {
                formData.append('files', Buffer.from(file.file), { filename: file.name })
            } else {
                throw new SDKError('INVALID_UPLOAD', 'Invalid file type', 400, {
                    message: 'Invalid file type',
                    cause: file,
                })
            }
        })

        return await this.request<MahoragaResponse<MahoFileInfo>>({
            method: 'post',
            url: '/files/upload',
            data: formData,
            headers: { ...formData.getHeaders() },
        })
    }

    /**
     * Deletes a file from Mahoraga.
     * @param {string} fileId - The id of the file to be deleted.
     * @returns {Promise<MahoragaResponse<string>>} - A promise with the response from the server.
     * @throws SDKError - If the file does not exist or if any error occurs during the deletion process.
     * @example const response = await api.files.delete('1234567890abcdef')
     */
    async delete(fileId: string): Promise<MahoragaResponse<string>> {
        return await this.request<MahoragaResponse<string>>({
            method: 'delete',
            url: '/files/delete/' + fileId,
        })
    }

    /**
     * Downloads a file from Mahoraga.
     * @param {string} fileId - The id of the file to be downloaded.
     * @returns {Promise<Blob>} - A promise with the blob of the downloaded file.
     * @throws SDKError - If the file does not exist or if any error occurs during the download process.
     * @example const blob = await api.files.download('1234567890abcdef')
     */
    async download(fileId: string): Promise<Blob> {
        return await this.request<Blob>({
            method: 'get',
            url: '/files/download',
            params: { id: fileId },
            responseType: 'blob',
        })
    }
}
