import { type InternalSDKConfig, type SDKConfig, DEFAULT_CONFIG } from '#config/config.js'

import { ContractsAPIResource } from '#core/api/contracts/contracts.js'
import { OffersAPIResource } from '#core/api/offers/offers.js'
import { ProcessesAPIResource } from '#core/api/processes/processes.js'
import { CatalogAPIResource } from '#core/api/catalog/catalog.js'
import { PACCResource } from '#core/api/pacc/pacc.js'
import { PurcharseUnitsAPIResource } from '#core/api/purcharseUnits/purcharseUnits.js'
import { SuppliersAPIResource } from '#core/api/suppliers/suppliers.js'

type ApiInstances = {
    processes: ProcessesAPIResource
    offers: OffersAPIResource
    contracts: ContractsAPIResource
    catalog: CatalogAPIResource
    pacc: PACCResource
    purcharseUnits: PurcharseUnitsAPIResource
    suppliers: SuppliersAPIResource
}

class DGCP {
    public api: ApiInstances

    private config: SDKConfig

    constructor(apiKey: string, options?: Partial<Omit<SDKConfig, 'apiKey'>>) {
        this.config = {
            ...DEFAULT_CONFIG,
            ...options,
            apiKey,
        }

        // Initialize all resources
        this.api = {
            processes: new ProcessesAPIResource(this.config as InternalSDKConfig),
            offers: new OffersAPIResource(this.config as InternalSDKConfig),
            contracts: new ContractsAPIResource(this.config as InternalSDKConfig),
            catalog: new CatalogAPIResource(this.config as InternalSDKConfig),
            pacc: new PACCResource(this.config as InternalSDKConfig),
            purcharseUnits: new PurcharseUnitsAPIResource(this.config as InternalSDKConfig),
            suppliers: new SuppliersAPIResource(this.config as InternalSDKConfig),
        }
    }

    updateConfig(config: Partial<Omit<SDKConfig, 'apiKey'>>): void {
        this.config = { ...this.config, ...config }

        // Reinitialize resources with new config
        this.api = {
            processes: new ProcessesAPIResource(this.config as InternalSDKConfig),
            offers: new OffersAPIResource(this.config as InternalSDKConfig),
            contracts: new ContractsAPIResource(this.config as InternalSDKConfig),
            catalog: new CatalogAPIResource(this.config as InternalSDKConfig),
            pacc: new PACCResource(this.config as InternalSDKConfig),
            purcharseUnits: new PurcharseUnitsAPIResource(this.config as InternalSDKConfig),
            suppliers: new SuppliersAPIResource(this.config as InternalSDKConfig),
        }
    }
}

function dgcp(apikey: string, config?: Omit<SDKConfig, 'apiKey' | 'baseUrl'>) {
    return new DGCP(apikey, config)
}

export * from './types/api/api.js'
export * from './errors/errors.js'
export { dgcp }
