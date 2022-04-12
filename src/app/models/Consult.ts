import Doctor from "./Doctor";

export type Consult = {
  id:number,
  dia: string,
  horario: string,
  data_agendamento: string,
  medico: Doctor;
}

export default Consult;
