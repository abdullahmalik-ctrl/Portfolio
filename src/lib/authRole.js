const adminAllowlist = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isAllowlistedAdmin(email) {
  return adminAllowlist.includes((email || '').trim().toLowerCase());
}

export async function resolveUserRole(firebaseUser) {
  const tokenResult = await firebaseUser.getIdTokenResult();

  if (tokenResult?.claims?.admin === true) {
    return 'admin';
  }

  if (isAllowlistedAdmin(firebaseUser.email)) {
    return 'admin';
  }

  return 'user';
}
