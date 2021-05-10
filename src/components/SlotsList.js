import React, { useState, useCallback, useEffect } from 'react';

function SlotsList(props) {

    const AppointmentByDistrict = props.AppointmentByDistrict;
    return(
        <>
            {
                <tr key={AppointmentByDistrict.center_id}>
                    <td>{AppointmentByDistrict.name}
                        <br/> <span className="text-muted">{AppointmentByDistrict.address}</span>
                    </td>
                    { AppointmentByDistrict.sessions.map(session => session.available_capacity===0 ?
                        <td>
                            <span className="badge badge-pill badge-danger">Booked
                            <br/> 
                            <span className="small">{session.vaccine}</span>
                            </span>
                        </td>
                            :
                        <td>
                            <span className="badge badge-pill badge-success">{session.available_capacity}
                            <br/> <span className="small">{session.vaccine}</span>
                            </span>
                        </td>
                    )}
                </tr>
            }
        </>    
    );
}
export default SlotsList;