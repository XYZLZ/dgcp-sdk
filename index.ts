import { dgcp } from '@xyzlz/dgcp-sdk'

const sdk = dgcp()

const res = await sdk.api.processes.list()

console.log(res)
