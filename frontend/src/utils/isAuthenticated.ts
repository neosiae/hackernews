export default function isAuthenticated (): boolean {
  return Boolean(localStorage.getItem('token'))
}