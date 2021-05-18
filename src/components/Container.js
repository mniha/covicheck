import { useDistricts } from "../hooks/useDistricts";
import { useState } from "react";

import Filter from "./Filter";
import SlotsList from "./SlotsList";

function Container() {
    const [
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
    ] = useDistricts();

    const [applyIsAvailable, setApplyIsAvailable] = useState(false);
    const [applyEighteenPlus, setapplyEighteenPlus] = useState(false);

    function handleApplyIsAvailable(value) {
        setApplyIsAvailable(value);
    }

    function handleApplyEighteenPlus(value) {
        setapplyEighteenPlus(value);
    }

    function handleSelectedState(value) {
        setSelectedState(value);
    }

    function handleSelectedDistrict(value) {
        setSelectedDistrict(value);
    }

    return (
        <div className="main-container">
            <Filter
                applyIsAvailable={applyIsAvailable}
                applyEighteenPlus={applyEighteenPlus}
                handleApplyIsAvailable={handleApplyIsAvailable}
                handleApplyEighteenPlus={handleApplyEighteenPlus}
                selectedState={selectedState}
                states={states}
                selectedDistrict={selectedDistrict}
                districts={districts}
                handleSelectedState={handleSelectedState}
                handleSelectedDistrict={handleSelectedDistrict}
            />
            <SlotsList
                applyIsAvailable={applyIsAvailable}
                applyEighteenPlusFilter={applyEighteenPlus}
                selectedDistrict={selectedDistrict}
            />
        </div>
    );
}
export default Container;
