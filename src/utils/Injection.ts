import { Provider } from "@niloc/utils"

export namespace Injection {

    const provider = new Provider()

    export const get = provider.get.bind(provider)
    export const set = provider.set.bind(provider)

}