import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { MahoragaResponse } from '#types/mahoraga/api.js'
import type { App, AppSettings } from '#types/mahoraga/index.js'

export class Apps extends BaseClient {
    constructor(config: InternalSDKConfig) {
        super({
            ...config,
            endpoint: APIEndpoint.MAHORAGA,
            baseUrl: BASE_URLS[APIEndpoint.MAHORAGA],
        })
    }

    /**
     * Retrieves a list of apps for a given user.
     * @param {string} userId - The id of the user.
     * @returns {Promise<MahoragaResponse<App[]>>} - A promise with the list of apps.
     * @example const response = await api.apps.list('1234567890abcdef')
     */
    async list(userId: string): Promise<MahoragaResponse<App[]>> {
        return await this.request<MahoragaResponse<App[]>>({
            method: 'GET',
            url: '/apps/get-user',
            params: { userId },
        })
    }

    /**
     * Creates a new app.
     * @param {Omit<App, 'id' | 'created_at' | 'updated_at'>} app - The app to be created.
     * @returns {Promise<MahoragaResponse<App>>} - A promise with the created app.
     * @example const response = await api.apps.create({ name: 'My App', description: 'This is my app' })
     */
    async create(app: Omit<App, 'id' | 'created_at' | 'updated_at'>): Promise<MahoragaResponse<App>> {
        return await this.request<MahoragaResponse<App>>({
            method: 'POST',
            url: '/apps/create',
            data: app,
        })
    }

    /**
     * Updates an existing app.
     * @param {App} app - The app to be updated.
     * @returns {Promise<MahoragaResponse<App>>} - A promise with the updated app.
     * @example const response = await api.apps.update({ id: '1234567890abcdef', name: 'My Updated App' })
     */
    async update(app: App): Promise<MahoragaResponse<App>> {
        return await this.request<MahoragaResponse<App>>({
            method: 'PUT',
            url: '/apps/update/' + app.id,
            data: app,
        })
    }

    /**
     * Retrieves the settings for an app.
     * @param {string} appId - The id of the app.
     * @returns {Promise<MahoragaResponse<AppSettings>>} - A promise with the app settings.
     * @example const response = await api.apps.getSettings('1234567890abcdef')
     */
    async getSettings(appId: string): Promise<MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>({
            method: 'GET',
            url: '/apps/get-settings',
            params: { appId },
        })
    }

    /**
     * Creates new settings for an app.
     * @param {Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>} settings - The settings to be created.
     * @returns {Promise<MahoragaResponse<AppSettings>>} - A promise with the created settings.
     * @example const response = await api.apps.createSettings({ app_id: '1234567890abcdef', max_storage_mb: 1000 })
     */
    async createSettings(
        settings: Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>
    ): Promise<MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>({
            method: 'POST',
            url: '/apps/create-settings',
            data: settings,
        })
    }

    /**
     * Updates the settings for an app.
     * @param {AppSettings} settings - The settings to be updated.
     * @returns {Promise<MahoragaResponse<AppSettings>>} - A promise with the updated settings.
     * @example const response = await api.apps.updateSettings({ id: '1234567890abcdef', max_storage_mb: 2000 })
     */
    async updateSettings(settings: AppSettings): Promise<MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>({
            method: 'PUT',
            url: '/apps/update-settings/' + settings.id,
            data: settings,
        })
    }
}
