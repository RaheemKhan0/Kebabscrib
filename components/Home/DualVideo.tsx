import { optimizeVideo, videoPoster } from "@utils/cloudinary";

const VIDEO_LEFT =
  "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543814/Where_to_find_us_ly7rfm.mp4";
const VIDEO_RIGHT =
  "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543834/Vibe_Video_j6agrr.mp4";

const DualVideo = () => {
  return (
    <section className="relative z-10 w-full min-h-screen bg-textured-eggshell flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
        <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2">
          {/* Left video */}
          <div className="relative aspect-[9/16] sm:aspect-[4/5]  overflow-hidden shadow-lg bg-KC_GREEN/5">
            <video
              src={optimizeVideo(VIDEO_LEFT, 1200)}
              poster={videoPoster(VIDEO_LEFT, 800)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right video */}
          <div className="relative aspect-[9/16] sm:aspect-[4/5]  overflow-hidden shadow-lg bg-KC_GREEN/5">
            <video
              src={optimizeVideo(VIDEO_RIGHT, 1200)}
              poster={videoPoster(VIDEO_RIGHT, 800)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualVideo;
