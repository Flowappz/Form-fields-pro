import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LeftSideMenu from "./components/menu/LeftSideMenu";
import { type MenuId } from "./config/menu";
import EmptyState from "./views/EmptyState";
import { AppContext } from "./contexts/AppContext";
import NoFormSelectedState from "./views/NoFormSelectedState";
import Dropdown from "./views/Dropdown";
import SearchableDropdown from "./views/SearchableDropdown";
import NumberSlider from "./views/NumberSlider";
import NumberRangePicker from "./views/NumberRangePicker";
import DatePicker from "./views/DatePicker";
import DateRangePicker from "./views/DateRangePicker";
import CollectUserIp from "./views/CollectUserIp";

declare global {
  interface Window {
    _myWebflow: typeof webflow;
  }
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

enum SCRIPT_NAMES {
  DROPDOWN = "dropdown",
  DATE_PICKER_LIBRARY = "date picker library",
  DATE_PICKER_SCRIPT = "date picker script",
  DATE_RANGE_PICKER_SCRIPT = "date range script",
  USER_IP_SCRIPT = "user ip script",
}

const VIEWS: { [id in MenuId]?: React.FC } = {
  dropdown: Dropdown,
  searchable_dropdown: SearchableDropdown,
  number_picker_slider: NumberSlider,
  number_range_picker: NumberRangePicker,
  date_picker: DatePicker,
  date_range_picker: DateRangePicker,
  collect_user_ip: CollectUserIp,
};

function App() {
  const [selectedelement, setSelectedElement] = useState<AnyElement | null>(null);

  const [selectedMenuId, setSelectedMenuId] = useState<MenuId | null>(null);

  useEffect(function listenToElementSelectonChange() {
    window._myWebflow.subscribe("selectedelement", (element) => setSelectedElement(element));
  }, []);

  const pushScript = useCallback(async (scriptName: SCRIPT_NAMES) => {
    try {
      const { siteId } = await window._myWebflow.getSiteInfo();

      const { data } = await axios.post<IPushScriptApiResponse>(
        `${import.meta.env.VITE_DATA_CLIENT_URL}/app/attach-custom-script`,
        {
          siteId,
          scriptName,
        },
        {
          headers: {
            Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTH_TOKEN}`,
          },
        }
      );

      console.log("\n\nSuccessfully attached script: ", data, "\n\n");
    } catch (err) {
      console.log("Error pushing script", err);
    }
  }, []);

  const pushScriptsToWebflowSite = useCallback(async () => {
    await pushScript(SCRIPT_NAMES.DROPDOWN);
  }, []);

  useEffect(() => {
    pushScriptsToWebflowSite();
  }, []);

  const formElement =
    selectedelement?.type === "FormForm" || selectedelement?.type === "FormWrapper" ? selectedelement : null;

  const SelectedView = selectedMenuId ? VIEWS[selectedMenuId] : EmptyState;
  return (
    <div className="bg-[#404040] h-screen grid grid-cols-12 text-[#D9D9D9]">
      <div className="col-span-4 h-full border-r-[1.25px] border-r-[#363636] overflow-y-auto overscroll-none">
        <LeftSideMenu selectedMenuId={selectedMenuId} onClick={(id) => setSelectedMenuId(id)} />
      </div>
      <div className="col-span-8 h-full p-2 relative">
        <AppContext.Provider value={{ form: formElement }}>
          <NoFormSelectedState />
          {SelectedView && <SelectedView />}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
