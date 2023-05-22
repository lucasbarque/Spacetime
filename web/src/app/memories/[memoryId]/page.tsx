import { getMemoryById } from '@/actions/getMemoryById'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface IParams {
  memoryId: string
}

export default async function Memory({ params }: { params: IParams }) {
  const memory = await getMemoryById(params.memoryId)

  console.log(memory)

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      {memory && (
        <div>
          {memory.coverUrl && (
            <Image
              src={process.env.NEXT_PUBLIC_S3_ENDPOINT + '/' + memory.coverUrl}
              alt=""
              width={845}
              height={475}
              className="aspect-video w-full rounded-lg object-cover"
              placeholder="blur"
              blurDataURL="/loading.gif"
            />
          )}
          <p
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: memory.content }}
          />
        </div>
      )}
    </div>
  )
}
