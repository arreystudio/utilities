// Menggunakan Pinia

import { defineStore } from "pinia"

type User = {
    name: string,
    email: string,
    tipe_user: string,
    uuid: string,
    foto: string
}

type Role = string
type Roles = string[]
type Permissions = string[]
type token = string

export const usePermissionStore = defineStore('permission', () => {
    const user = ref<User>({
        name: '',
        email: '',
        tipe_user: '',
        uuid: '',
        foto: ''
    })
    const role = ref<Role>('')
    const roles = ref<Roles>([])
    const permissions = ref<Permissions>([])
    const token = ref<token>('')

    // User
    const isLoggedIn = computed(() => (user.value.email != ''))

    function storeUser(value: User) {
        user.value.name = value.name
        user.value.email = value.email
        user.value.tipe_user = value.tipe_user
        user.value.uuid = value.uuid
    }

    function storeFoto(value: string) {
        user.value.foto = value
    }

    function dumpUser() {
        user.value.name = ''
        user.value.email = ''
        user.value.tipe_user = ''
        user.value.uuid = ''
    }

    // Role
    const isRole = computed(() => !!role.value)

    function storeRole(value: Role) {
        role.value = value
    }

    function dumpRole() {
        role.value = ''
    }

    // Roles
    const isRolesSet = computed(() => !!roles.value.length)

    function storeRoles(value: Roles) {
        roles.value = value
    }

    function dumpRoles() {
        roles.value = []
    }

    function hasRole(peran: string) {
        return roles.value.includes(peran)
    }

    function isCurrentRole(peran: string) {
        return role.value == peran
    }

    // Permissions
    const isPermissionsSet = computed(() => !!permissions.value.length)

    function storePermissions(value: Permissions) {
        permissions.value = value
    }

    function dumpPermissions() {
        permissions.value = []
    }

    function hasPermission(akses: string) {
        return permissions.value.includes(akses)
    }

    // Token
    const isTokenSet = computed(() => !!token.value.length)

    function storeToken(value: token) {
        token.value = value
    }

    function dumpToken() {
        token.value = ''
    }

    return { user, role, roles, permissions, token, isLoggedIn, storeUser, storeFoto, dumpUser, isRole, storeRole, dumpRole, isRolesSet, storeRoles, dumpRoles, hasRole, isCurrentRole, isPermissionsSet, storePermissions, dumpPermissions, hasPermission, isTokenSet, storeToken, dumpToken }
})
