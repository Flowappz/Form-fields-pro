import { useState } from "react";
import TextInput from "../components/form/TextInput";
import { ZodError, z } from "zod";
import { useAppContext } from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner";
import { useFocus } from "../hooks/useFocus";

const inputSchema = z.object({
  inputName: z.string().min(1, "Please enter the input name"),
});

export default function CollectUserIp() {
  const { form } = useAppContext();
  const [inputName, setInputName] = useState("");

  const [errors, setErrors] = useState<any>({});
  const { Banner, showBanner } = useElementInsertedBanner();
  const { focusRef } = useFocus<HTMLDivElement>();

  const validateData = () => {
    try {
      inputSchema.parse({
        inputName,
      });

      setErrors({});

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorsByField: { [x: string]: string } = {};

        for (let issue of err.errors) {
          const { path, message } = issue;
          const field = path.length === 1 ? path[0] : path.join(".");

          errorsByField[field] = message;
        }

        setErrors(errorsByField);
      }
    }
  };

  const handleInsert = async () => {
    if (validateData() && form) {
      await webflowService.insertUserIpInputToForm({
        form,
        inputName,
      });

      showBanner();
    }
  };

  return (
    <div className="h-full px-20 pt-10" ref={focusRef} tabIndex={0}>
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Collect User IP</h3>
        <p className="text-[0.77rem]  text-[#ABABAB]">
          A hidden input field that will automatically collect the user's IP address and submit it with other form data.
        </p>
      </div>

      <div className="mb-2 border-b-[1.25px] border-b-[#363636] pb-2">
        <p className="text-[#ABABAB] text-[0.77rem] italic">
          <span className="font-bold">Important Notice:</span> This section collects user IP addresses. Please ensure
          compliance with data protection laws, including GDPR, in your respective region when utilizing this feature.
          Obtaining explicit consent from individuals whose IP addresses may be collected and processed is crucial. For
          detailed information on our data handling and user data protection practices, kindly refer to our{" "}
          <a href="https://flowappz.com/privacy-policy.html" target="_blank" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput label="Field name" name="input" value={inputName} onChange={setInputName} error={errors.inputName} />
      </div>

      <div className="mt-[0.3rem]">
        <Banner />
        <div className="mt-2">
          <button
            className="boxShadows-action-colored w-full bg-[#0073E6] text-center text-[0.77rem] py-1 border-[#363636] border-[1px] rounded-[4px]"
            onClick={handleInsert}
          >
            Insert field
          </button>
        </div>
      </div>
    </div>
  );
}
