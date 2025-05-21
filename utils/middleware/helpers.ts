export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "") // Remove special characters
    .replace(/\\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Collapse multiple dashes
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());


export function extractPublicId(imageUrl: string): string | null {
  const parts = imageUrl.split("/upload/");
  if (parts.length < 2) return null;

  const [folderAndFilename] = parts[1].split(".");
  return folderAndFilename;
}
