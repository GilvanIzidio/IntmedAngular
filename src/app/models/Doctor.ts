import DoctorSpecificities from "./DoctorSpecificities";
export type Doctor = {
  id: number,
  crm: number,
  nome: string,
  especialidade: DoctorSpecificities
}

export default Doctor;
