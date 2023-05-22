export function MemorySkyleton() {
  return (
    <div className="animate-pulse space-y-4 ">
      <span className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50 " />

      <div className="aspect-video w-full  rounded-lg bg-gray-200 object-cover"></div>

      <p className="h-5 rounded-md bg-gray-200 text-lg leading-relaxed text-gray-100" />
      <p className="h-5 rounded-md bg-gray-200 text-lg leading-relaxed text-gray-100" />
    </div>
  )
}
