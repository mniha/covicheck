import { useEffect, useCallback, useState } from 'react';
import axios from "axios";


export const useDistricts = (props) => {
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);
    const [AppointmentByDistricts, setAppointmentByDistricts] = useState([]);

    // to fetch states list and set in state
    const fetchStates = useCallback(() => {
        //event.preventDefault();
        axios({
        "method": "GET",
        "url": "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        })
        .then((response) => {
            setStates(response.data.states);  
        })
        .catch((error) => {
            setStates([]);
            console.log(error);
        })
    }, [])

    // To fetch states when component is mounted
    useEffect(() => {
        fetchStates();
    }, []);

    const fetchDistricts = useCallback(() => {
        
        if(!selectedState) {
            return;
        }
        axios({
          "method": "GET",
          "url": `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`,
        })
        .then((response) => {
            setDistricts(response.data.districts);  
        })
        .catch((error) => {
            setDistricts([]);
            console.log(error);
        })
    }, [selectedState])

    useEffect(() => {
        // fetch district list
        fetchDistricts();
    }, [selectedState]);

    const fetchAppointmentByDistricts = useCallback(() => {
        if(!selectedDistrict) {
            return;
        }
        axios({
          "method": "GET",
          "url": `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrict}&date=18-05-2021`,
        })
        .then((response) => {
            setAppointmentByDistricts(response.data.centers);
        })
        .catch((error) => {
            setAppointmentByDistricts([]);
            console.log(error);
        })
    }, [selectedDistrict])

    useEffect(() => {
        // fetch district list
        fetchAppointmentByDistricts();
    }, [selectedDistrict]);

    return [
        states, 
        districts, 
        selectedState, 
        selectedDistrict,
        AppointmentByDistricts,
        setSelectedState, 
        setSelectedDistrict,
        setAppointmentByDistricts
    ];
}

export default useDistricts;