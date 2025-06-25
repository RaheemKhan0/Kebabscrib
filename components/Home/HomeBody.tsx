const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat bg-black min-h-[100vh] flex items-start justify-center pt-20 background before:absolute before:inset-0 before:bg-black before:opacity-15 before:content-['']">
      <div className="relative z-10 h-full py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 mt-36">
        <h1 className="mb-4 tracking-wider font-parkinsans text-EggShell leading-none font-bold md:text-5xl lg:text-6xl ">
          Kebab's Crib
        </h1>
        <p className="mb-8 text-lg font-parkinsans text-EggShell lg:text-xl sm:px-16 xl:px-48  ">
          Serving the best kebabs in town since 2011.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="/menu"
            className="inline-flex justify-center items-center py-3 px-5 text-base bg-KebabGold rounded-full font-parkinsans font-medium text-center text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Order Now
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
