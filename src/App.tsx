import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
import LeftSideMenu from "./components/menu/LeftSideMenu";
import { type MenuId } from "./config/menu";
import EmptyState from "./views/EmptyState";
import { AppContext } from "./contexts/AppContext";
import NoFormSelectedState from "./views/NoFormSelectedState";
import Select from "./views/Select";
// import SearchableSelect from "./views/SearchableSelect";
import NumberSlider from "./views/NumberSlider";
// import NumberRangePicker from "./views/NumberRangePicker";
import DatePicker from "./views/DatePicker";
// import DateRangePicker from "./views/DateRangePicker";
import CollectUserIp from "./views/CollectUserIp";
import LoadingScreen from "./views/LoadingScreen";
import AuthScreen from "./views/AuthScreen";

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

// enum SCRIPT_NAMES {
//   DROPDOWN = "dropdown",
//   DATE_PICKER_LIBRARY = "date picker library",
//   DATE_PICKER_SCRIPT = "date picker script",
//   DATE_RANGE_PICKER_SCRIPT = "date range script",
//   USER_IP_SCRIPT = "user ip script",
// }

const VIEWS: { [id in MenuId]?: React.FC } = {
  select: Select,
  // searchable_select: SearchableSelect,
  number_picker_slider: NumberSlider,
  // number_range_picker: NumberRangePicker,
  date_picker: DatePicker,
  // date_range_picker: DateRangePicker,
  collect_user_ip: CollectUserIp,
};

function App() {
  const [selectedelement, setSelectedElement] = useState<AnyElement | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<MenuId | null>(null);

  const [checkingScriptInjectStatus, setCheckingScriptInjectStatus] = useState(true);
  const [needsToAuthenticate, setNeedsToAuthenticate] = useState(false);
  const [authorizationUrl, setAuthorizationUrl] = useState("");

  const viewSectionRef = useRef<HTMLDivElement>(null);

  useEffect(function listenToElementSelectonChange() {
    window._myWebflow.subscribe("selectedelement", (element) => setSelectedElement(element));
  }, []);

  const injectCustomScriptToSite = useCallback(async () => {
    try {
      const { siteId } = await window._myWebflow.getSiteInfo();

      const { data } = await axios.post<IPushScriptApiResponse>(
        `${import.meta.env.VITE_DATA_CLIENT_URL}/app/attach-custom-script`,
        {
          siteId,
        },
        {
          headers: {
            Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTH_TOKEN}`,
          },
        }
      );

      console.log("\n\nSuccessfully attached script: ", data, "\n\n");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        setNeedsToAuthenticate(true);
      }
      console.log("Error pushing script", err);
    } finally {
      setCheckingScriptInjectStatus(false);
    }
  }, []);

  const getAuthorizationUrl = useCallback(async () => {
    try {
      const {
        data: { authorizeUrl },
      } = await axios.get<{ authorizeUrl: string }>(`${import.meta.env.VITE_DATA_CLIENT_URL}/auth/webflowauthorize`);
      const { shortName, siteId } = await window._myWebflow.getSiteInfo();
      const base64 = btoa(JSON.stringify({ siteId, returnUrl: `https://webflow.com/design/${shortName}` }));
      setAuthorizationUrl(`${authorizeUrl}&state=${base64}`);
    } catch (err) {
      console.log("Error getting authorization url: ", err);
    }
  }, []);

  useEffect(() => {
    getAuthorizationUrl();
    injectCustomScriptToSite();
  }, []);

  useEffect(
    function scrollToTop() {
      viewSectionRef.current?.scrollTo(0, 0);
    },
    [selectedMenuId]
  );

  const formElement =
    selectedelement?.type === "FormForm" || selectedelement?.type === "FormWrapper" ? selectedelement : null;

  const SelectedView = selectedMenuId ? VIEWS[selectedMenuId] : EmptyState;

  if (checkingScriptInjectStatus) return <LoadingScreen message="Checking app scripts..." />;
  else if (needsToAuthenticate) return <AuthScreen authUrl={authorizationUrl} />;

  return (
    <div className="bg-[#1e1e1e] h-screen grid grid-cols-12 text-[#D9D9D9]">
      <div className="col-span-4 h-full border-r-[1.25px] border-r-[#363636] overflow-y-auto overscroll-none">
        <LeftSideMenu selectedMenuId={selectedMenuId} onClick={(id) => setSelectedMenuId(id)} />
      </div>
      <div className="col-span-8 h-screen relative">
        <AppContext.Provider value={{ form: formElement }}>
          <NoFormSelectedState />
          {SelectedView && (
            <div className="h-full p-2 overflow-y-auto" ref={viewSectionRef}>
              <SelectedView />
            </div>
          )}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
