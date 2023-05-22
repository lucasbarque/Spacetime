import { EmptyMemories } from '@/components/EmptyMemories'
import { cookies } from 'next/headers'

import Image from 'next/image'
import ptBr from 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getMemories } from '@/actions/getMemories'

dayjs.locale(ptBr)

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const memories = await getMemories()

  if (memories?.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories?.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>

            <Image
              src={process.env.NEXT_PUBLIC_S3_ENDPOINT + '/' + memory.coverUrl}
              alt=""
              width={845}
              height={475}
              className="aspect-video w-full rounded-lg object-cover"
              placeholder="blur"
              blurDataURL="/loading.gif"
            />

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
