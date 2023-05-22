import { api } from '@/lib/api'
import { cookies } from 'next/headers'

interface Memory {
  id: string
  content: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export async function getMemoryById(memoryId: string) {
  try {
    const token = cookies().get('token')?.value
    const response = await api.get(`/memories/${memoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const memory: Memory = response.data

    return memory
  } catch (error) {}
}
