import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect } from "react";

export const useGsapPlugins = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }, []);
};
