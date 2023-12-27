import Image from "next/image";
import React, { useState } from "react";

function PropertySlider({ property }: { property: Property }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = property.photos.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="flex items-center justify-center" id="gallery">
      <div className="relative">
        <div className="flex overflow-hidden">
          {property.photos.map((image, index) => (
            <div
              key={index}
              className={`w-full flex-none  transition-transform duration-300 ease-in-out${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div>
                <Image src={image} alt={image} height={800} width={500} />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default PropertySlider;
