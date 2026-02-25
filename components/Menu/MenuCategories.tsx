"use client"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useMenu } from "@utils/context/MenuContext"
import MenuList from "./MenuList"
import MenuListSkeleton from "./MenuListSkeleton"

const DEFAULT_CATEGORY = "Des Sandwiches"

const MenuCategories = () => {
  const { menu } = useMenu()
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const categories = useMemo(() => {
    if (!menu) return []
    const unique = new Map<string, number>()
    menu.forEach((item) => {
      if (item.item_category != "Taco") {
      
      if (item.item_category && !unique.has(item.item_category)) {
        unique.set(item.item_category, unique.size)
      }
      }
    })

    return Array.from(unique.keys())
  }, [menu])

  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)

  const resolvedCategory = useMemo(() => {
    if (!categories.length) {
      return DEFAULT_CATEGORY
    }
    if (categories.includes(activeCategory)) {
      return activeCategory
    }
    return categories.includes(DEFAULT_CATEGORY)
      ? DEFAULT_CATEGORY
      : categories[0]
  }, [categories, activeCategory])

  useLayoutEffect(() => {
    const track = trackRef.current
    const activeButton = buttonRefs.current[resolvedCategory]
    if (!track || !activeButton) return

    const nextLeft = activeButton.offsetLeft
    const nextTop = activeButton.offsetTop
    const maxLeft = Math.max(0, track.clientWidth - activeButton.offsetWidth)
    setIndicatorStyle({
      width: activeButton.offsetWidth,
      height: activeButton.offsetHeight,
      x: Math.min(nextLeft, maxLeft),
      y: nextTop,
    })
  }, [resolvedCategory, categories])

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current
      const activeButton = buttonRefs.current[resolvedCategory]
      if (!track || !activeButton) return

      const nextLeft = activeButton.offsetLeft
      const nextTop = activeButton.offsetTop
      const maxLeft = Math.max(0, track.clientWidth - activeButton.offsetWidth)
      setIndicatorStyle({
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
        x: Math.min(nextLeft, maxLeft),
        y: nextTop,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [resolvedCategory])

  if (!menu) {
    return (
      <section className="mt-28 flex flex-col gap-10 px-4 py-6 md:px-12">
        <header className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3 rounded-full border border-KC_GREEN/30 bg-white px-2 py-3 shadow-sm">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-9 w-24 rounded-full skeleton-shimmer"
              />
            ))}
          </div>
        </header>
        <div>
          <div className="mx-auto h-8 w-48 rounded-full skeleton-shimmer" />
          <MenuListSkeleton />
        </div>
      </section>
    )
  }

  if (!categories.length) {
    return (
      <div className="mt-24 text-center text-lg font-semibold text-KebabGreen">
        No menu categories available.
      </div>
    )
  }

  return (
    <section className="mt-28 flex flex-col gap-10 px-4 py-6 md:px-12">
      <header className="flex flex-col items-center gap-6">
        <div
          ref={containerRef}
          className="rounded-full border border-KC_GREEN/30 bg-white shadow-sm"
        >
          <div
            ref={trackRef}
            className="relative flex flex-wrap justify-center gap-3 px-2 py-3"
          >
            <span
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-KC_Yellow shadow transition-[transform,width,height] duration-300 ease-out"
              style={{
                width: indicatorStyle.width,
                height: indicatorStyle.height,
                transform: `translate3d(${indicatorStyle.x}px, ${indicatorStyle.y}px, 0)`,
                opacity: indicatorStyle.width ? 1 : 0,
              }}
              aria-hidden
            />
            {categories.map((category) => {
              const isActive = resolvedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  ref={(node) => {
                    buttonRefs.current[category] = node
                  }}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-KC_GREEN"
                      : "text-KebabGreen hover:text-KC_GREEN"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div>
        <h2 className="text-center text-3xl font-bold text-KebabGreen">
          {resolvedCategory}
        </h2>
        <div className="mt-6">
          <MenuList item_category={resolvedCategory} />
        </div>
      </div>
    </section>
  )
}

export default MenuCategories
