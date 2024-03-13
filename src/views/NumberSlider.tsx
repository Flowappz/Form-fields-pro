import {useEffect, useState} from "react";
import TextInput from "../components/form/TextInput";
import {ZodError, z} from "zod";
import {useAppContext} from "../contexts/AppContext";
import * as webflowService from "../services/webflowService";
import ColorInput from "../components/form/ColorInput";
import RadioInput, {RadioOption} from "../components/form/RadioInput";
import useElementInsertedBanner from "../hooks/useElementInsertedBanner";
import {Tabs} from "../components/Tabs.tsx";
import {TabHeader} from "../components/TabHeader.tsx";
import {Button} from "../components/Button.tsx";

const singleSliderInputSchema = ({max, min}: { max: number; min: number }) =>
    z.object({
        label: z.string().min(1, "Please enter a label"),
        inputName: z.string().min(1, "Please enter the input name"),

        maxRange: z
            .number({
                invalid_type_error: "Please enter a max range value",
            })
            .gt(min, "Max range should be greater than minimum range value"),
        minRange: z
            .number({
                invalid_type_error: "Please enter a max range value",
            })
            .lt(max, "Min range should be less than maximum range value"),

        defaultValue: z
            .number({
                invalid_type_error: "Please enter a min range value",
            })
            .gte(min, "Default value should be greater than or equal to minimum range value")
            .lte(max, "Default value should be less than or equal to max range value"),
    });

const rangeSliderInputSchema = ({max, min}: { max: number; min: number }) =>
    z.object({
        label: z.string().min(1, "Please enter a label"),
        inputName: z.string().min(1, "Please enter the input name"),

        maxRange: z
            .number({
                invalid_type_error: "Please enter a max range value",
            })
            .gt(min, "Max range should be greater than minimum range value"),
        minRange: z
            .number({
                invalid_type_error: "Please enter a max range value",
            })
            .lt(max, "Min range should be less than maximum range value"),

        defaultMaxValue: z
            .number({
                invalid_type_error: "Please enter a default max range value",
            })
            .gte(min, "Default max value should be greater than or equal to minimum range value")
            .lte(max, "Default max value should be less than or equal to max range value"),

        defaultMinValue: z
            .number({
                invalid_type_error: "Please enter a default min value",
            })
            .gte(min, "Default min value should be greater than or equal to minimum range value")
            .lte(max, "Default min value should be less than or equal to max range value"),
    });

const sliderTypes: { [x in "singleSlider" | "rangeSlider"]: RadioOption } = {
    singleSlider: {
        value: "single",
        label: "Regular",
        helpContent: "Let's user select a single number",
    },
    rangeSlider: {
        value: "range",
        label: "Number range slider",
        helpContent: "Let's user select a range between two numbers",
    },
};

export default function NumberSlider() {
    const {form} = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const [label, setLabel] = useState("");
    const [inputName, setInputName] = useState("");
    const [maxRange, setMaxRange] = useState<number | string>("");
    const [minRange, setMinRange] = useState<number | string>("");
    const [defaultValue, setDefaultValue] = useState<number | string>("");
    const [defaultMaxValue, setDefaultMaxValue] = useState<number | string>("");
    const [defaultMinValue, setDefaultMinValue] = useState<number | string>("");

    const [lightThemeSliderColor, setLightThemeSliderColor] = useState("rgb(0, 0, 0)");
    const [darkThemeSliderColor, setDarkThemeSliderColor] = useState("rgb(0, 0, 0)");

    const [lightThemeMaxMinValueTextColor, setLightThemeMaxMinValueTextColor] = useState("rgb(0, 0, 0)");
    const [darkThemeMaxMinValueTextColor, setDarkThemeMaxMinValueTextColor] = useState("rgb(0, 0, 0)");

    const [lightThemeTooltipTextColor, setLightThemeTooltipTextColor] = useState("rgb(255, 255, 255)");
    const [darkThemeTooltipTextColor, setDarkThemeTooltipTextColor] = useState("rgb(255, 255, 255)");

    const [sliderType, setSliderType] = useState(sliderTypes.singleSlider.value);

    const [errors, setErrors] = useState<any>({});

    const {Banner, showBanner} = useElementInsertedBanner();

    const validateData = () => {
        try {
            if (sliderType === sliderTypes.singleSlider.value) {
                singleSliderInputSchema({max: maxRange as number, min: minRange as number}).parse({
                    label,
                    inputName,
                    maxRange,
                    minRange,
                    defaultValue,
                });
            } else {
                rangeSliderInputSchema({max: maxRange as number, min: minRange as number}).parse({
                    label,
                    inputName,
                    maxRange,
                    minRange,
                    defaultMaxValue,
                    defaultMinValue,
                });
            }

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
        if (!validateData() || !form) {
            return;
        }

        if (sliderType === sliderTypes.singleSlider.value) {
            setIsLoading(true)
            await webflowService.insertNumberSliderToForm({
                form,
                label,
                inputName,
                maxRange: Number(maxRange),
                minRange: Number(minRange),
                defaultValue: Number(defaultValue),
                lightThemeSliderColor,
                darkThemeSliderColor,
                lightThemeMaxMinValueTextColor,
                darkThemeMaxMinValueTextColor,
                lightThemeTooltipTextColor,
                darkThemeTooltipTextColor,
            });
            setIsLoading(false)
        } else {
            setIsLoading(true)
            await webflowService.insertNumberRangeSliderToForm({
                form,
                label,
                inputName,
                maxRange: Number(maxRange),
                minRange: Number(minRange),
                defaultMax: Number(defaultMaxValue),
                defaultMin: Number(defaultMinValue),
                lightThemeSliderColor,
                darkThemeSliderColor,
                lightThemeMaxMinValueTextColor,
                darkThemeMaxMinValueTextColor,
                lightThemeTooltipTextColor,
                darkThemeTooltipTextColor,
            });
            setIsLoading(false)
        }

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
                                label="Slider type"
                                options={Object.values(sliderTypes)}
                                selected={sliderType}
                                onChange={setSliderType}
                            />
                        </div>

                        <TextInput
                            label="Max range"
                            name="maxRange"
                            type="number"
                            value={maxRange}
                            onChange={(val) => setMaxRange(Number(val))}
                            error={errors.maxRange}
                        />

                        <TextInput
                            label="Min range"
                            name="minRange"
                            type="number"
                            value={minRange}
                            onChange={(val) => setMinRange(Number(val))}
                            error={errors.minRange}
                        />

                        {sliderType === sliderTypes.singleSlider.value && (
                            <TextInput
                                label="Default value"
                                name="defaultValue"
                                type="number"
                                value={defaultValue}
                                onChange={(val) => setDefaultValue(Number(val))}
                                error={errors.defaultValue}
                            />
                        )}

                        {sliderType === sliderTypes.rangeSlider.value && (
                            <>
                                <TextInput
                                    label="Default max value"
                                    name="defaultMaxValue"
                                    type="number"
                                    value={defaultMaxValue}
                                    onChange={(val) => setDefaultMaxValue(Number(val))}
                                    error={errors.defaultMaxValue}
                                />

                                <TextInput
                                    label="Default min value"
                                    name="defaultMinValue"
                                    type="number"
                                    value={defaultMinValue}
                                    onChange={(val) => setDefaultMinValue(Number(val))}
                                    error={errors.defaultMinValue}
                                />
                            </>
                        )}
                    </div>
                },
                {
                    menuItem: "Styles", render: () => <div className="border-b-[#363636] border-b-[1.25px]">
                        <ColorInput
                            label="Max, min value text color (Light theme)"
                            value={lightThemeMaxMinValueTextColor}
                            onChange={setLightThemeMaxMinValueTextColor}
                        />
                        <ColorInput
                            label="Max, min value text color (Dark theme)"
                            value={darkThemeMaxMinValueTextColor}
                            onChange={setDarkThemeMaxMinValueTextColor}
                        />

                        <ColorInput
                            label="Tooltip text color (Light theme)"
                            value={lightThemeTooltipTextColor}
                            onChange={setLightThemeTooltipTextColor}
                        />
                        <ColorInput
                            label="Tooltip text color (Dark theme)"
                            value={darkThemeTooltipTextColor}
                            onChange={setDarkThemeTooltipTextColor}
                        />

                        <ColorInput
                            label="Slider color (Light theme)"
                            value={lightThemeSliderColor}
                            onChange={setLightThemeSliderColor}
                        />
                        <ColorInput label="Slider color (Dark theme)" value={darkThemeSliderColor}
                                    onChange={setDarkThemeSliderColor}/>
                    </div>
                },
                {menuItem: "Conditional logic", render: () => <p>Conditional logic</p>}
            ]}>

                <TabHeader title={'Number picker slider'}
                           description={'Number slider that lets user select a value between a range'}/>
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
