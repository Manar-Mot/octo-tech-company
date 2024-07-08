"use client"
import { loadingImage } from "@/public/assets";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingComp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = document.querySelector('.fade-in') as HTMLImageElement;
    if (img.complete) {
      setLoaded(true);
    } else {
      img.onload = () => setLoaded(true);
    }
  }, []);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black grid place-items-center z-[1001]">
      <Image 
        src={loadingImage} 
        alt="Loading" 
        className={`fade-in ${loaded ? 'loaded' : ''}`} 
      />
    </div>
  );
}
