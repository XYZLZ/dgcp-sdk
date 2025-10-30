import { BaseClient } from '#client/base.js'
import type { InternalSDKConfig } from '#config/config.js'
import type { MahoragaResponse } from '#types/mahoraga/api.js'
import type { App, AppSettings } from '#types/mahoraga/index.js'

export class Apps extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super(config)
    }

    async list(userId: string): Promise<MahoragaResponse<App[]>> {
        return await this.request<MahoragaResponse<App[]>>({
            method: 'GET',
            url: '/apps/get-user',
            params: { userId },
        })
    }

    async create(app: Omit<App, 'id' | 'created_at' | 'updated_at'>): Promise<MahoragaResponse<App>> {
        return await this.request<MahoragaResponse<App>>({
            method: 'POST',
            url: '/apps/create',
            data: app,
        })
    }

    async update(app: App): Promise<MahoragaResponse<App>> {
        return await this.request<MahoragaResponse<App>>({
            method: 'PUT',
            url: '/apps/update/' + app.id,
            data: app,
        })
    }

    async getSettings(appId: string): Promise<MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>({
            method: 'GET',
            url: '/apps/get-settings',
            params: { appId },
        })
    }

    async createSettings(
        settings: Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>
    ): Promise<MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>({
            method: 'POST',
            url: '/apps/create-settings',
            data: settings,
        })
    }

    async updateSettings(settings: AppSettings): Promise<MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>({
            method: 'PUT',
            url: '/apps/update-settings/' + settings.id,
            data: settings,
        })
    }
}
