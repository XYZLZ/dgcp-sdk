import { BaseClient } from '#client/base.js'
import { APIEndpoint, BASE_URLS, type InternalSDKConfig } from '#config/config.js'
import type { MahoragaResponse } from '#types/mahoraga/api.js'
import type { App, AppSettings } from '#types/mahoraga/index.js'
import type { AxiosResponse } from 'axios'

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
     * @returns {Promise<AxiosResponse<MahoragaResponse<App[]>>> | MahoragaResponse<App[]>>} - A promise with the list of apps.
     * @example const response = await api.apps.list('1234567890abcdef')
     */
    async list(
        userId: string,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<MahoragaResponse<App[]>> | MahoragaResponse<App[]>> {
        return await this.request<MahoragaResponse<App[]>>(
            {
                method: 'GET',
                url: '/apps/get-user',
                params: { userId },
            },
            withResponseMetadata,
        )
    }

    /**
     * Creates a new app.
     * @param {Omit<App, 'id' | 'created_at' | 'updated_at'>} app - The app to be created.
     * @returns {Promise<AxiosResponse<MahoragaResponse<App>> |MahoragaResponse<App>>} - A promise with the created app.
     * @example const response = await api.apps.create({ name: 'My App', description: 'This is my app' })
     */
    async create(
        app: Omit<App, 'id' | 'created_at' | 'updated_at'>,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<MahoragaResponse<App>> | MahoragaResponse<App>> {
        return await this.request<MahoragaResponse<App>>(
            {
                method: 'POST',
                url: '/apps/create',
                data: app,
            },
            withResponseMetadata,
        )
    }

    /**
     * Updates an existing app.
     * @param {App} app - The app to be updated.
     * @returns {Promise<AxiosResponse<MahoragaResponse<App>> | MahoragaResponse<App>>} - A promise with the updated app.
     * @example const response = await api.apps.update({ id: '1234567890abcdef', name: 'My Updated App' })
     */
    async update(
        app: App,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<MahoragaResponse<App>> | MahoragaResponse<App>> {
        return await this.request<MahoragaResponse<App>>(
            {
                method: 'PUT',
                url: '/apps/update/' + app.id,
                data: app,
            },
            withResponseMetadata,
        )
    }

    /**
     * Retrieves the settings for an app.
     * @param {string} appId - The id of the app.
     * @returns {Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>>} - A promise with the app settings.
     * @example const response = await api.apps.getSettings('1234567890abcdef')
     */
    async getSettings(
        appId: string,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>(
            {
                method: 'GET',
                url: '/apps/get-settings',
                params: { appId },
            },
            withResponseMetadata,
        )
    }

    /**
     * Creates new settings for an app.
     * @param {Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>} settings - The settings to be created.
     * @returns {Promise<AxiosResponse<MahoragaResponse<AppSettings>> |MahoragaResponse<AppSettings>>} - A promise with the created settings.
     * @example const response = await api.apps.createSettings({ app_id: '1234567890abcdef', max_storage_mb: 1000 })
     */
    async createSettings(
        settings: Omit<AppSettings, 'id' | 'created_at' | 'updated_at' | 'state'>,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>(
            {
                method: 'POST',
                url: '/apps/create-settings',
                data: settings,
            },
            withResponseMetadata,
        )
    }

    /**
     * Updates the settings for an app.
     * @param {AppSettings} settings - The settings to be updated.
     * @returns {Promise<MahoragaResponse<AppSettings>>} - A promise with the updated settings.
     * @example const response = await api.apps.updateSettings({ id: '1234567890abcdef', max_storage_mb: 2000 })
     */
    async updateSettings(
        settings: AppSettings,
        withResponseMetadata = false,
    ): Promise<AxiosResponse<MahoragaResponse<AppSettings>> | MahoragaResponse<AppSettings>> {
        return await this.request<MahoragaResponse<AppSettings>>(
            {
                method: 'PUT',
                url: '/apps/update-settings/' + settings.id,
                data: settings,
            },
            withResponseMetadata,
        )
    }
}
