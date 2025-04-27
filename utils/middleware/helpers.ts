


export function getOptimizedCloudinaryUrl(url: string, width : Number) {
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
}
