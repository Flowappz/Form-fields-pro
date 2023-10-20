import { useState } from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";

const inputSchema = z.object({
  inputName: z.string().min(1, "Please enter the input name"),
});

export default function CollectUserIp() {
  const { form } = useAppContext();

  const [inputName, setInputName] = useState("");

  const [errors, setErrors] = useState<any>({});

  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Collect User IP</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">
          A hidden input field that will automatically collect the user's IP address and submit it with other form data.
        </p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput label="Field name" name="input" value={inputName} onChange={setInputName} error={errors.inputName} />
      </div>

      <div className="mt-[0.3rem]">
        <div className="mt-2">
          <button
            className="w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-sm"
            // onClick={handleInsert}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
