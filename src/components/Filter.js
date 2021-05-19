import React from "react";

const Filter = (props) => {
    const selectedState = props.selectedState;
    const states = props.states;
    const selectedDistrict = props.selectedDistrict;
    const districts = props.districts;
    const applyEighteenPlus = props.applyEighteenPlus;
    const applyIsAvailable = props.applyIsAvailable;
    const blockNames = props.blockNames;
    const selectedBlockName = props.selectedBlockName;

    function handleApplyIsAvailable(event) {
        if (!props.applyIsAvailable) {
            props.handleApplyIsAvailable(true);
        } else props.handleApplyIsAvailable(false);
    }

    function handleApplyEighteenPlus(event) {
        if (!props.applyEighteenPlus) {
            props.handleApplyEighteenPlus(true);
        } else props.handleApplyIsAvailable(false);
    }

    function handleSelectedState(event) {
        const value = event.target.value;
        props.handleSelectedState(value);
    }

    function handleSelectedDistrict(event) {
        const value = event.target.value;
        props.handleSelectedDistrict(value);
    }

    function handleSelectedBlockName(event) {
        const value = event.target.value;
        props.handleSelectedBlockName(value);
    }

    return (
        <>
            <div className="d-flex justify-content-end mt-4">
                <div className="form-group row">
                    <select
                        className="form-control form-control-sm col-sm-4"
                        value={selectedState}
                        onChange={handleSelectedState}
                    >
                        <option>-- Select State --</option>
                        {states.map((state) => (
                            <option value={state.state_id} key={state.state_id}>
                                {state.state_name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="form-control form-control-sm col-sm-4"
                        value={selectedDistrict}
                        onChange={handleSelectedDistrict}
                    >
                        <option>-- Select District --</option>
                        {districts.map((district) => (
                            <option
                                key={district.district_id}
                                value={district.district_id}
                            >
                                {district.district_name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="form-control form-control-sm col-sm-4"
                        value={selectedBlockName}
                        onChange={handleSelectedBlockName}
                    >
                        <option>-- Select Block Name --</option>
                        {blockNames.map((blockName) => (
                            <option
                                value={blockName.center_id}
                                key={blockName.center_id}
                            >
                                {blockName}
                            </option>
                        ))}
                    </select>
                </div>
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
        </>
    );
};
export default Filter;
