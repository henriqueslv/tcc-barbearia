import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from "./CreateAppointmentService";

describe('Criar Agendamento', () =>{
    it('Deve ser permitido criar um novo agendamento', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository,);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');

        });
    
    //it('Nao deve ser permitido criar dois agendamentos no mesmo horario', ()=>{
    //});
});