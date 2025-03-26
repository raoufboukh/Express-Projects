import { useState } from "react";
import Labs from "./Labs";
import ScanForm from "./form-scan";

function Scan() {
  const [id, setId] = useState(1);
  const [number, setNumber] = useState(0);
  return (
    <div className="">
      {number === 0 ? <Labs id={id} setId={setId} /> : <ScanForm />}
      <div className="flex justify-center items-center gap-5">
        <button
          className={`${
            number === 1 ? "block" : "hidden"
          } bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500/80 transition-all duration-300 mt-5`}
          onClick={() => setNumber(0)}
        >
          Back
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/80 transition-all duration-300 mt-5"
          onClick={() => setNumber(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Scan;
