import { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import CustomDropdown from "./views/CustomDropdown";
import axios from "axios";
import LeftSideMenu from "./components/menu/LeftSideMenu";
import { MenuId, MenuItem } from "./config/menu";
import EmptyState from "./views/EmptyState";

declare global {
  interface Window {
    _myWebflow: typeof webflow;
  }
}

enum Views {
  HOME,
  CUSTOM_DROPDOWN,
}

interface IPushScriptApiResponse {
  data: {
    siteId: string;
    status: "OK";
    script: {
      id: string;
      displayName: string;
      version: string;
      location: "header" | "footer";
      attributes: { [key: string]: string };
    };
  };
}

function App() {
  const [selectedelement, setSelectedElement] = useState<AnyElement | null>(null);
  const [formElement, setFormElement] = useState<FormFormElement | FormWrapperElement | null>(null);
  const [view, setView] = useState(Views.HOME);

  const [selectedMenuId, setSelectedMenuId] = useState<MenuId | null>(null);

  useEffect(function listenToElementSelectonChange() {
    window._myWebflow.subscribe("selectedelement", (element) => setSelectedElement(element));
  }, []);

  useEffect(function pushCustomDropdownScript() {
    const pushScript = async () => {
      try {
        const { siteId } = await window._myWebflow.getSiteInfo();

        const { data } = await axios.post<IPushScriptApiResponse>(
          `${import.meta.env.VITE_DATA_CLIENT_URL}/app/attach-custom-script`,
          {
            siteId,
            scriptName: "dropdown",
          },
          {
            headers: {
              Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTH_TOKEN}`,
            },
          }
        );

        console.log("\n\nSuccessfully attached custom dropdown script: ", data, "\n\n");
      } catch (err) {
        console.log("Error pushing custom dropdown script", err);
      }
    };

    pushScript();
  }, []);

  useEffect(
    function changeView() {
      if (selectedelement?.type === "FormForm" || selectedelement?.type === "FormWrapper") {
        setView(Views.CUSTOM_DROPDOWN);
        setFormElement(selectedelement);
      }
    },
    [selectedelement]
  );

  // switch (view) {
  //   case Views.CUSTOM_DROPDOWN:
  //     return <CustomDropdown form={formElement} />;
  //   default:
  //     return <Home selectedElement={selectedelement} />;
  // }

  return (
    <div className="bg-[#404040] h-screen grid grid-cols-12 text-[#D9D9D9]">
      <div className="col-span-4 h-full border-r-[1.5px] border-r-[#363636] overflow-y-auto overscroll-none">
        <LeftSideMenu selectedMenuId={selectedMenuId} onClick={(id) => setSelectedMenuId(id)} />
      </div>
      <div className="col-span-8 h-full p-3">
        <EmptyState />
      </div>
    </div>
  );
}

export default App;
