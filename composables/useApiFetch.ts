// Proses fetch data dengan menggunakan laravel sanctum (with credentrials)
// bisa menggunakan token dan session cookie

import { UseFetchOptions } from "nuxt/app"
import { useRequestHeaders } from "nuxt/app";

export async function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {} ) {
    const config = useRuntimeConfig()
    let headers: any = {}
    if (!useCookie('XSRF-TOKEN').value) { const res = await useFetch(config.public.backend_url + '/sanctum/csrf-cookie', { method: 'get', credentials: 'include', headers: { 'Accept': "application/json" } }) }
    const token = useCookie('XSRF-TOKEN')

    headers['Accept'] = 'application/json'
    if (token.value) {
        headers['X-XSRF-TOKEN'] = token.value
    }

    if (config.public.token && usePermissionStore().isTokenSet) {
        headers['Authorization'] = 'Bearer ' + usePermissionStore().token
    }

    return $fetch(config.public.api_url + path, {
        credentials: 'include',
        watch: false,
        retry: false,
        ...options,
        headers: {
            ...headers,
            ...options?.headers
        }
    })

}
