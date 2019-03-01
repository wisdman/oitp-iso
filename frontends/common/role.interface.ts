/*
 * === User role ===
 */

export type IRole = "user" | "teacher" | "manager" | "publisher" | "administrator" | "su"

export const MRoleTitle = new Map<IRole, string>()
MRoleTitle.set("user", "Пользователь")
MRoleTitle.set("teacher", "Преподаватель")
MRoleTitle.set("manager", "Управляющий")
MRoleTitle.set("publisher", "Публикатор")
MRoleTitle.set("administrator", "Администратор")
MRoleTitle.set("su", "Super user")
