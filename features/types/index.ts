type TipoHabitacion = "SIMPLE" | "DOBLE" | "MATRIMONIAL";
type TipoDocumento = "DNI" | "RUC" | "CEX" | "PASAPORTE";

export interface Cliente {
  id: string;
  nombres: string;
  apellidos: string;
  numDoc: string;
  sexo: string;
  telefono: number;
  email: string;
  tipodocumento: TipoDocumento;
  reserva: Reserva[] | null;
}

export interface Habitacion {
  id: string;
  numHabitacion: number;
  estado: boolean;
  precio: number;
  tipoHabitacion: TipoHabitacion;
  reserva: Reserva[] | null;
}

export interface Recepcionista {
  id: string;
  nombres: string;
  apellidos: string;
  numDoc: string;
  tipoDocumento: TipoDocumento;
  reserva: Reserva[] | null;
}

export interface Reserva {
  id: string;
  idCliente: string;
  idHabitacion: string;
  idRecepcionista: string;
  fechaInicio: string;
  fechaFin: string;
  createdAt: Date;
  updatedAt: Date;
  cliente: Cliente[] | null;
  habitacion: Habitacion[] | null;
  recepcionista: Recepcionista[] | null;
}

export type Navigation = {
  name: string;
  href: string;
  current: boolean;
};

//TODO completar los types de los modelos de la db
