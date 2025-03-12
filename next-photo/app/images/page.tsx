import { list } from "@vercel/blob";
import Image from "next/image";

export default async function Images() {
  async function allImages() {
    const blobs = await list();
    return blobs;
  }
  const images = await allImages();

  return (
    <section>
      {images.blobs.map((image, index) => (
        <Image
          priority
          key={index}
          src={image.url}
          alt="Image"
          width={200}
          height={200}
        />
      ))}
    </section>
  );
}
