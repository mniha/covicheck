import { useDistricts } from "../hooks/useDistricts";
import { useState, useMemo } from "react";

import Filter from "./Filter";
import SlotsList from "./SlotsList";

import useAppointments from "../hooks/useAppointments";

const getBlockNames = (appointmentByDistricts) => {
    let blockNames = appointmentByDistricts.reduce(
        (accumulator, appointment) => {
            let blockName = appointment.block_name;
            if (accumulator.indexOf(blockName) === -1) {
                accumulator = [...accumulator, blockName];
            }
            return accumulator;
        },
        []
    );
    return blockNames;
};

function Container() {
    const [
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
    ] = useDistricts();

    const [appointmentByDistricts] = useAppointments([selectedDistrict]);
    const [applyIsAvailable, setApplyIsAvailable] = useState(false);
    const [applyEighteenPlus, setapplyEighteenPlus] = useState(false);
    const [selectedBlockName, setSelectedBlockName] = useState("");

    const handleApplyIsAvailable = (value) => {
        setApplyIsAvailable(value);
    };

    const handleApplyEighteenPlus = (value) => {
        setapplyEighteenPlus(value);
    };

    const handleSelectedState = (value) => {
        setSelectedState(value);
    };

    const handleSelectedDistrict = (value) => {
        setSelectedDistrict(value);
    };

    const handleSelectedBlockName = (value) => {
        setSelectedBlockName(value);
    };

    const blockNames = useMemo(() => getBlockNames(appointmentByDistricts), [
        appointmentByDistricts,
    ]);

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
                blockNames={blockNames}
                handleSelectedBlockName={handleSelectedBlockName}
                selectedBlockName={selectedBlockName}
            />
            <SlotsList
                applyIsAvailable={applyIsAvailable}
                applyEighteenPlusFilter={applyEighteenPlus}
                selectedDistrict={selectedDistrict}
                appointmentByDistricts={appointmentByDistricts}
                selectedBlockName={selectedBlockName}
            />
        </div>
    );
}
export default Container;
