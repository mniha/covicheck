import { useEffect, useCallback, useState } from "react";
import axios from "axios";

export const useDistricts = (props) => {
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);
    

    // to fetch states list and set in state
    const fetchStates = useCallback(() => {
        axios({
            method: "GET",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        })
            .then((response) => {
                setStates(response.data.states);
            })
            .catch((error) => {
                setStates([]);
                console.log(error);
            });
    }, []);

    const fetchDistricts = useCallback(() => {
        if (!selectedState) {
            return;
        }
        axios({
            method: "GET",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`,
        })
            .then((response) => {
                setDistricts(response.data.districts);
            })
            .catch((error) => {
                setDistricts([]);
                console.log(error);
            });
    }, [selectedState]);

    // To fetch states when component is mounted
    useEffect(() => {
        fetchStates();
    },[fetchStates]);

    // To fetch district list when selected state is changed
    useEffect(() => {
        fetchDistricts();
    }, [selectedState]);

    return [
        states,
        districts,
        selectedState,
        selectedDistrict,
        setSelectedState,
        setSelectedDistrict,
    ];
};

export default useDistricts;
