// Middleware Guest

import { usePermissionStore } from "~/stores/usePermissionStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = usePermissionStore()
    const config = useRuntimeConfig()
    const cia = sessionStorage.getItem('cia')

    if (!auth.isLoggedIn) {
        if (config.public.token) {
            try {
                const rey: any  = await useApiFetch('/user', { headers: { Authorization: 'Bearer ' + cia } })
                auth.storeUser(rey.user)
                auth.storeRole(rey.user.roles[0].name)
                auth.storeRoles(rey.roles)
                auth.storePermissions(rey.permissions)
                auth.storeToken(cia ? cia : '')
                return navigateTo("/management", {replace: true})
            } catch(e) {
            }
        } else {
            try {
                const rey: any  = await useApiFetch('/user')
                auth.storeUser(rey.user)
                auth.storeRole(rey.user.roles[0].name)
                auth.storeRoles(rey.roles)
                auth.storePermissions(rey.permissions)
                return navigateTo("/management", {replace: true})
            } catch(e) {
            }
        }
    } else {
        return navigateTo("/management", {replace: true})
    }
})
