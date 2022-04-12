import Doctor from './Doctor'

export type AppointmentResponse = {
  id: number,
	dia: string,
	horario: string,
	data_agendamento: string,
	medico: Doctor
}

export type AppointmentRequest = {
  agenda_id: number,
	horario: string,
}


