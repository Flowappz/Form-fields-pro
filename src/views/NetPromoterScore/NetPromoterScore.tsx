import {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import {useAppContext} from "../../contexts/AppContext.tsx";
import useElementInsertedBanner from "../../hooks/useElementInsertedBanner.tsx";
import * as webflowService from '../../services/webflowService.ts'
import {Button} from "../../components/Button.tsx";
import {Tabs} from "../../components/Tabs.tsx";
import {TabHeader} from "../../components/TabHeader.tsx";
import {General} from "./General.tsx";
import {Styles} from "./Styles.tsx";
import {ConditionalLogic} from "./ConditionalLogic.tsx";


const inputSchema = z.object({
    label: z.string().min(1, "Please enter a label"),
    description: z.string().min(1, "Please enter a description"),
    scoreFieldName: z.string().min(1, 'Please enter a Field name'),
    lowScoreLabel: z.string().min(1, "Please enter Lowest score label"),
    heightScoreLabel: z.string().min(1, "Please enter Highest score label"),
    errorMessage: z.string().min(1, "Please enter a error message"),
    extraFeedbackCollection: z.union([
        z.literal('always'),
        z.literal('never'),
        z.string().regex(/^(10|[0-9])$/),
    ])


})

export default function NetPromoterScore() {

    const {form} = useAppContext()
    const [isLoading, setIsLoading] = useState(false)

    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [scoreFieldName, setScoreFieldName] = useState('')
    const [lowScoreLabel, setLowScoreLabel] = useState('Not likely at all')
    const [heightScoreLabel, setHeightScoreLabel] = useState('Extremely likely')
    const [errorMessage, setErrorMessage] = useState('This field is required')

    const [extraFeedbackCollection, setExtraFeedbackCollection] = useState('6')
    const [extraFieldLabel, setExtraFieldLabel] = useState('What can we do to improve?')
    const [extraFieldName, setExtraFieldName] = useState('')

    const [lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor] =
        useState("rgb(0, 0, 0)");
    const [lightThemeHoverTextColor, setLightThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");
    const [darkThemeHoverTextColor, setDarkThemeHoverTextColor] =
        useState("rgb(255, 255, 255)");


    const [errors, setErrors] = useState<any>({});
    const {Banner, showBanner} = useElementInsertedBanner();


    useEffect(() => {
        setScoreFieldName(label.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [label])

    useEffect(() => {
        setExtraFieldName(extraFieldLabel.replace(/[\s,.]+/g, "-").toLowerCase());
    }, [extraFieldLabel])

    const validateDate = () => {
        try {
            inputSchema.parse({
                label,
                description,
                lowScoreLabel,
                heightScoreLabel,
                errorMessage,
                extraFeedbackCollection,
                scoreFieldName
            });

            setErrors({});

            return true;
        } catch (err) {
            if (err instanceof ZodError) {
                const errorsByField: { [x: string]: string } = {};

                for (const issue of err.errors) {
                    const {path, message} = issue;
                    const field = path.length === 1 ? path[0] : path.join(".");

                    errorsByField[field] = message;

                }

                setErrors(errorsByField);

            }
        }
    };

    const handleNetPromoterInsert = async () => {

        if (validateDate() && form) {
            setIsLoading(true)
            await webflowService.insertNetPromoterScoreToForm({
                form,
                label,
                description,
                scoreFieldName,
                lowScoreLabel,
                heightScoreLabel,
                errorMessage,
                extraFeedbackCollection,
                extraFieldLabel,
                extraFieldName,
                lightThemeHoverBackgroundColor,
                darkThemeHoverBackgroundColor,
                lightThemeHoverTextColor,
                darkThemeHoverTextColor
            })
            setIsLoading(false)
            showBanner()

        }
    }

    return (
        <>
            <Tabs tabs={[
                {
                    menuItem: 'General', render: () =>
                        <General
                            label={[label, setLabel]}
                            errors={errors}
                            description={[description, setDescription]}
                            errorMessage={[errorMessage, setErrorMessage]}
                            extraFeedbackCollection={[extraFeedbackCollection, setExtraFeedbackCollection]}
                            extraFieldLabel={[extraFieldLabel, setExtraFieldLabel]}
                            extraFieldName={[extraFieldName, setExtraFieldName]}
                            heightScoreLabel={[heightScoreLabel, setHeightScoreLabel]}
                            lowScoreLabel={[lowScoreLabel, setLowScoreLabel]}
                            scoreFieldName={[scoreFieldName, setScoreFieldName]}

                        />
                },
                {
                    menuItem: 'Styles', render: () =>
                        <Styles
                            darkThemeHoverBackgroundColor={[darkThemeHoverBackgroundColor, setDarkThemeHoverBackgroundColor]}
                            darkThemeHoverTextColor={[darkThemeHoverTextColor, setDarkThemeHoverTextColor]}
                            lightThemeHoverBackgroundColor={[lightThemeHoverBackgroundColor, setLightThemeHoverBackgroundColor]}
                            lightThemeHoverTextColor={[lightThemeHoverTextColor, setLightThemeHoverTextColor]}

                        />
                },
                {menuItem: 'Conditional logic', render: () => <ConditionalLogic/>}
            ]}>
                <TabHeader title={'Net Promoter Score'}
                           description={'Collect feedback from visitors on a scale of 0 - 10'}/>
            </Tabs>
            <div className="mt-2 px-[18px]">
                <Banner/>
                <Button isLoading={isLoading} func={handleNetPromoterInsert}/>
            </div>
        </>
    )
}