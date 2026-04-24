export const roleRedirectMap = {
  admin: "/admin/home",
  user: "/user/home",
};

export const getDefaultRoute = (roles = []) => {
  for (const r of roles) {
    if (roleRedirectMap[r]) return roleRedirectMap[r];
  }
  return "/login";
};