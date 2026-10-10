import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { useCopy } from "../copy";
import { Arrow, Button, Copy } from "./Shared";
const HeroScene = lazy(() => import("./HeroScene"));
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function OrbitFallback() {
  return (
    <div className="orbit-fallback" aria-hidden="true">
      <div className="orbit-core" />
      <i className="orbit orbit-one" />
      <i className="orbit orbit-two" />
      <i className="orbit orbit-three" />
      <div className="orbit-star" />
    </div>
  );
}
export default function Hero() {
  const { t } = useCopy();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const visual = useRef(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let cancelled = false,
      timer;
    const check = () => {
      clearTimeout(timer);
      if (!media.matches || navigator.connection?.saveData) {
        setEnabled(false);
        return;
      }
      timer = setTimeout(() => {
        if (cancelled) return;
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (gl) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          setEnabled(true);
        }
      }, 900);
    };
    check();
    media.addEventListener("change", check);
    const observer = new IntersectionObserver((entries) =>
      setVisible(entries[0].isIntersecting),
    );
    observer.observe(visual.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer.disconnect();
      media.removeEventListener("change", check);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            {t("independent")}
          </p>
          <h1 id="hero-title">
            <Copy id="heroA" />
            <br />
            <Copy id="heroB" className="accent" />
            <br />
            <Copy id="heroC" className="accent" />
          </h1>
          <Copy as="p" id="heroIntro" className="hero-description" />
          <div className="hero-actions">
            <Button>
              <Copy id="heroAction" />
            </Button>
            <a className="text-link" href="#work">
              <Copy id="heroSecondary" />
              <Arrow />
            </a>
          </div>
          <p className="hero-signoff">
            <span />
            <Copy id="heroFoot" />
          </p>
        </div>
        <div
          className="hero-visual"
          ref={visual}
          role="img"
          aria-label={t("sceneLabel")}
        >
          <div className="scene-cross cross-one" aria-hidden="true">
            +
          </div>
          <div className="scene-cross cross-two" aria-hidden="true">
            +
          </div>
          <OrbitFallback />
          {enabled && (
            <SceneBoundary>
              <Suspense fallback={null}>
                <HeroScene active={visible && pageVisible && !paused} />
              </Suspense>
            </SceneBoundary>
          )}
          <span className="scene-coordinate" aria-hidden="true">
            SYSTEM / 01
            <br />
            GROWTH IN MOTION
          </span>
          <div className="scene-tag tag-media" aria-hidden="true">
            <i />
            Paid media<span>01</span>
          </div>
          <div className="scene-tag tag-data" aria-hidden="true">
            <i />
            Measurement<span>02</span>
          </div>
          <div className="scene-tag tag-growth" aria-hidden="true">
            <i />
            Growth<span>03</span>
          </div>
          <span className="scene-caption" aria-hidden="true">
            {t("illustrative")}
          </span>
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#results">
          <span className="scroll-icon" aria-hidden="true">
            ↓
          </span>
          {t("scroll")}
        </a>
        <span>{t("location")}</span>
        {enabled && (
          <button
            onClick={() => setPaused(!paused)}
            className="motion-control"
            aria-pressed={paused}
          >
            {paused ? "▷" : "Ⅱ"} {t(paused ? "play" : "pause")}
          </button>
        )}
      </div>
    </section>
  );
}
