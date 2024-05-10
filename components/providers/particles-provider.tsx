"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
  tsParticles,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useTheme } from "next-themes";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export const ParticlesProvider = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const optionsDark: ISourceOptions = useMemo(
    () => ({
      background: { 
        image: "radial-gradient(#4a0000, #000)",
      },
      fpsLimit: 40,
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        move: {
          enable: true,
          speed: 1,
          random: false,
        },
      },
      detectRetina: true,
    }),
    []
  );

  const optionsLight: ISourceOptions = useMemo(
    () => ({
      background: { 
        image: "radial-gradient(#ff6b6b, #fff)",
      },
      fpsLimit: 40,
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        move: {
          enable: true,
          speed: 1,
          random: false,
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={theme === "dark" ? optionsDark : optionsLight}
      />
    );
  }

  return <></>;
};
