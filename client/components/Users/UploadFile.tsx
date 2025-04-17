import { addResult } from "@/lib/data-fetching";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
interface UploadFileProps {
  file: string | null;
  setFile: (file: string | null) => void;
  setId: (id: string) => void;
  item: any;
  id: string;
}

const UploadFile = ({ file, setFile, setId, id, item }: UploadFileProps) => {
  const { mutate } = useMutation({
    mutationFn: () => addResult(id, { image: file }),
    onSuccess: () => {
      setFile(null);
    },
    onError: (error) => {
      enqueueSnackbar("Error uploading file", { variant: "error" });
    },
  });
  return (
    file && (
      <div className="bg-black/30 absolute top-0 left-0 size-full flex justify-center items-center z-10">
        <div className="flex flex-col justify-center items-center bg-white">
          <Image
            src={file}
            alt="xray"
            width={500}
            height={500}
            className=" basis-full h-96 object-contain"
          />
          <p className="text-black text-center mt-2">
            Are you sure you want to upload this file? to{" "}
            {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
            's account?
          </p>
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md cursor-pointer"
              onClick={() => {
                setId(item._id);
                mutate();
              }}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
              onClick={() => {
                setFile(null);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UploadFile;
