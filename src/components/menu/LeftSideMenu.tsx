import ChevronRightIcon from "../../icons/ChevronRight";
import { MENU_ITEMS, type MenuId, type MenuItem } from "../../config/menu";
import React, { PropsWithChildren } from "react";

const NotAvailableMenuItem: React.FC<PropsWithChildren<{ item: MenuItem }>> = ({ item }) => {
  const { label } = item;
  return (
    <div className="py-2 flex justify-between items-center border-t-[1.5px] border-t-[#363636] p-3">
      <div className="leading-[1.15rem]">
        <h3 className="font-semibold text-[0.82rem]">{label}</h3>
        <p className="text-[0.75rem] font-light text-[#FFC700]">Coming soon</p>
      </div>
      <ChevronRightIcon />
    </div>
  );
};

interface IMenuItemComponentProps extends PropsWithChildren {
  item: MenuItem;
  onClick: (id: MenuId) => void;
}

const AvailableMenuItem: React.FC<IMenuItemComponentProps> = ({ item, onClick }) => {
  const { id, label, description } = item;

  return (
    <div
      className="py-2 flex justify-between items-center border-t-[1.5px] border-t-[#363636] bg-[#212121] p-3"
      onClick={() => onClick(id)}
    >
      <div className="leading-[1.15rem]">
        <h3 className="font-semibold text-[0.82rem]">{label}</h3>
        <p className="text-[0.77rem] font-light text-[#ABABAB]">{description}</p>
      </div>
      <ChevronRightIcon />
    </div>
  );
};

interface MenuProps extends PropsWithChildren {
  onClick: (id: MenuId) => void;
}

export default function LeftSideMenu({ onClick }: MenuProps) {
  return (
    <>
      <div className="p-[0.45rem] py-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-[0.3rem] bg-[#2B2B2B] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none"
        />
      </div>

      {MENU_ITEMS.map((item) =>
        item.available ? (
          <AvailableMenuItem key={item.id} item={item} onClick={onClick} />
        ) : (
          <NotAvailableMenuItem key={item.id} item={item} />
        )
      )}
    </>
  );
}
