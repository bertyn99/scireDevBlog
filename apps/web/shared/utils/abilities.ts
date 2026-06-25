import { defineAbility } from 'nuxt-authorization/utils'

interface AppUser {
  id: string
  role: 'student' | 'admin' | 'author'
}

/** Any authenticated user can view the dashboard */
export const viewDashboard = defineAbility((user: AppUser) => !!user.id)

/** Any authenticated user can access courses */
export const accessCourse = defineAbility((user: AppUser) => !!user.id)

/** Any authenticated user can submit exercises */
export const submitExercise = defineAbility((user: AppUser) => !!user.id)

/** Any authenticated user can track their progress */
export const trackProgress = defineAbility((user: AppUser) => !!user.id)

/** Only admins can view the admin panel */
export const viewAdminPanel = defineAbility((user: AppUser) => user.role === 'admin')

/** Only admins can manage users */
export const manageUsers = defineAbility((user: AppUser) => user.role === 'admin')

/** Admins and authors can edit content */
export const editContent = defineAbility((user: AppUser) => user.role === 'admin' || user.role === 'author')
