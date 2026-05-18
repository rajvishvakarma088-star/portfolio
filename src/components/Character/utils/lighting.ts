import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

export const CHARACTER_ACCENT_COLOR = "#ff4f4f";
const CHARACTER_LIGHT_COLOR = 0xff4f4f;

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(CHARACTER_LIGHT_COLOR, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(CHARACTER_LIGHT_COLOR, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // 🌟 Premium Red Hemisphere Light to tint ambient reflections to warm red/maroon
  const hemisphereLight = new THREE.HemisphereLight(0xff4f4f, 0x180202, 1.2);
  scene.add(hemisphereLight);

  // 🌟 High-End Red Rim Light placed behind the character to override any purple HDR reflections
  const rimLight = new THREE.DirectionalLight(0xff4f4f, 0);
  rimLight.position.set(5, 5, -8);
  scene.add(rimLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.color.set(CHARACTER_LIGHT_COLOR);
      pointLight.intensity = screenLight.material.emissiveIntensity * 16;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.25, // Lowered environment intensity to minimize purple HDR tones
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.18,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 3.5, // Animate red rim light to high intensity for glowing red edges
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
