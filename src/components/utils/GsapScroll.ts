import * as THREE from "three";
import gsap from "gsap";
import { CHARACTER_ACCENT_COLOR } from "../Character/utils/lighting";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);
  const isMobile = window.innerWidth <= 1024;
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: isMobile ? "top bottom" : "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          monitor = child;
          child.material.color.set(CHARACTER_ACCENT_COLOR);
          child.material.emissive?.set(CHARACTER_ACCENT_COLOR);
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.color.set(CHARACTER_ACCENT_COLOR);
      object.material.emissive.set(CHARACTER_ACCENT_COLOR);
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });
  let neckBone = character?.getObjectByName("spine005");
  if (character) {
    const charXDest = isMobile ? "0%" : "-25%";
    const charXDest2 = isMobile ? "0%" : "-12%";
    const aboutYStart = isMobile ? "0%" : "-50%";
    const aboutYDest = isMobile ? "0%" : "30%";
    const whatYDest = isMobile ? "0%" : "15%";

    tl1
      .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
      .to(camera.position, { z: isMobile ? 18 : 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: charXDest, duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: aboutYStart }, { y: "0%" }, 0);

    tl2
      .to(
        camera.position,
        { z: isMobile ? 85 : 75, y: isMobile ? 7.5 : 8.4, duration: isMobile ? 3 : 6, delay: isMobile ? 1 : 2, ease: "power3.inOut" },
        0
      )
      .to(".about-section", { y: aboutYDest, duration: isMobile ? 3 : 6 }, 0)
      .to(".about-section", { opacity: isMobile ? 1 : 0, delay: isMobile ? 1.5 : 3, duration: isMobile ? 1 : 2 }, 0)
      .to(".character-model", { opacity: isMobile ? 0 : 1, duration: isMobile ? 2 : 0, delay: isMobile ? 6 : 0 }, 0)
      .to(".character-model", { y: isMobile ? "20%" : "0%", duration: isMobile ? 3 : 6 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: charXDest2, delay: isMobile ? 1 : 2, duration: isMobile ? 2.5 : 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: isMobile ? 1.5 : 3, duration: isMobile ? 1.5 : 3 }, 0)
      .to(neckBone!.rotation, { x: 0.6, delay: isMobile ? 1 : 2, duration: isMobile ? 1.5 : 3 }, 0)
      .to(monitor.material, { opacity: 1, duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 1.6 : 3.2 }, 0)
      .to(screenLight.material, { opacity: 1, duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 2.25 : 4.5 }, 0)
      .fromTo(
        ".what-box-in",
        { display: isMobile ? "flex" : "none" },
        { display: "flex", duration: 0.1, delay: isMobile ? 3 : 6 },
        0
      )
      .fromTo(
        monitor.position,
        { y: -10, z: 2 },
        { y: 0, z: 0, delay: isMobile ? 0.75 : 1.5, duration: isMobile ? 1.5 : 3 },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: isMobile ? 2.5 : 5, delay: isMobile ? 1 : 2 },
        0.3
      );

    tl3
      .fromTo(
        ".character-model",
        { y: isMobile ? "20%" : "0%" },
        { y: "-100%", duration: 4, ease: "none", delay: 1 },
        0
      )
      .fromTo(".whatIDO", { y: 0 }, { y: whatYDest, duration: 2 }, 0)
      .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 50%",
      end: "bottom 30%",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "0%" },
      { maxHeight: "100%", duration: 1, ease: "none" },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
