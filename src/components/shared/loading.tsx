"use client";

import { FlowerIcon } from "@/components/icons/flower";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const PETAL_COLORS = ["#CF485E", "#DA5A69", "#CF485E", "#DA5A69"];
const PETAL_SHADOW_COLORS = ["#C04D65", "#B3445B", "#C04D65", "#B3445B"];
const CENTER_COLORS = ["#D4C790", "#D4C790", "#D4C790", "#D4C790"];
const CENTER_SHADOW_COLORS = ["#D4C790", "#D4C790", "#D4C790", "#D4C790"];

export const Loading = () => {
  const flowerRef = useRef<SVGSVGElement>(null);

  const [petalColor, setPetalColor] = useState(PETAL_COLORS[0]);
  const [petalShadowColor, setPetalShadowColor] = useState(
    PETAL_SHADOW_COLORS[0]
  );
  const [centerColor, setCenterColor] = useState(CENTER_COLORS[0]);
  const [centerShadowColor, setCenterShadowColor] = useState(
    CENTER_SHADOW_COLORS[0]
  );

  useGSAP(() => {
    if (!flowerRef.current) return;

    const center = flowerRef.current.querySelector<SVGElement>(".center");
    const centerShadow =
      flowerRef.current.querySelector<SVGElement>(".center-shadow");
    const petals = flowerRef.current.querySelectorAll<SVGElement>(".petal");
    const petalShadows =
      flowerRef.current.querySelectorAll<SVGElement>(".petal-shadow");

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // Reset scales and rotations
    gsap.set([center, petals, petalShadows], {
      scale: 0,
      transformOrigin: "50% 50%",
    });
    gsap.set(flowerRef.current, { rotation: 0, transformOrigin: "50% 50%" });

    // 1) Aparece el centro con scale-up + bounce
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

    // 2) Aparece pétalos y sombras en sentido horario, stagger con scale-up y ease normal
    tl.to(
      [...petals, ...petalShadows],
      {
        delay: 0.4,
        scale: 1,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
          each: 0.15,
          from: "start", // suponemos que están ordenados en sentido horario
        },
        onStart() {
          // Mientras aparecen los pétalos, la flor gira sutilmente
          gsap.to(flowerRef.current, {
            rotation: "+=45",
            duration: 0.6,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          });
        },
      },
      "-=0.3" // solapa un poco con el centro para más fluidez
    );

    tl.to(flowerRef.current, {
      delay: 0.15,
      scale: 0,
      duration: 0.6,
      ease: "expo.inOut",
    });

    return () => {
      tl.kill();
      gsap.set(flowerRef.current, { clearProps: "all" });
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <FlowerIcon
        ref={flowerRef}
        className="size-56"
        petalColor={petalColor}
        petalShadowColor={petalShadowColor}
        centerColor={centerColor}
        centerShadowColor={centerShadowColor}
      />
    </div>
  );
};
