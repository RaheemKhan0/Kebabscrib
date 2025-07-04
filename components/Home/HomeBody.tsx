import BannerSlider from "./Slider";

const HeroSection = () => {
  return (
    <section className="relative bg-EggShell py-10 md:py-16 lg:py-20 overflow-hidden mt-10">
      <div className="md:max-w-screen-md sm:max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl max-w-[400px] flex flex-col md:flex-row items-center gap-10 px-4 sm:px-6 lg:px-20 mt-10 mx-auto ">
        {/* LEFT: Text */}
        <div className="flex-1 flex justify-center md:justify-start">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 max-w-lg shadow-xl border border-KCPeach/50 text-center md:text-left">
            {/* Subheading Tagline */}
            <p className="text-xs sm:text-sm uppercase tracking-widest text-KCPeach font-semibold mb-2">
              Since 2011 • Authentic Taste
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-KCGreen font-parkinsans mb-3 leading-tight">
              Kebab's Crib
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              Dive into the juiciest kebabs, meltiest cheese, and the boldest
              flavors—crafted with love and fire, straight from our grill.
            </p>

            {/* CTA Button */}
            <a
              href="/menu"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-KCYellow text-KCGreen rounded-full text-sm sm:text-base md:text-lg font-semibold shadow-md 
              hover:bg-KCGreen hover:text-KCYellow transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Order Now
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: Banner Slider */}
        <div className="flex-1 mx-auto w-full  md:max-w-[600px] aspect-[4/3] sm:max-h-[400px]  sm:aspect-[5/3] md:aspect-[3/2] lg:aspect-[16/9] max-h-[700px] md:max-h-[550px]">
          <BannerSlider />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

