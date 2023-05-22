import { api } from '@/lib/api'
import { cookies } from 'next/headers'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export async function getMemories() {
  try {
    const token = cookies().get('token')?.value
    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const memories: Memory[] = response.data

    return memories
  } catch (error) {}
}
