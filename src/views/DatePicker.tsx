import {useEffect, useState} from "react";
import TextInput from "../components/form/TextInput";
import {ZodError, z} from "zod";
import {useAppContext} from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import SelectInput from "../components/form/SelectInput";
import {DATE_FORMATS, DATE_PICKER_LANGUAGES, WEEKDAYS} from "../config/date";
import SliderInput from "../components/form/SliderInput";
import ColorInput from "../components/form/ColorInput";
import RadioInput, {RadioOption} from "../components/form/RadioInput";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner";
import {Tabs} from "../components/Tabs.tsx";
import {TabHeader} from "../components/TabHeader.tsx";
import {Button} from "../components/Button.tsx";

const inputSchema = z.object({
    label: z.string().min(1, "Please enter a label"),
    inputName: z.string().min(1, "Please enter the input name"),
    zIndex: z.number().min(0),
});

const datePickerTypes: { [x in "singlePicker" | "rangePicker"]: RadioOption } = {
    singlePicker: {
        value: "single",
        label: "Single date picker",
        helpContent: "Let's user select a single date only",
    },
    rangePicker: {
        value: "range",
        label: "Date range picker",
        helpContent: "Let's user select all dates between two dates",
    },
};

export default function DatePicker() {
    const {form} = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const [label, setLabel] = useState("");
    const [inputName, setInputName] = useState("");
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(String(WEEKDAYS[0].value));
    const [language, setLanguage] = useState(DATE_PICKER_LANGUAGES[0].value);
    const [dateFormat, setDateFormat] = useState(DATE_FORMATS[0].value);
    const [numberOfMonthsToShow, setNumberOfMonthsToShow] = useState("2");
    const [columns, setColumns] = useState("2");
    const [zIndex, setZIndex] = useState("10");

    const [lightThemeSelectedDateTextColor, setLightThemeSelectedDateTextColor] = useState("rgb(255, 255, 255)");
    const [darkThemeSelectedDateTextColor, setDarkThemeSelectedDateTextColor] = useState("rgb(255, 255, 255)");

    const [lightThemeSelectedDateBackgroundColor, setLightThemeSelectedDateBackgroundColor] = useState("rgb(0, 0, 0)");
    const [darkThemeSelectedDateBackgroundColor, setDarkThemeSelectedDateBackgroundColor] = useState("rgb(0, 0, 0)");

    const [lightThemeTodayColor, setLightThemeTodayColor] = useState("rgb(255, 255, 255)");
    const [darkThemeTodayColor, setDarkThemeTodayColor] = useState("rgb(255, 255, 255)");

    const [datePickerType, setDatePickerType] = useState(datePickerTypes.singlePicker.value);

    const [errors, setErrors] = useState<any>({});
    const {Banner, showBanner} = useElementInsertedBanner();

    const validateData = () => {
        try {
            inputSchema.parse({
                label,
                inputName,
                zIndex: Number(zIndex),
            });

            setErrors({});

            return true;
        } catch (err) {
            if (err instanceof ZodError) {
                const errorsByField: { [x: string]: string } = {};

                for (let issue of err.errors) {
                    const {path, message} = issue;
                    const field = path.length === 1 ? path[0] : path.join(".");

                    errorsByField[field] = message;
                }

                setErrors(errorsByField);
            }
        }
    };

    // auto generate field name
    useEffect(() => {
        setInputName(label.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [label])

    const handleInsert = async () => {
        if (!validateData() || !form) return;

        setIsLoading(true)
        const config: webflowService.DateParams & webflowService.DateColorConfig = {
            form,
            label,
            inputName,
            firstDayOfWeek,
            language,
            dateFormat,
            numberOfMonthsToShow,
            columns,
            zIndex,

            lightThemeSelectedDateTextColor,
            darkThemeSelectedDateTextColor,

            lightThemeSelectedDateBackgroundColor,
            darkThemeSelectedDateBackgroundColor,

            lightThemeTodayColor,
            darkThemeTodayColor,
        };

        if (datePickerType === datePickerTypes.singlePicker.value) {
            await webflowService.insertDatePickerToForm(config);
        } else {
            await webflowService.insertDateRangePickerToForm(config);
        }
        setIsLoading(false)

        showBanner();
    };

    return (
        <div>
            <Tabs tabs={[
                {
                    menuItem: "General", render: () => <div className="border-b-[#363636] border-b-[1.25px]">
                        <TextInput label="Label" value={label} name="label" onChange={setLabel} error={errors.label}/>
                        <TextInput label="Field name" name="input" value={inputName} onChange={setInputName}
                                   error={errors.inputName}/>

                        <div className="border-y-[1.25px] border-y-[#363636] py-1 my-3">
                            <RadioInput
                                label="Date picker type"
                                options={Object.values(datePickerTypes)}
                                selected={datePickerType}
                                onChange={setDatePickerType}
                            />
                        </div>
                        <SelectInput
                            label="First day of the week"
                            options={WEEKDAYS}
                            selectedValue={firstDayOfWeek}
                            onChange={setFirstDayOfWeek}
                        />
                        <SelectInput
                            label="Calender language"
                            options={DATE_PICKER_LANGUAGES}
                            selectedValue={language}
                            onChange={setLanguage}
                        />
                        <SelectInput label="Date format" options={DATE_FORMATS} selectedValue={dateFormat}
                                     onChange={setDateFormat}/>

                        <SliderInput
                            label="How many months to show by default"
                            max={12}
                            min={1}
                            value={numberOfMonthsToShow}
                            onChange={setNumberOfMonthsToShow}
                        />
                        <SliderInput label="Number of columns" max={12} min={1} value={columns} onChange={setColumns}/>


                    </div>
                },
                {
                    menuItem: "Styles", render: () => <div className="border-b-[#363636] border-b-[1.25px]">
                        <TextInput
                            label="Z-index"
                            name="zIndex"
                            type="number"
                            value={zIndex}
                            onChange={setZIndex}
                            error={errors.zIndex}
                        />
                        <ColorInput
                            label="Selected date text color (Light theme)"
                            value={lightThemeSelectedDateTextColor}
                            onChange={setLightThemeSelectedDateTextColor}
                        />
                        <ColorInput
                            label="Selected date text color (Dark theme)"
                            value={darkThemeSelectedDateTextColor}
                            onChange={setDarkThemeSelectedDateTextColor}
                        />

                        <ColorInput
                            label="Selected date background color (Light theme)"
                            value={lightThemeSelectedDateBackgroundColor}
                            onChange={setLightThemeSelectedDateBackgroundColor}
                        />
                        <ColorInput
                            label="Selected date background color (Dark theme)"
                            value={darkThemeSelectedDateBackgroundColor}
                            onChange={setDarkThemeSelectedDateBackgroundColor}
                        />

                        <ColorInput
                            label="Today date color (Light theme)"
                            value={lightThemeTodayColor}
                            onChange={setLightThemeTodayColor}
                        />
                        <ColorInput
                            label="Today date color (Dark theme)"
                            value={darkThemeTodayColor}
                            onChange={setDarkThemeTodayColor}
                        /></div>
                },
                {menuItem: "Conditional logic", render: () => <p>Conditional logic</p>},
            ]}>
                <TabHeader title={'Date picker'} description={'A beautiful date picker'}/>
            </Tabs>


            <div className="mt-[0.3rem]">
                <Banner/>
                <div className="mt-2 px-[18px]">
                    <Button func={handleInsert} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
}
