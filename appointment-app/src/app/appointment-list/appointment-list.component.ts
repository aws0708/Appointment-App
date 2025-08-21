import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle : string = "";
  newAppointmentDate : Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    //for showing data on page load
    let savedAppointments = localStorage.getItem("appointments");

    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
    
  }

  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppoint:Appointment={
        id:Date.now(),
        title:this.newAppointmentTitle,
        date:this.newAppointmentDate
      }
      this.appointments.push(newAppoint);
      this.newAppointmentTitle="";
      this.newAppointmentDate=new Date();
      // storing data in local storage
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
  }

  // deleting appointment
  deleteAppointment(index:number){
    this.appointments.splice(index,1);
    // storing data in local storage
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }
}
