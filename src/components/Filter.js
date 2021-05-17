import React, { useState } from "react";

import SlotsList from "./SlotsList";
import { useDistricts } from "../hooks/useDistricts";
import useAppointments from "../hooks/useAppointments";

const Filter = (props) => {
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

    function handleApplyIsAvailable(event) {
        if (!applyIsAvailable) {
            setApplyIsAvailable(true);
        } else setApplyIsAvailable(false);
    }

    function handleApplyEighteenPlus(event) {
        if (!applyEighteenPlus) {
            setapplyEighteenPlus(true);
        } else setapplyEighteenPlus(false);
    }

    return (
        <div className="main-container">
            <div className="d-flex justify-content-end mt-4">
                <select
                    className="dropdown-style"
                    value={selectedState}
                    onChange={(e) => {
                        setSelectedState(e.target.value);
                    }}
                >
                    <option>-- Select State --</option>
                    {states.map((state) => (
                        <option value={state.state_id} key={state.state_id}>
                            {state.state_name}
                        </option>
                    ))}
                </select>
                <select
                    className="dropdown-style"
                    value={selectedDistrict}
                    onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                    }}
                >
                    <option>-- Select District --</option>
                    {districts.map((district) => (
                        <option
                            value={district.district_id}
                            key={district.district_id}
                        >
                            {district.district_name}
                        </option>
                    ))}
                </select>
            </div>
            <hr></hr>
            <div className="d-flex justify-content-end m-2">
                <a href="#">
                    <span
                        className={`badge p-1 m-1 ${
                            applyIsAvailable
                                ? "badge-primary"
                                : "bg-light text-dark"
                        }`}
                        value={applyIsAvailable}
                        onClick={handleApplyIsAvailable}
                    >
                        Available
                    </span>
                </a>
                <a href="#">
                    <span
                        className={`badge p-1 m-1 ${
                            applyEighteenPlus
                                ? "badge-primary"
                                : "bg-light text-dark"
                        }`}
                        value={applyEighteenPlus}
                        onClick={handleApplyEighteenPlus}
                    >
                        Age 18+
                    </span>
                </a>
            </div>
            {selectedDistrict!=""? (
                <SlotsList
                    applyIsAvailable={applyIsAvailable}
                    applyEighteenPlus={applyEighteenPlus}
                    appointments={appointmentByDistricts}
                />
            ) : (
                <h6>Please select State and district</h6>
            )}
        </div>
    );
};
export default Filter;
