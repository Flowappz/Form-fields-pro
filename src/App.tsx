import {useCallback, useEffect, useRef, useState} from "react";
import "./App.css";
import axios from "axios";
import LeftSideMenu from "./components/menu/LeftSideMenu";
import {type MenuId} from "./config/menu";
import EmptyState from "./views/EmptyState";
import {AppContext} from "./contexts/AppContext";
import NoFormSelectedState from "./views/NoFormSelectedState";
import Select from "./views/Select";
import SearchableSelect from "./views/SearchableSelect";
import NumberSlider from "./views/NumberSlider";
// import NumberRangePicker from "./views/NumberRangePicker";
import DatePicker from "./views/DatePicker";
// import DateRangePicker from "./views/DateRangePicker";
import CollectUserIp from "./views/CollectUserIp";
import PhoneNumberInput from "./views/PhoneNumberInput/PhoneNumberInput.tsx";
import ColorPickerInput from "./views/ColorPickerInput/ColorPickerInput.tsx";
import FileUploader from "./views/FileUploader/FileUploader.tsx";
// import AdvancedEmailField from "./views/AdvancedEmailField.tsx";
import NetPromoterScore from "./views/NetPromoterScore/NetPromoterScore.tsx";
import Url from "./views/Url/Url.tsx";
import AdvancedEmailField from "./views/Email/AdvancedEmailField.tsx";
import {LikertScale} from "./views/LikertScale/LikertScale.tsx";
import {FeedbackIcon} from "./icons/FeedbackIcon.tsx";
import {UserFeedback} from "./views/UserFeedback/UserFeedback.tsx";

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
    select: Select,
    searchable_select: SearchableSelect,
    number_picker_slider: NumberSlider,
    phone_number_input: PhoneNumberInput,
    // number_range_picker: NumberRangePicker,
    date_picker: DatePicker,
    // date_range_picker: DateRangePicker,
    collect_user_ip: CollectUserIp,
    color_picker_input: ColorPickerInput,
    file_uploader_input: FileUploader,
    advanced_email_input: AdvancedEmailField,
    net_promoter_score: NetPromoterScore,
    url_input: Url,
    likert_scale_field: LikertScale
};

function App() {

    const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false)

    const [selectedelement, setSelectedElement] = useState<AnyElement | null>(null);
    const [selectedMenuId, setSelectedMenuId] = useState<MenuId | null>(null);

    const viewSectionRef = useRef<HTMLDivElement>(null);

    useEffect(function listenToElementSelectonChange() {
        window._myWebflow.subscribe("selectedelement", (element) => setSelectedElement(element));
    }, []);

    const pushScript = useCallback(async (scriptName: SCRIPT_NAMES) => {
        try {
            const {siteId} = await window._myWebflow.getSiteInfo();

            const {data} = await axios.post<IPushScriptApiResponse>(
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

    useEffect(
        function scrollToTop() {
            viewSectionRef.current?.scrollTo(0, 0);
        },
        [selectedMenuId]
    );

    const formElement =
        selectedelement?.type === "FormForm" || selectedelement?.type === "FormWrapper" ? selectedelement : null;

    const SelectedView = selectedMenuId ? VIEWS[selectedMenuId] : EmptyState;
    return (
        <div className="bg-[#1e1e1e] h-screen grid grid-cols-12 text-[#D9D9D9]">

            <button
                onClick={() => setIsFeedbackPopupOpen(true)}
                className='fixed bottom-5 right-5 z-50'>
                <FeedbackIcon/>
            </button>
            <UserFeedback isFeedbackPopupOpen={isFeedbackPopupOpen} setIsFeedbackPopupOpen={setIsFeedbackPopupOpen}/>

            <div className="col-span-4 h-full border-r-[1.25px] border-r-[#363636] overflow-y-auto overscroll-none">
                <LeftSideMenu selectedMenuId={selectedMenuId} onClick={(id) => setSelectedMenuId(id)}/>
            </div>
            <div className="col-span-8 h-screen relative">
                <AppContext.Provider value={{form: formElement}}>
                    <NoFormSelectedState/>
                    {SelectedView && (
                        <div className="h-full overflow-y-auto" ref={viewSectionRef}>
                            <SelectedView/>
                        </div>
                    )}
                </AppContext.Provider>
            </div>
        </div>
    );
}

export default App;
