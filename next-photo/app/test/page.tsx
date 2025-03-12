import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export default function TestPage() {
  return (
    <div>
      <h1>Upload an Image</h1>
      <Form />
    </div>
  );
}

export function Form() {
  async function uploadImage(formData: FormData) {
    "use server";
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    revalidatePath("/");
    return;
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button type="submit">Upload</button>
    </form>
  );
}
