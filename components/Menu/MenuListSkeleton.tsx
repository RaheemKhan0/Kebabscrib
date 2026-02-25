"use client"

const MenuListSkeleton = () => {
  const placeholders = Array.from({ length: 8 }, (_, index) => index)
  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
      {placeholders.map((key) => (
        <div
          key={key}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto flex flex-col justify-between border rounded-lg shadow-md overflow-hidden bg-white h-full"
        >
          <div className="w-full h-48 skeleton-shimmer" />
          <div className="flex flex-col flex-grow justify-between p-4 gap-4">
            <div className="space-y-3">
              <div className="h-6 w-3/4 rounded-full skeleton-shimmer" />
              <div className="h-4 w-1/2 rounded-full skeleton-shimmer" />
              <div className="h-4 w-full rounded-full skeleton-shimmer" />
              <div className="h-4 w-5/6 rounded-full skeleton-shimmer" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-2/3 rounded-full skeleton-shimmer" />
              <div className="h-4 w-1/3 rounded-full skeleton-shimmer" />
            </div>
            <div className="h-12 w-full rounded-full skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuListSkeleton
