import React, { useEffect, useMemo, useRef } from "https://esm.sh/react@18.3.1";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { Draggable } from "https://esm.sh/gsap@3.12.5/Draggable";

gsap.registerPlugin(Draggable);

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const StickerPeel = ({
  imageSrc,
  rotate = -7,
  peelBackHoverPct = 24,
  peelBackActivePct = 38,
  width = "clamp(250px, 30vw, 430px)",
  shadowIntensity = 0.58,
  lightingIntensity = 0.12,
  initialPosition = "center",
  peelDirection = 0,
  className = ""
}) => {
  const containerRef = useRef(null);
  const dragTargetRef = useRef(null);
  const pointLightRef = useRef(null);
  const pointLightFlippedRef = useRef(null);
  const draggableInstanceRef = useRef(null);

  const cssVars = useMemo(
    () => ({
      "--sticker-rotate": `${rotate}deg`,
      "--sticker-p": "10px",
      "--sticker-peelback-hover": `${peelBackHoverPct}%`,
      "--sticker-peelback-active": `${peelBackActivePct}%`,
      "--sticker-width": typeof width === "number" ? `${width}px` : width,
      "--sticker-shadow-opacity": shadowIntensity,
      "--sticker-lighting-constant": lightingIntensity,
      "--peel-direction": `${peelDirection}deg`,
      "--sticker-image-url": `url("${imageSrc}")`
    }),
    [rotate, peelBackHoverPct, peelBackActivePct, width, shadowIntensity, lightingIntensity, peelDirection, imageSrc]
  );

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return undefined;

    if (typeof initialPosition === "object" && initialPosition !== null) {
      gsap.set(target, {
        x: initialPosition.x || 0,
        y: initialPosition.y || 0
      });
    }

    const parent = target.parentNode;

    draggableInstanceRef.current = Draggable.create(target, {
      type: "x,y",
      bounds: parent,
      inertia: false,
      onDrag() {
        const rot = clamp(this.deltaX * 0.35, -18, 18);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: "power1.out" });
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.7, ease: "power2.out" });
      }
    })[0];

    const handleResize = () => draggableInstanceRef.current?.update();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      draggableInstanceRef.current?.kill();
    };
  }, [initialPosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateLight = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      gsap.set(pointLightRef.current, { attr: { x, y } });
      gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
    };

    const touchStart = () => container.classList.add("touch-active");
    const touchEnd = () => container.classList.remove("touch-active");

    container.addEventListener("mousemove", updateLight);
    container.addEventListener("touchstart", touchStart);
    container.addEventListener("touchend", touchEnd);
    container.addEventListener("touchcancel", touchEnd);

    return () => {
      container.removeEventListener("mousemove", updateLight);
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchend", touchEnd);
      container.removeEventListener("touchcancel", touchEnd);
    };
  }, []);

  return React.createElement(
    "div",
    {
      className: `sticker-peel-react-draggable ${className}`.trim(),
      ref: dragTargetRef,
      style: cssVars
    },
    React.createElement(
      "svg",
      {
        width: "0",
        height: "0",
        "aria-hidden": "true",
        focusable: "false"
      },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "filter",
          { id: "problemStickerPointLight" },
          React.createElement("feGaussianBlur", { stdDeviation: "1", result: "blur" }),
          React.createElement(
            "feSpecularLighting",
            {
              result: "spec",
              in: "blur",
              specularExponent: "100",
              specularConstant: lightingIntensity,
              lightingColor: "white"
            },
            React.createElement("fePointLight", { ref: pointLightRef, x: "100", y: "100", z: "300" })
          ),
          React.createElement("feComposite", { in: "spec", in2: "SourceGraphic", result: "lit" }),
          React.createElement("feComposite", { in: "lit", in2: "SourceAlpha", operator: "in" })
        ),
        React.createElement(
          "filter",
          { id: "problemStickerPointLightFlipped" },
          React.createElement("feGaussianBlur", { stdDeviation: "10", result: "blur" }),
          React.createElement(
            "feSpecularLighting",
            {
              result: "spec",
              in: "blur",
              specularExponent: "100",
              specularConstant: lightingIntensity * 7,
              lightingColor: "white"
            },
            React.createElement("fePointLight", { ref: pointLightFlippedRef, x: "100", y: "100", z: "300" })
          ),
          React.createElement("feComposite", { in: "spec", in2: "SourceGraphic", result: "lit" }),
          React.createElement("feComposite", { in: "lit", in2: "SourceAlpha", operator: "in" })
        ),
        React.createElement(
          "filter",
          { id: "problemStickerDropShadow" },
          React.createElement("feDropShadow", {
            dx: "2",
            dy: "4",
            stdDeviation: 3 * shadowIntensity,
            floodColor: "black",
            floodOpacity: shadowIntensity
          })
        ),
        React.createElement(
          "filter",
          { id: "problemStickerExpandAndFill" },
          React.createElement("feOffset", { dx: "0", dy: "0", in: "SourceAlpha", result: "shape" }),
          React.createElement("feFlood", { floodColor: "rgb(238,238,228)", result: "flood" }),
          React.createElement("feComposite", { operator: "in", in: "flood", in2: "shape" })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "sticker-container", ref: containerRef },
      React.createElement(
        "div",
        { className: "sticker-main" },
        React.createElement(
          "div",
          { className: "sticker-lighting" },
          React.createElement("span", { className: "sticker-white-backing", "aria-hidden": "true" }),
          React.createElement("img", {
            src: imageSrc,
            alt: "",
            className: "sticker-image",
            draggable: "false",
            onContextMenu: (event) => event.preventDefault()
          })
        )
      ),
      React.createElement(
        "div",
        { className: "flap" },
        React.createElement(
          "div",
          { className: "flap-lighting" },
          React.createElement("img", {
            src: imageSrc,
            alt: "",
            className: "flap-image",
            draggable: "false",
            onContextMenu: (event) => event.preventDefault()
          })
        )
      )
    )
  );
};

export default StickerPeel;
