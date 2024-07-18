import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import api from './api';

function AppointmentCard(props) {
    return <div>
        Appointment Id: {props.appointment.id}
        <Popup trigger={<button> More Details</button>} position="right center">
            <div>Patient Name: {props.appointment.patient_name}</div>
            <div>Doctor Name: {props.appointment.doctor_name}</div>
            <div>Date: {props.appointment.date}</div>
            <div>Time: {props.appointment.time}</div>
        </Popup>
        <button value={props.appointment.id} onClick={cancelAppointment}>Cancel</button>
    </div>;
}

const cancelAppointment = async (event) => {
    await api.delete(`/appointments/${event.target.value}`);
}

export default AppointmentCard;
