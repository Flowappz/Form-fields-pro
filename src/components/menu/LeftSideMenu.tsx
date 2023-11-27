import ChevronRightIcon from "../../icons/ChevronRight";
import {MENU_ITEMS, type MenuId, type MenuItem} from "../../config/menu";
import React, {PropsWithChildren} from "react";

const NotAvailableMenuItem: React.FC<PropsWithChildren<{ item: MenuItem }>> = ({item}) => {
    const {label} = item;
    return (
      <div className="py-2 flex justify-between items-center border-t-[1.25px] border-t-[#363636] p-3">
        <div className="leading-[1.15rem]">
          <h3 className="font-semibold text-[0.82rem]">{label}</h3>
          <p className="text-[0.75rem]  text-[#FFC700]">Coming soon</p>
        </div>
        <ChevronRightIcon />
      </div>
    );
};

interface IMenuItemComponentProps extends PropsWithChildren {
    item: MenuItem;
    selected: boolean;
    onClick: (id: MenuId) => void;
}

const AvailableMenuItem: React.FC<IMenuItemComponentProps> = ({item, selected, onClick}) => {
    const {id, label, description} = item;

    return (
        <div className={`${selected && "bg-[#101010]"}`}>
        <div
            className={`cursor-pointer flex justify-between items-center border-t-[1.25px] border-t-[#363636] py-3 mx-2 ${
                selected && "bg-[#101010]"
            }`}
            onClick={() => onClick(id)}
        >
            <div className="leading-[1.15rem]">
                <h3 className="font-semibold text-[0.80rem] text-[#d9d9d9]">{label}</h3>
                <p className="text-[0.70rem] font-normal text-[#ABABAB]">{description}</p>
            </div>
            <ChevronRightIcon/>
        </div>
        </div>
    );
};

interface MenuProps extends PropsWithChildren {
    onClick: (id: MenuId) => void;
    selectedMenuId: MenuId | null;
}

export default function LeftSideMenu({selectedMenuId, onClick}: MenuProps) {
    return (
      <>
        {/* <div className="p-[0.45rem] py-2">
                <input
                    type="text"
                    placeholder="Search"
                    className="input-inner-shadow w-full px-[0.3rem] bg-[#00000015] placeholder:text-[#f5f5f5]  border-[1px] border-[#ffffff24] text-[0.7rem] leading-[1.1rem] p-1 focus:outline-none rounded-[0.25rem]"
                />
            </div> */}

        {MENU_ITEMS.map((item) =>
          item.available ? (
            <AvailableMenuItem key={item.id} item={item} selected={item.id === selectedMenuId} onClick={onClick} />
          ) : (
            <NotAvailableMenuItem key={item.id} item={item} />
          )
        )}
      </>
    );
}
