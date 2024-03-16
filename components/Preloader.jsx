/**
 * source: https://icons8.com/preloaders/en/science/book/
 */

import React from "react";
import Image from "next/image";
import bookFlipPreloader from "@/public/images/preloaders/book-flip-preloader.gif";
import bookFlipPreloaderGrey from "@/public/images/preloaders/book-flip-preloader-grey.gif";

/**
 * Preloader component that displays a GIF of a book with pages flipping while the page is loading.
 * If the 'color' argument is "grey", it displays a grey version of the preloader.
 *
 * @component
 * @example
 * return (
 *   <Preloader color="grey" />
 * )
 * @example
 * return (
 *   <Preloader color="" />
 * )
 */
const Preloader = ({ color }) => {
  return (
    <div className="flex flex-col justify-center text-sm font-medium rounded-xl text-neutral-400 max-md:max-w-full">
      <div className="inset-0 items-center z-50">
          <Image src={color === "grey" ? bookFlipPreloaderGrey : bookFlipPreloader} alt="Loading..." />
      </div>
    </div>
  );
};

export default Preloader;
