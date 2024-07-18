import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";


import api from './api';
import AppointmentCard from './AppointmentCard';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [appointments, setAppointment] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  const getAllAppointments = async () => {
    const response = await api.get('/appointments/');
    setAppointment(response.data)
  }

  const onCreateAppointment = async (event) => {
    event.preventDefault();
    await api.post('/appointments/', {
      "patient_name": patientName,
      "doctor_name": doctorName,
      "date": dateTime.toLocaleDateString(),
      "time": dateTime.toLocaleTimeString(),
    });
  }
  
  useEffect(() => {
    getAllAppointments();
  }, [appointments])

  return (
    <div>
    <div>
      <form onSubmit={onCreateAppointment}>
        <div>
          <input
            onChange={handlePatientNameChange}
            value={patientName}
            type="text"
            placeholder="Patient Name"
          />
        </div>
        <div>
          <input
            onChange={handleDoctorNameChange}
            value={doctorName}
            type="text"
            placeholder="Doctor Name"
          />
        </div>
        <div>
          <DatePicker
            selected={dateTime}
            showIcon
            showTimeSelect
            locale="en-GB"
            dateFormat="dd/MM/yyyy h:mm aa"
            onChange={(newDateTime) => setDateTime(newDateTime)} 
          />
        </div>
        <div>
          <button>Create Appointment</button>
        </div>
      </form>
      
    </div>
    <hr/>
    {appointments.map((item) => <AppointmentCard appointment={item}/>)}
    </div>
  );
}

export default App;
