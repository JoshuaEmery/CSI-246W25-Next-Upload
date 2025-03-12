import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export default function TestPage() {
  async function uploadImage(formData: FormData) {
    "use server";
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    //As soon as this await
    console.log(`The image url is ${blob.url}`);
    revalidatePath("/");
    //once I have the url
    //If I needed to I could create a new mongoose model and save it
    //save the blob.url inside of your mongoose model - mov
    return;
  }

  return (
    <div>
      <h1>Upload an Image</h1>
      <div>
        <form action={uploadImage}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
