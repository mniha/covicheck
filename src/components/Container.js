import { useDistricts } from "../hooks/useDistricts";
import { useState, useMemo, useEffect } from "react";

import Portal from "../Portal";
import Loader from "../Loader";

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

    const [appointmentByDistricts, isLoading] = useAppointments([
        selectedDistrict,
    ]);
    const [applyIsFortyFivePlus, setapplyIsFortyFivePlus] = useState(false);
    const [applyIsEighteenPlus, setApplyEighteenPlus] = useState(false);
    const [selectedBlockName, setSelectedBlockName] = useState("");
    const [applyIsDose1, setApplyIsDose1] = useState(false);
    const [applyIsDose2, setApplyIsDose2] = useState(false);
    const [applyIsCovishield, setApplyIsCovishield] = useState(false);
    const [applyIsCovaxin, setApplyIsCovaxin] = useState(false);
    const [applyIsSputnik, setApplyIsSputnik] = useState(false);

    const handleApplyIsFortyFivePlus = (value) => {
        setapplyIsFortyFivePlus(value);
        setApplyEighteenPlus(false);
    };

    const handleApplyEighteenPlus = (value) => {
        setApplyEighteenPlus(value);
        setapplyIsFortyFivePlus(false);
    };

    const handleSelectedState = (value) => {
        setSelectedState(value);
        setSelectedDistrict("");
    };

    const handleSelectedDistrict = (value) => {
        setSelectedDistrict(value);
        setSelectedBlockName("");
    };

    const handleSelectedBlockName = (value) => {
        setSelectedBlockName(value);
    };

    const blockNames = useMemo(() => getBlockNames(appointmentByDistricts), [
        appointmentByDistricts,
    ]);

    const handleApplyIsDose1 = (value) => {
        setApplyIsDose1(value);
        setApplyIsDose2(false);
    };

    const handleApplyIsDose2 = (value) => {
        setApplyIsDose2(value);
        setApplyIsDose1(false);
    };

    const handleClearFilter = (value) => {
        setApplyIsDose1(value);
        setApplyIsDose2(value);
        setApplyEighteenPlus(value);
        setapplyIsFortyFivePlus(value);
        setApplyIsCovishield(value);
        setApplyIsSputnik(value);
        setApplyIsCovaxin(value);
    };

    const handleApplyIsCovishield = (value) => {
        setApplyIsCovishield(value);
        setApplyIsSputnik(false);
        setApplyIsCovaxin(false);
    };

    const handleApplyIsCovaxin = (value) => {
        setApplyIsCovaxin(value);
        setApplyIsCovishield(false);
        setApplyIsSputnik(false);
    };

    const handleApplyIsSputnik = (value) => {
        setApplyIsSputnik(value);
        setApplyIsCovishield(false);
        setApplyIsCovaxin(false);
    };

    return (
        <>
            <div>
                <Portal>
                    <Loader isLoading={isLoading} />
                </Portal>
            </div>

            <div className="main-container">
                <Filter
                    applyIsFortyFivePlus={applyIsFortyFivePlus}
                    applyIsEighteenPlus={applyIsEighteenPlus}
                    selectedState={selectedState}
                    states={states}
                    selectedDistrict={selectedDistrict}
                    districts={districts}
                    selectedBlockName={selectedBlockName}
                    blockNames={blockNames}
                    applyIsDose1={applyIsDose1}
                    applyIsDose2={applyIsDose2}
                    applyIsCovishield={applyIsCovishield}
                    applyIsCovaxin={applyIsCovaxin}
                    applyIsSputnik={applyIsSputnik}
                    handleClearFilter={handleClearFilter}
                    handleSelectedBlockName={handleSelectedBlockName}
                    handleSelectedState={handleSelectedState}
                    handleSelectedDistrict={handleSelectedDistrict}
                    handleApplyIsFortyFivePlus={handleApplyIsFortyFivePlus}
                    handleApplyEighteenPlus={handleApplyEighteenPlus}
                    handleApplyIsDose1={handleApplyIsDose1}
                    handleApplyIsDose2={handleApplyIsDose2}
                    handleApplyIsSputnik={handleApplyIsSputnik}
                    handleApplyIsCovaxin={handleApplyIsCovaxin}
                    handleApplyIsCovishield={handleApplyIsCovishield}

                />
                <SlotsList
                    applyIsFortyFivePlus={applyIsFortyFivePlus}
                    applyIsEighteenPlus={applyIsEighteenPlus}
                    selectedDistrict={selectedDistrict}
                    applyIsCovishield={applyIsCovishield}
                    applyIsCovaxin={applyIsCovaxin}
                    applyIsSputnik={applyIsSputnik}
                    appointmentByDistricts={appointmentByDistricts}
                    selectedBlockName={selectedBlockName}
                    isLoading={isLoading}
                    applyIsDose1={applyIsDose1}
                    applyIsDose2={applyIsDose2}
                />
            </div>
        </>
    );
}
export default Container;
