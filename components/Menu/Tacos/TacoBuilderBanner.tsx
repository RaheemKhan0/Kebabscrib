"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TacoBuilderBanner: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative w-full p-4 border-2 border-dashed border-KebabGreen rounded-xl shadow-sm flex flex-col items-center justify-center bg-[#FFF9F1] hover:shadow-md transition-all">
      {/* Taco Image */}
      <div className="w-14 h-14 mb-4">
        <Image
          src="/assets/Taco.png"
          alt="Taco Icon"
          width={56}
          height={56}
        />
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-KebabGreen text-center mb-2">
        Build Your <br /> Own Taco
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter customization <br /> or pick your own.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => router.push("/customtaco")}
        className="bg-yellow-400 hover:bg-yellow-500 text-KebabGreen font-semibold py-2 px-4 rounded-md transition"
      >
        Build Now
      </button>
    </div>
  );
};

export default TacoBuilderBanner;
