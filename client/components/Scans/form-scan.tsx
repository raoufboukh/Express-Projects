import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useRef, useState } from "react";

const ScanForm = () => {
  const [image, setImage] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    const file = ref.current?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      enqueueSnackbar("Please select an image file", { variant: "error" });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result as string);
    };
    if (ref.current) ref.current.value = "";
  };
  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        ref={ref}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
      <div
        className="bg-gray-800 rounded-md shadow-md border-2 border-dashed border-white cursor-pointer flex items-center justify-center h-80 sm:h-110 sm:w-[600px]"
        onClick={() => ref.current?.click()}
      >
        {image ? (
          <Image
            src={image}
            alt="Uploaded"
            className="size-full rounded-md"
            width={1000}
            height={1000}
          />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </div>
    </div>
  );
};

export default ScanForm;
