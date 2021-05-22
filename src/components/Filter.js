import React from "react";

const Filter = (props) => {
    const selectedState = props.selectedState;
    const states = props.states;
    const selectedDistrict = props.selectedDistrict;
    const districts = props.districts;
    const applyEighteenPlus = props.applyEighteenPlus;
    const applyIsFortyFivePlus = props.applyIsFortyFivePlus;
    const blockNames = props.blockNames;
    const selectedBlockName = props.selectedBlockName;
    const applyIsDose1 = props.applyIsDose1;
    const applyIsDose2 = props.applyIsDose2;
    const enableClearFilter =
        applyEighteenPlus ||
        applyIsFortyFivePlus ||
        applyIsDose1 ||
        applyIsDose2;

    const handleApplyIsFortyFivePlus = (event) => {
        if (!props.applyIsFortyFivePlus) {
            props.handleApplyIsFortyFivePlus(true);
        } else props.handleApplyIsFortyFivePlus(false);
    };

    const handleApplyEighteenPlus = (event) => {
        if (!props.applyEighteenPlus) {
            props.handleApplyEighteenPlus(true);
        } else props.handleApplyEighteenPlus(false);
    };

    const handleApplyIsDose1 = (event) => {
        if (!props.applyIsDose1) {
            props.handleApplyIsDose1(true);
        } else props.handleApplyIsDose1(false);
    };

    const handleApplyIsDose2 = (event) => {
        if (!props.applyIsDose2) {
            props.handleApplyIsDose2(true);
        } else props.handleApplyIsDose2(false);
    };

    const handleSelectedState = (event) => {
        const value = event.target.value;
        props.handleSelectedState(value);
    };

    const handleSelectedDistrict = (event) => {
        const value = event.target.value;
        props.handleSelectedDistrict(value);
    };

    const handleSelectedBlockName = (event) => {
        const value = event.target.value;
        props.handleSelectedBlockName(value);
    };

    const handleClearFilter = (event) => {
        props.handleClearFilter(false);
    }

    return (
        <>
            <div className="d-flex justify-content-end mt-4">
                <div className="form-group row">
                    <div className="col-sm-4 px-1">
                        <select
                            className="form-control form-control-sm"
                            style={{ width: "15 rem" }}
                            value={selectedState}
                            onChange={handleSelectedState}
                        >
                            <option>-- Select State --</option>
                            {states.map((state) => (
                                <option
                                    value={state.state_id}
                                    key={state.state_id}
                                >
                                    {state.state_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-4 px-1">
                        <select
                            className="form-control form-control-sm"
                            style={{ width: "15 rem" }}
                            value={selectedDistrict}
                            onChange={handleSelectedDistrict}
                        >
                            <option value="">-- Select District --</option>
                            {districts.map((district) => (
                                <option
                                    key={district.district_id}
                                    value={district.district_id}
                                >
                                    {district.district_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-4 px-1">
                        <select
                            className="form-control form-control-sm"
                            style={{ width: "15 rem" }}
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
            </div>
            <hr></hr>
            <div className="d-flex justify-content-end m-2">
                <div className=" form-group ml-1 form-group">
                    <small>Available</small>
                    <a href="#">
                        <span
                            className={`badge p-1 m-1 ${
                                applyIsDose1
                                    ? "badge-primary"
                                    : "badge-secondary text-light"
                            }`}
                            value={applyIsDose1}
                            onClick={handleApplyIsDose1}
                        >
                            Dose 1
                        </span>
                    </a>
                    <a href="#">
                        <span
                            className={`badge p-1 m-1 ${
                                applyIsDose2
                                    ? "badge-primary"
                                    : "badge-secondary text-light"
                            }`}
                            value={applyIsDose2}
                            onClick={handleApplyIsDose2}
                        >
                            Dose 2
                        </span>
                    </a>
                </div>
                <div
                    className=" form-group form-group border-right border-secondary"
                    role="group"
                ></div>
                <div className=" form-group ml-1 form-group" role="group">
                    <small>Age</small>
                    <a href="#">
                        <span
                            className={`badge p-1 m-1 ${
                                applyEighteenPlus
                                    ? "badge-primary"
                                    : "badge-secondary text-light"
                            }`}
                            value={applyEighteenPlus}
                            onClick={handleApplyEighteenPlus}
                        >
                            18+
                        </span>
                    </a>
                    <a href="#">
                        <span
                            className={`badge p-1 m-1 ${
                                applyIsFortyFivePlus
                                    ? "badge-primary"
                                    : "badge-secondary text-light"
                            }`}
                            value={applyIsFortyFivePlus}
                            onClick={handleApplyIsFortyFivePlus}
                        >
                            45+
                        </span>
                    </a>
                </div>
                <div
                    className=" form-group form-group border-right border-secondary"
                    role="group"
                ></div>
                <div className="form-group form-group ml-1" role="group">
                    {" "}
                    <a
                        className={`btn-link ${
                            enableClearFilter ? "text-danger" : "disabled"
                        }`}
                        href="#"
                        title="Clear filter"
                        onClick={handleClearFilter}
                    >
                        <i className="fas fa-times"></i>
                    </a>
                </div>
            </div>
        </>
    );
};
export default Filter;
