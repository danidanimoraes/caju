export type RegistrationStatus = "APPROVED" | "REPROVED" | "REVIEW";

export type Registration = {
  id?: string;
  employeeName: string;
  email: string;
  admissionDate: string;
  status: RegistrationStatus;
  cpf: string;
};
