// Skema middleware mengecek Logged In User

import { usePermissionStore } from "~/stores/usePermissionStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = usePermissionStore()
    const config = useRuntimeConfig()
    const cia = sessionStorage.getItem('cia')

    if (!auth.isLoggedIn && !config.public.token) {
        try {
            const rey: any  = await useApiFetch('/user')
            auth.storeUser(rey.user)
            if (!!rey.user.person) auth.storeFoto(rey.user.person.foto)
            auth.storeRole(rey.user.roles[0].name)
            auth.storeRoles(rey.roles)
            auth.storePermissions(rey.permissions)
        } catch(e) {
            return navigateTo("/", {replace: true})
        }
    } else if (!auth.isLoggedIn && config.public.token) {
        try {
            const rey: any  = await useApiFetch('/user', { headers: { Authorization: 'Bearer ' + cia } })
            auth.storeUser(rey.user)
            if (!!rey.user.person) auth.storeFoto(rey.user.person.foto)
            auth.storeRole(rey.user.roles[0].name)
            auth.storeRoles(rey.roles)
            auth.storePermissions(rey.permissions)
            auth.storeToken(cia ? cia : '')
        } catch(e) {
            return navigateTo("/", {replace: true})
        }
    }
})
