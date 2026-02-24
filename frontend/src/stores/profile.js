import { defineStore } from 'pinia'
import { getProfile } from '../api/profileApi'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    loading: false,
    error: ''
  }),
  actions: {
    async fetchProfile() {
      this.loading = true
      this.error = ''
      try {
        const { data } = await getProfile()
        this.profile = data
      } catch {
        this.error = '暂时无法加载线上资料，已切换到默认展示。'
        this.profile = {
          fullName: 'Your Name',
          title: 'Backend Engineer',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          bio: '专注高并发、高可用、可观测的后端系统设计与落地。',
          dailyLife: '白天编码，夜晚健身和阅读，周末关注开源社区与技术分享。',
          skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Kafka', 'Dubbo'],
          hobbies: ['摄影', '跑步', '徒步', '技术写作'],
          updatedAt: new Date().toISOString()
        }
      } finally {
        this.loading = false
      }
    }
  }
})
