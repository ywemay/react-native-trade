import { useState } from "react";
import uploadImage from "@/api/products_images/upload";

export default function useUploadImages(props = {}) {
  
  const [ errors, setErrors ] = useState([])
  const [ uploaded, setUploaded ] = useState([])
  const [ progress, setProgress ] = useState(0)

  const upload = async ({images, ...params }) => {
    const { bucket, subdir } = { ...props, ...params}
    setProgress(0)
    const ups = [];
    for (let i = 0; i < images.length; i++) {
      try {
        const image = images[i];
        const { uri } = image;
        const result = await uploadImage({ uri, bucket: bucket || 'images', subdir });
        ups.push(result);
      } catch(e) {
        await console.error(e)
        await setErrors(prev => [...prev, e])
      }
      await setProgress(prev => prev + 1)
    }
    await setUploaded(ups);
    return ups;
  }
  return { upload, errors, uploaded, progress }
}