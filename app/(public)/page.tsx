import Hero from "@components/Home/Hero"
import MenuCategories from "@components/Menu/MenuCategories"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="bg-EggShell">
      <Hero />
      <section id="menu">
        <MenuCategories />
      </section>
    </div>
  )
}
