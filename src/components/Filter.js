import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import SlotsList from './SlotsList';
import { useDistricts } from '../hooks/useDistricts';

const currentWeekDates = () => {
    let curr = new Date();
    let week = []

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i ;
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
        let newday = day.toString().split("-").reverse().join("-");
        week.push(newday);
    }
    return week;
};

const Filter = (props) => {
    const [
        states, 
        districts, 
        selectedState, 
        selectedDistrict,
        AppointmentByDistricts,
        setSelectedState, 
        setSelectedDistrict,
        setAppointmentByDistricts
    ] = useDistricts();

    //const [tableActive, setTableActive] = useState(false);

    let week = currentWeekDates();
    return (
        <div className="main-container">
            <div className="d-flex justify-content-end mt-4">
                <select
                    className="dropdown-style"
                    value={selectedState}
                    onChange={e => {
                        setSelectedState(e.target.value)
                    }}>
                    <option>-- Select State --</option>
                    {
                        states.map(state =>
                            <option
                                value={state.state_id}
                                key={state.state_id} >
                                {state.state_name}
                            </option>
                        )}
                </select>
                <select
                    className="dropdown-style"
                    value={selectedDistrict}
                    onChange={e => {
                        setSelectedDistrict(e.target.value);
                    }}>
                    <option>-- Select District --</option>
                    {
                        districts.map(district =>
                            <option
                                value={district.district_id}
                                key={district.district_id} >
                                {district.district_name}
                            </option>
                        )}
                </select>
            </div>
            <hr></hr>
            <div>
                <table className="table table-condensed">
                    <thead className="unbold">
                        <tr>
                        <th scope="col">Hopital Name</th>
                    {
                        week.map(date => 
                            <th scope="col">{date}</th>)
                    }
                        </tr>
                    </thead>
                    {
                        (selectedDistrict ? AppointmentByDistricts.map(AppointmentByDistrict =>
                                <tbody className="table-body">
                                <SlotsList AppointmentByDistrict={AppointmentByDistrict}/> 
                                </tbody>)
                                : <div>Not available, please select another filter</div>
                        )
                    }   
                </table> 
            </div>
        </div>
    );
}
export default Filter;