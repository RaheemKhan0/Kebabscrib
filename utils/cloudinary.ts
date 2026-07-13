/* Cloudinary URL transform helpers — adds optimization params to existing URLs.
   Pass an existing Cloudinary URL and a size hint; returns a transformed URL. */

const VIDEO_BASE = "https://res.cloudinary.com/dpqto9jrm/video/upload/";

/**
 * Optimize a Cloudinary video URL.
 * - q_auto: automatic quality
 * - f_auto: automatic format (WebM where supported)
 * - vc_auto: automatic codec
 * - w_<width>: max width (videos resize down)
 */
export function optimizeVideo(url: string, width: number = 1200): string {
  if (!url.startsWith(VIDEO_BASE)) return url;
  const transforms = `q_auto,f_auto,vc_auto,w_${width}`;
  // If transforms already exist, don't double them
  if (url.includes(`/upload/${transforms}/`)) return url;
  return url.replace(VIDEO_BASE, `${VIDEO_BASE}${transforms}/`);
}

/**
 * Generate a poster image URL from a Cloudinary video.
 * Extracts a frame at the given offset (default: 1 second in) as JPG.
 */
export function videoPoster(videoUrl: string, width: number = 800, second: number = 1): string {
  if (!videoUrl.startsWith(VIDEO_BASE)) return "";
  // Replace /video/upload/ with /image/upload/ and add poster transforms
  // so_<seconds>: extract frame at this second
  // f_jpg: output as jpg
  return videoUrl
    .replace("/video/upload/", "/video/upload/")
    .replace(VIDEO_BASE, `${VIDEO_BASE}so_${second},w_${width},q_auto,f_jpg/`)
    .replace(/\.mp4$/, ".jpg");
}
