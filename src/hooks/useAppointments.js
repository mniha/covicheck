import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useAppointments = ([selectedDistrict]) => {
    const [appointmentByDistricts, setAppointmentByDistricts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAppointmentByDistricts = useCallback(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        let newDate = currentDate.toString().split("-").reverse().join("-");

        if (!selectedDistrict) {
            return;
        }
        setIsLoading(true);
        axios({
            method: "GET",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrict}&date=${newDate}`,
        })
            .then((response) => {
                setAppointmentByDistricts(response.data.centers);
                setIsLoading(false);
            })
            .catch((error) => {
                setAppointmentByDistricts([]);
                console.log(error);
            });
    }, [selectedDistrict]);

    // To set interval when component is mounted
    useEffect(() => {
        const timer = setInterval(() => {
            // fetch district list
            fetchAppointmentByDistricts();
        }, 8000);

        return () => {
            clearInterval(timer);
        };
    },[fetchAppointmentByDistricts]);

    // To fetch slots when district is selected
    useEffect(() => {
        fetchAppointmentByDistricts();
    }, [selectedDistrict]);

    return [appointmentByDistricts, isLoading];
};

export default useAppointments;
