import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useRef } from "react";

interface ScanFormProps {
  image: File | null;
  setImage: (image: File | null) => void;
  classifyImage: () => void;
}

const ScanForm = ({ image, setImage, classifyImage }: ScanFormProps) => {
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
    setImage(file);
    if (ref.current) ref.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold text-white underline">
        Upload an X-ray Image
      </h2>
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
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="size-full rounded-md"
            width={1000}
            height={1000}
          />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </div>
      <button
        onClick={classifyImage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={!image}
      >
        Classify Image
      </button>
    </div>
  );
};

export default ScanForm;
