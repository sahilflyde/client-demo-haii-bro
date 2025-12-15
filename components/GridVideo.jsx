import { useEffect } from "react";
import SectionHeader from "./sectionHeader";
import Container from "./spacing";

export default function GridVideo({
  label = "About",
  title = "Discover Hirezy",
  subtitle = "From intuitive, user-friendly tools to advanced integrations with the platforms you already use, Hirezy streamlines the hiring journey so your team can focus on what matters most: finding and securing the right talent.",
  centerTitle = "center",
  videoSrc = "https://ik.imagekit.io/a9uxeuyhx/5439079-uhd_3840_2160_25fps.mp4?updatedAt=1762022380391",
  imageSrc = "",
  variant = "video",
}) {
  useEffect(() => {
    const initializeVideoAnimation = () => {
      const videoContainer = document.querySelector(".video");
      const videoElement = document.querySelector(".video video");

      if (!videoContainer || !videoElement) {
        setTimeout(initializeVideoAnimation, 100);
        return;
      }

      videoContainer.style.position = "relative";
      videoContainer.style.transformOrigin = "center center";

      let hasReachedFullSize = false;
      let animationFrameId = null;

      const handleScroll = () => {
        if (hasReachedFullSize) return;

        const rect = videoContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const videoTop = rect.top;
        const videoBottom = rect.bottom;
        const triggerStart = windowHeight;
        const triggerEnd = windowHeight * 0.3;

        let progress = 0;
        if (videoTop < triggerStart && videoBottom > 0) {
          const distanceFromTop = Math.max(0, triggerStart - videoTop);
          const totalRange = triggerStart - triggerEnd;
          progress = Math.min(1, distanceFromTop / totalRange);
        }

        const scale = 0.7 + 0.3 * progress;

        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          videoContainer.style.transform = `scale(${scale})`;
          if (progress >= 0.95) {
            hasReachedFullSize = true;
            videoContainer.style.transform = `scale(1)`;
          }
        });
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });

      setTimeout(() => handleScroll(), 200);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    };

    const cleanup = initializeVideoAnimation();
    return cleanup;
  }, []);

  return (
    <div>
      <Container variant="primary" className="mainSec">
        <SectionHeader
          label={label || ""}
          title={title || ""}
          subtitle={subtitle || ""}
          align={centerTitle.toLowerCase()}
          className=""
        />
        {variant == "video" ? (
          <div className="video">
            <video autoPlay loop muted playsInline src={videoSrc || ""} />
          </div>
        ) : (
          <img
            src={imageSrc}
            alt="media"
            className="w-full h-auto rounded-[24px] object-cover"
          />
        )}
      </Container>
    </div>
  );
}
