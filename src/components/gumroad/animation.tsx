"use client";

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import data from "../../lib/gumhead.json";

const AnimationComponent = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      });

      return () => anim.destroy();
    }
  }, []);
 return (
    <div className="relative max-w-6xl mx-auto mb-12 h-80 bg-[#FFC900] p-8 border-y border-black lg:border lg:rounded-full">
      <div className="relative flex h-full flex-col justify-between rounded-2xl border border-black bg-[#FFC900] z-10 lg:px-8 lg:rounded-full">
        {/* Top arrows - visible on desktop */}
        <div className="hidden px-4 flex justify-between -mt-3 lg:flex lg:px-40">
          <div className="flex h-6 items-center bg-[#FFC900] pr-6 lg:gap-x-10">
            <img 
              alt="Right arrow" 
              className="h-6 w-6 -translate-x-3"
              src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
            />
            <div className="lg:text-2xl">The Gumroad Way</div>
          </div>
          <div className="flex h-6 items-center bg-[#FFC900] pr-6 lg:gap-x-10">
            <img 
              alt="Right arrow" 
              className="h-6 w-6 -translate-x-3"
              src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
            />
            <div className="lg:text-2xl">Start Small</div>
          </div>
        </div>

        {/* Bottom arrows - visible on desktop */}
        <div className="hidden px-4 flex justify-between -mb-3 lg:flex lg:px-40">
          <div className="flex h-6 items-center bg-[#FFC900] pl-6 lg:gap-x-10">
            <div className="lg:text-2xl">Get Better Together</div>
            <img 
              alt="Right arrow" 
              className="h-6 w-6 translate-x-3 rotate-180"
              src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
            />
          </div>
          <div className="flex h-6 items-center bg-[#FFC900] pl-6 lg:gap-x-10">
            <div className="lg:text-2xl">Learn Quickly</div>
            <img 
              alt="Right arrow" 
              className="h-6 w-6 translate-x-3 rotate-180"
              src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
            />
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="flex h-6 items-center bg-[#FFC900] absolute top-0 -ml-2 pr-3 -mt-3 left-1/2 -translate-x-1/2 lg:hidden">
          <img 
            alt="Right arrow" 
            className="h-4 w-4 -translate-x-2 -translate-y-px"
            src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
          />
          <div className="whitespace-nowrap lg:text-2xl">
            The Gumroad Way
          </div>
        </div>

        <div className="flex h-6 items-center bg-[#FFC900] absolute right-0 pr-3 origin-center rotate-90 top-1/2 -translate-y-1/2 translate-x-1/2 lg:hidden">
          <img 
            alt="Right arrow" 
            className="h-4 w-4 -translate-x-2 -translate-y-px"
            src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
          />
          <div className="whitespace-nowrap lg:text-2xl">Start Small</div>
        </div>

        <div className="flex h-6 items-center bg-[#FFC900] absolute bottom-0 -ml-2 pl-3 -mb-3 left-1/2 -translate-x-1/2 lg:hidden">
          <div className="whitespace-nowrap lg:text-2xl">
            Get Better Together
          </div>
          <img 
            alt="Right arrow" 
            className="h-4 w-4 translate-x-2 translate-y-px rotate-180"
            src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
          />
        </div>

        <div className="flex h-6 items-center bg-[#FFC900] absolute left-0 pr-3 origin-center -rotate-90 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:hidden">
          <img 
            alt="Right arrow" 
            className="h-4 w-4 -translate-x-2 -translate-y-px"
            src="https://assets.gumroad.com/assets/about/arrowhead-right-4c8385b8414b6b7ea024af50fc672ee495ecb2cc28edeeb783901d023ba499aa.svg"
          />
          <div className="whitespace-nowrap lg:text-2xl">
            Learn Quickly
          </div>
        </div>

        {/* Center animation area */}
        <div
          ref={animationContainer}
          className="absolute w-56 h-56 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-20 lg:w-80 lg:h-80"
        />
      </div>
    </div>
  );
};

export default AnimationComponent;
