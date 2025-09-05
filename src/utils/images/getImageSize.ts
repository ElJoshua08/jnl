import sizeOf from "image-size";

export async function getImageSize(
  file: File
): Promise<{ width: number; height: number }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const { width, height } = sizeOf(buffer);
  return { width: width ?? 0, height: height ?? 0 };
}
