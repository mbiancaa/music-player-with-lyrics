import { useState } from "react";
import InfoPopup from "./InfoPopup";

export default function InfoButton() {

    const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);

    const handleInfoDisplay = () => {
        setIsPopupDisplayed(!isPopupDisplayed);
    }

    return (
        <>
            <div
                className="InfoButton GlassEffect"
                onClick={handleInfoDisplay}
            >
            </div>
            {
                isPopupDisplayed &&
                <InfoPopup />
            }
        </>
    );

}