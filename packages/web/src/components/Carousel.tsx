'use client'

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CircleDot, Circle } from 'lucide-react';

type CarouselProps = {
  images: string[];
  size: string;
  duration: string;
};

export function Carousel({ images, size, duration }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handlePrev() {
    setActiveIndex((oldIndex) => {
      return oldIndex === 0 ? images.length - 1 : oldIndex - 1;
    });
  };

  function handleNext() {
    setActiveIndex((oldIndex) => {
      return oldIndex === images.length - 1 ? 0 : oldIndex + 1;
    });
  };

  return (
    <div className={`relative w-full h-${size}`}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute w-full h-full object-cover transition-opacity duration-${duration} ${index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
        />
      ))}
      <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center p-5">
        <button
          onClick={handlePrev}
          className="text-white-50 bg-gray-800"
        >
          <ChevronLeft/>
        </button>
        <button
          onClick={handleNext}
          className="text-white-50 bg-gray-800"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="absolute bottom-0 inset-x-0 flex justify-center items-center p-5 space-x-2">
        {images.map((image, index) => (
          index === activeIndex ? <CircleDot key={index} /> : <Circle key={index} />
        ))}
      </div>
    </div>
  );
};
