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

    const [appointmentByDistricts, isLoading] = useAppointments([selectedDistrict]);
    const [applyIsFortyFivePlus, setapplyIsFortyFivePlus] = useState(false);
    const [applyEighteenPlus, setApplyEighteenPlus] = useState(false);
    const [selectedBlockName, setSelectedBlockName] = useState("");
    const [applyIsDose1, setApplyIsDose1] = useState(false);
    const [applyIsDose2, setApplyIsDose2] = useState(false);

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
    }

    return (
        <>
            { <div className={`${isLoading ? "progress" : "invisible" }`} style={{ height: "5px" }}>
                <div
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: "100%" }}>
                </div>
            </div> }
            <div className="main-container">
                <Filter
                    applyIsFortyFivePlus={applyIsFortyFivePlus}
                    applyEighteenPlus={applyEighteenPlus}
                    selectedState={selectedState}
                    states={states}
                    selectedDistrict={selectedDistrict}
                    districts={districts}
                    selectedBlockName={selectedBlockName}
                    blockNames={blockNames}
                    applyIsDose1={applyIsDose1}
                    applyIsDose2={applyIsDose2}
                    handleClearFilter = {handleClearFilter}
                    handleSelectedBlockName={handleSelectedBlockName}
                    handleSelectedState={handleSelectedState}
                    handleSelectedDistrict={handleSelectedDistrict}
                    handleApplyIsFortyFivePlus={handleApplyIsFortyFivePlus}
                    handleApplyEighteenPlus={handleApplyEighteenPlus}
                    handleApplyIsDose1={handleApplyIsDose1}
                    handleApplyIsDose2={handleApplyIsDose2}
                />
                <SlotsList
                    applyIsFortyFivePlus={applyIsFortyFivePlus}
                    applyEighteenPlus={applyEighteenPlus}
                    selectedDistrict={selectedDistrict}
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
