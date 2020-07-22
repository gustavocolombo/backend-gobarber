import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO{
  provider: string;
  date: Date;
}

class AppointmentsReposirory{
  private appointments : Appointment[];

    constructor(){
      this.appointments = [];
    }

      public create({provider, date}: CreateAppointmentDTO) : Appointment{
        const appointment =  new Appointment();
        
        this.appointments.push(appointment);

        return appointment;
      }

      public findByDate(date: Date): Appointment | null {
        const findAppointmentInSameDate = this.appointments.find (appointment => 
          isEqual( date, appointment.date )
        );

        return findAppointmentInSameDate || null;
      }

      public listAll() : Appointment[]{
        return this.appointments;        
      }
}

export default AppointmentsReposirory;