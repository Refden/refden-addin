export const authHeaders = () => JSON.parse(localStorage.getItem('auth-headers'));

export const setAuthHeaders = (headers) => (
  localStorage.setItem('auth-headers', JSON.stringify(headers))
);

export const removeAuthHeaders = () => localStorage.removeItem('auth-headers');
