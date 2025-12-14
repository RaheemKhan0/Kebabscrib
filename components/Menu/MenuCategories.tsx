"use client"

import { useEffect, useMemo, useState } from "react"
import { useMenu } from "@utils/context/MenuContext"
import LoadingScreen from "@components/Common/LoadingScreen"
import MenuList from "./MenuList"

const DEFAULT_CATEGORY = "Des Sandwiches"

const MenuCategories = () => {
  const { menu } = useMenu()

  const categories = useMemo(() => {
    if (!menu) return []
    const unique = new Map<string, number>()
    menu.forEach((item) => {
      if (item.item_category && !unique.has(item.item_category)) {
        unique.set(item.item_category, unique.size)
      }
    })

    return Array.from(unique.keys())
  }, [menu])

  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)

  useEffect(() => {
    if (!categories.length) return
    if (!categories.includes(activeCategory)) {
      setActiveCategory(
        categories.includes(DEFAULT_CATEGORY)
          ? DEFAULT_CATEGORY
          : categories[0],
      )
    }
  }, [categories, activeCategory])

  if (!menu) {
    return <LoadingScreen />
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
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-1 flex-wrap gap-3 overflow-x-auto rounded-full border border-KC_GREEN/30 bg-white px-4 py-3 shadow-sm">
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-KC_Yellow text-KC_GREEN shadow"
                    : "bg-transparent text-KebabGreen hover:text-KC_GREEN"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </header>

      <div>
        <h2 className="text-center text-3xl font-bold text-KebabGreen">
          {activeCategory}
        </h2>
        <div className="mt-6">
          <MenuList item_category={activeCategory} />
        </div>
      </div>
    </section>
  )
}

export default MenuCategories
