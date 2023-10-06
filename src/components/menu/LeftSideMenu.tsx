import ChevronRightIcon from "../../icons/ChevronRight";
import { MENU_ITEMS, type MenuItem } from "../../config/menu";
import React, { PropsWithChildren } from "react";

const NotAvailableMenuItem: React.FC<PropsWithChildren<{ item: MenuItem }>> = ({ item }) => {
  const { label } = item;
  return (
    <div className="py-2 flex justify-between items-center border-t-[1.5px] border-t-[#363636] p-3">
      <div className="leading-[1.15rem]">
        <h3 className="font-bold text-[0.82rem]">{label}</h3>
        <p className="text-[0.79rem] font-light text-[#FFC700]">Coming soon</p>
      </div>
      <ChevronRightIcon />
    </div>
  );
};

export default function LeftSideMenu() {
  return (
    <>
      <div className="p-[0.45rem] py-[0.65rem]">
        <input type="text" placeholder="Search" className="w-full px-[0.3rem] bg-[#2B2B2B] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none" />
      </div>

      {MENU_ITEMS.map((item) => (item.available ? null : <NotAvailableMenuItem key={item.id} item={item} />))}

      <div className="py-2 flex justify-between items-center border-t-[1.5px] border-t-[#363636] bg-[#212121] p-3">
        <div className="leading-[1.15rem]">
          <h3 className="font-bold text-[0.82rem]">Dropdown</h3>
          <p className="text-[0.8rem] font-light text-[#ABABAB]">Custom dropdown menu</p>
        </div>
        <ChevronRightIcon />
      </div>

      <div className="py-2 flex justify-between items-center border-t-[1.5px] border-t-[#363636] p-3">
        <div className="leading-[1.15rem]">
          <h3 className="font-bold text-[0.82rem]">Dropdown</h3>
          <p className="text-[0.8rem] font-light text-[#ABABAB]">Custom dropdown menu</p>
        </div>
        <ChevronRightIcon />
      </div>

      <div className="py-2 flex justify-between items-center border-t-[1.5px] border-t-[#363636] p-3">
        <div className="leading-[1.15rem]">
          <h3 className="font-bold text-[0.82rem]">URL Picker</h3>
          <p className="text-[0.79rem] font-light text-[#FFC700]">Coming soon</p>
        </div>
        <ChevronRightIcon />
      </div>
    </>
  );
}
