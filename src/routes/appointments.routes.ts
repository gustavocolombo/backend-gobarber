import  { Router } from 'express';
import { parseISO, } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository} from 'typeorm';
import AppointmentsReposirory from '../repositories/AppointmentsRepository';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const appointmentsRouter = Router(); 

appointmentsRouter.use(ensureAutenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsReposirory);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async  (request, response) => {
 
  const { provider_id, date } = request.body;
  
  const parsedDate = parseISO(date);
  
  const createAppointment = new CreateAppointmentService( );

  const appointment = await createAppointment.execute({date: parsedDate, provider_id});
  
    return response.json( appointment );

});



export default appointmentsRouter;