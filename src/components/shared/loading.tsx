"use client";

import { FlowerIcon } from "@/components/icons/flower";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const FLOWER_COLORS = [
  {
    petal_top: "#FF4F87",
    petal_bottom: "#FF3B6E",
    petal_left: "#FF4F87",
    petal_right: "#FF3B6E",
    shadow_top: "#C72E5D",
    shadow_bottom: "#B22C4A",
    shadow_left: "#C72E5D",
    shadow_right: "#B22C4A",
    center: "#FFD447",
    center_shadow: "#C79A29",
  },
  {
    petal_top: "#5BC595",
    petal_bottom: "#46AF7E",
    petal_left: "#5BC595",
    petal_right: "#46AF7E",
    shadow_top: "#378E65",
    shadow_bottom: "#2C7854",
    shadow_left: "#378E65",
    shadow_right: "#2C7854",
    center: "#FFE066",
    center_shadow: "#D4A633",
  },
  {
    petal_top: "#6495ED",
    petal_bottom: "#4A78D1",
    petal_left: "#6495ED",
    petal_right: "#4A78D1",
    shadow_top: "#3656A1",
    shadow_bottom: "#2D4686",
    shadow_left: "#3656A1",
    shadow_right: "#2D4686",
    center: "#FFEA85",
    center_shadow: "#C7AA3B",
  },
  {
    petal_top: "#FF6B3B",
    petal_bottom: "#FF824A",
    petal_left: "#FF6B3B",
    petal_right: "#FF824A",
    shadow_top: "#D9512C",
    shadow_bottom: "#C0451F",
    shadow_left: "#D9512C",
    shadow_right: "#C0451F",
    center: "#FFE57F",
    center_shadow: "#CC9E2D",
  },
  {
    petal_top: "#9D4EDD",
    petal_bottom: "#7F3CC9",
    petal_left: "#9D4EDD",
    petal_right: "#7F3CC9",
    shadow_top: "#6A2EA1",
    shadow_bottom: "#5B2786",
    shadow_left: "#6A2EA1",
    shadow_right: "#5B2786",
    center: "#F6E27F",
    center_shadow: "#D1A92D",
  },
  {
    petal_top: "#FF4040",
    petal_bottom: "#E63434",
    petal_left: "#FF4040",
    petal_right: "#E63434",
    shadow_top: "#B32222",
    shadow_bottom: "#991818",
    shadow_left: "#B32222",
    shadow_right: "#991818",
    center: "#FFF380",
    center_shadow: "#C9A72A",
  },
  {
    petal_top: "#00C2D1",
    petal_bottom: "#00A6B3",
    petal_left: "#00C2D1",
    petal_right: "#00A6B3",
    shadow_top: "#007E8C",
    shadow_bottom: "#006B78",
    shadow_left: "#007E8C",
    shadow_right: "#006B78",
    center: "#F6F06C",
    center_shadow: "#C9AC2B",
  },
  {
    petal_top: "#F672D7",
    petal_bottom: "#E657C2",
    petal_left: "#F672D7",
    petal_right: "#E657C2",
    shadow_top: "#B14299",
    shadow_bottom: "#912D7A",
    shadow_left: "#B14299",
    shadow_right: "#912D7A",
    center: "#FDE570",
    center_shadow: "#D1A82C",
  },
  {
    petal_top: "#93E35E",
    petal_bottom: "#7AC749",
    petal_left: "#93E35E",
    petal_right: "#7AC749",
    shadow_top: "#5E9630",
    shadow_bottom: "#4C7A26",
    shadow_left: "#5E9630",
    shadow_right: "#4C7A26",
    center: "#F9F871",
    center_shadow: "#C2AD33",
  },
  {
    petal_top: "#FFB84C",
    petal_bottom: "#FFA629",
    petal_left: "#FFB84C",
    petal_right: "#FFA629",
    shadow_top: "#D97F11",
    shadow_bottom: "#B46B0F",
    shadow_left: "#D97F11",
    shadow_right: "#B46B0F",
    center: "#FFF57E",
    center_shadow: "#D1A22D",
  },
];

export const Loading = () => {
  const flowerRef = useRef<SVGSVGElement>(null);
  const [flowerColor, setFlowerColor] = useState(FLOWER_COLORS[0]);

  useGSAP(() => {
    if (!flowerRef.current) return;

    setFlowerColor(
      FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)]
    );

    const center = flowerRef.current.querySelector<SVGElement>(".center");
    const centerShadow =
      flowerRef.current.querySelector<SVGElement>(".center-shadow");
    const petals = flowerRef.current.querySelectorAll<SVGElement>(".petal");
    const petalShadows =
      flowerRef.current.querySelectorAll<SVGElement>(".petal-shadow");

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    gsap.set([center, petals, petalShadows], {
      scale: 0,
      transformOrigin: "50% 50%",
    });
    gsap.set(flowerRef.current, { rotation: 0, transformOrigin: "50% 50%" });

    tl.fromTo(
      centerShadow,
      {
        scale: 0,
        rotation: 360,
        duration: 0.3,
        ease: "expo.out",
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "expo.out",
      }
    );

      tl.to(center, {
        scale: 1,
        duration: 0.6,
        ease: "bounce.out",
      });

    tl.to(
      [...petals, ...petalShadows],
      {
        delay: 0.05,
        scale: 1,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
          each: 0.15,
          from: "start",
        },

      },
      "-=0.3"
    );

    tl.to(flowerRef.current, {
      delay: 0.15,
      scale: 0,
      opacity: 0,
      rotation: 360,
      duration: 0.6,
      ease: "expo.inOut",
    });

    return () => {
      tl.kill();
      gsap.set(flowerRef.current, { clearProps: "all" });
    };
  }, [setFlowerColor]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <FlowerIcon
        ref={flowerRef}
        className="size-56"
        flowerColor={flowerColor}
      />
    </div>
  );
};
