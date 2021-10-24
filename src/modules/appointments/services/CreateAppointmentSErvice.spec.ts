import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from "./CreateAppointmentService";

describe('Criar Agendamento', () =>{
    it('Deve ser permitido criar um novo agendamento', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository,);

        const appointmentDate = new Date(2021,8,25,11);
        const appointment = await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123123');

        });
    
    it('Nao deve ser permitido criar dois agendamentos no mesmo horario', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository,);

        await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123',
            });

            expect(createAppointment.execute({
                date: new Date(),
                provider_id: '123123123',
                })).rejects.toBeInstanceOf(Error);

        });
});