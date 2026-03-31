import { dgcp, type PaginatedResponse, type apiTypes } from './dist/main'

const sdk = dgcp()

const res = await sdk.api.processes.list() as PaginatedResponse<apiTypes.Procesos[]>

console.log({result: res})
