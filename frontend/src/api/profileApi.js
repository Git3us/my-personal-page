import http from './http'

export function getProfile() {
  return http.get('/api/v1/profile')
}
