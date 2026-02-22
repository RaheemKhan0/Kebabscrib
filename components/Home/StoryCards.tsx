"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useGsapPlugins } from "@utils/customhooks/useGsapPlugins"

const StoryCards = () => {
  useGsapPlugins()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-8 w-full max-w-screen-xl px-4 sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(244,207,75,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(0,98,68,0.18),transparent_50%)]" />
      <div className="grid gap-6 rounded-[32px] border border-KC_GREEN/10 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Fire-Grilled Daily",
            body: "Charcoal heat, hand-marinated meats, and crisp veggies. Every skewer hits the grill the same day you order.",
          },
          {
            title: "Build It Your Way",
            body: "Choose sauces, stack toppings, or go full combo. Your kebab is always personalized, never prebuilt.",
          },
          {
            title: "Fast, Warm, Ready",
            body: "Quick prep, tight packaging, and real-time order flow so your meal arrives hot and ready to enjoy.",
          },
        ].map((card, index) => (
          <div
            key={card.title}
            ref={(node) => {
              cardRefs.current[index] = node
            }}
            className="group rounded-2xl border border-KC_GREEN/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-KC_Yellow text-KC_GREEN font-bold">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-KebabGreen">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{card.body}</p>
            <div className="mt-4 h-1 w-12 rounded-full bg-KC_GREEN/20 transition-all duration-300 group-hover:w-20 group-hover:bg-KC_GREEN" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default StoryCards
