import TextInput from "../components/form/TextInput";
import CloseDefaultIcon from "../icons/CloseDefault";

export default function Dropdown() {
  return (
    <div className="h-full px-20">
      <div className="leading-[1.15rem] border-b-[1.25px] border-b-[#363636] pb-[0.35rem] mb-2">
        <h3 className="font-semibold text-[0.82rem]">Dropdown</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">Custom dropdown menu</p>
      </div>

      <div className="border-b-[#363636] border-b-[1.25px]">
        <TextInput label="Label" />
        <TextInput label="Field name" />
      </div>

      <div className="mt-[0.3rem]">
        <p className="text-[0.77rem] box-border inline-block font-light text-[#ABABAB]">Sub Items</p>

        <div className="flex gap-1 justify-between items-center">
          <div className="flex-1">
            <TextInput placeholder="1000$" />
          </div>
          <div className="bg-[#5E5E5E] box-border mb-2 p-1 border-[#363636] border-[1px] rounded-sm cursor-pointer">
            <CloseDefaultIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
