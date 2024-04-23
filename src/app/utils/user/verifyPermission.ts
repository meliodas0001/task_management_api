export function verifyUserPermission(
  roles: string[],
  permissionList: string[],
): boolean {
  return roles.some((role) => {
    return permissionList.includes(role);
  });
}
