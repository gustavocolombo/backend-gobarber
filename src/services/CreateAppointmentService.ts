import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';

interface RequestDTO{
  provider: string;
  date: Date;
}

class CreateAppointmentsService{
  private appointmentsRepository : AppointmentsRepository;

    constructor(appointmentsRepository : AppointmentsRepository){
      this.appointmentsRepository = appointmentsRepository;
    }

  public execute({provider, date} : RequestDTO){
    const startedHour = startOfHour(date);

  const findAppointmentInSameDate = this.appointmentsRepository.findByDate(parsedDate);

  if(findAppointmentInSameDate){
    throw new Error('This appointment is already booked');
  }

  const appointment = this.appointmentsRepository.create({provider, date});

  return appointment;
  }

}

export default CreateAppointmentsService;