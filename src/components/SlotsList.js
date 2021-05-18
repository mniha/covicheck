import React from "react";
import useAppointments from "../hooks/useAppointments";

function SlotsList(props) {
    const selectedDistrict = props.selectedDistrict;
    const [appointmentByDistricts] = useAppointments([selectedDistrict]);
    const applyIsAvailableFilter = props.applyIsAvailable;
    const applyEighteenPlusFilter = props.applyEighteenPlus;

    let appointments = [...appointmentByDistricts];
    if (applyIsAvailableFilter) {
        appointments = appointments.reduce((accumulator, appointment) => {
            const sessions = appointment.sessions.filter(
                (session) => session.available_capacity > 0
            );
            if (sessions.length !== 0) {
                accumulator = [
                    ...accumulator,
                    { ...appointment, sessions: sessions },
                ];
            }
            return accumulator;
        }, []);
    }

    if (applyEighteenPlusFilter) {
        appointments = appointments.reduce((accumulator, appointment) => {
            const sessions = appointment.sessions.filter(
                (session) => session.min_age_limit === 18
            );
            if (sessions.length !== 0) {
                accumulator = [
                    ...accumulator,
                    { ...appointment, sessions: sessions },
                ];
            }
            return accumulator;
        }, []);
    }

    const currentWeekDates = () => {
        let curr = new Date();
        const todaysDate = curr
            .toISOString()
            .slice(0, 10)
            .toString()
            .split("-")
            .reverse()
            .join("-");
        let week = [todaysDate];

        for (let i = 1; i <= 6; i++) {
            let nextDate = curr.getDate() + 1;
            let day = new Date(curr.setDate(nextDate))
                .toISOString()
                .slice(0, 10);
            let newday = day.toString().split("-").reverse().join("-");
            week = [...week, newday];
        }
        return week;
    };

    let week = currentWeekDates();
    return (
        <table className="table table-condensed">
            <thead className="unbold">
                <tr>
                    <th scope="col">Hopital Name</th>
                    {week.map((date) => (
                        <th id={date} key={date} scope="col">
                            {date.slice(0, 5).replace("-", "/")}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="table-body">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <tr key={appointment.center_id}>
                            <td>
                                {appointment.name}
                                <br />{" "}
                                <span className="text-muted">
                                    {appointment.address}
                                </span>
                            </td>
                            {week.map((d) => (
                                <td>
                                    {appointment.sessions.map((session) => (
                                        <>
                                            {session.date === d && (
                                                <span
                                                    className={`badge badge-pill ${
                                                        session.available_capacity ===
                                                        0
                                                            ? "badge-danger"
                                                            : "badge-success"
                                                    }`}
                                                >
                                                    {session.available_capacity ===
                                                    0 ? (
                                                        "Booked"
                                                    ) : (
                                                        <>
                                                            {session.available_capacity +
                                                                " "}

                                                            <small>
                                                                (
                                                                {
                                                                    session.min_age_limit
                                                                }+
                                                                )
                                                            </small>
                                                        </>
                                                    )}
                                                    <br />
                                                    <span className="small">
                                                        {session.vaccine}
                                                    </span>
                                                </span>
                                            )}
                                        </>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr className="text-center">
                        <td colSpan="8">
                            <h5> Slot is not available. </h5>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
export default SlotsList;
