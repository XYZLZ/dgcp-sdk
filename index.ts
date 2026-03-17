import { dgcp } from './dist/main'

const sdk = dgcp()

const res = await sdk.api.processes.list({}, true)

console.log({result: res})
