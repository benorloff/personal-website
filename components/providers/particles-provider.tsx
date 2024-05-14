"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useTheme,  } from "next-themes";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const variants = [
  {
    color: "dark-red",
    bg: "hsla(351, 90%, 51%, 0.1), hsla(0, 0%, 0%, 1)",
    particles: ["#f31637", "#f53d59", "#F7647A", "#F7647A", "#FBB1BC"]
  },
  {
    color: "light-red",
    bg: "hsla(351, 90%, 51%, 0.1), hsla(0, 0%, 0%, 0)",
    particles: ["#f31637", "#f53d59", "#F7647A", "#F7647A", "#FBB1BC"]
  },
  {
    color: "dark-green",
    bg: "hsla(110, 90%, 51%, 0.1), hsla(0, 0%, 0%, 1)",
    particles: ["#37F312", "#5CF53D", "#7CF764", "#9DF98B", "#BEFBB1"]
  },
  {
    color: "light-green",
    bg: "hsla(110, 90%, 51%, 0.1), hsla(0, 0%, 0%, 0)",
    particles: ["#37F312", "#5CF53D", "#7CF764", "#9DF98B", "#BEFBB1"]
  },
  {
    color: "dark-blue",
    bg: "hsla(240, 100%, 51%, 0.1), hsla(0, 0%, 0%, 1)",
    particles: ["#0505FF", "#3333FF", "#5C5CFF", "#8585FF", "#ADADFF"]
  },
  {
    color: "light-blue",
    bg: "hsla(240, 100%, 51%, 0.1), hsla(0, 0%, 0%, 0)",
    particles: ["#0505FF", "#3333FF", "#5C5CFF", "#8585FF", "#ADADFF"]
  },
]

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
      // await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, [theme]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  let options: ISourceOptions = useMemo(
    () => ({
      background: { 
        image: `radial-gradient(${variants.find((v) => v.color === theme)?.bg}`,
      },
      fpsLimit: 40,
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: "emitter",
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
              distance: 50,
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
          value: variants.find((v) => v.color === theme)?.particles,
        },
        opacity: {
          value: {min: 0.1, max: 0.3},
          random: true,
        },
        size: {
          value: { min: 3, max: 10 },
          random: true,
        },
        shadow: {
          enable: true,
          blur: 50,
          color: "#000000",
        },
        move: {
          enable: true,
          speed: { min: 1, max: 1.5 },
          random: true,
        },
        collisions: {
          enable: true,
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};
