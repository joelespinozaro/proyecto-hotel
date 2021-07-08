export interface TipoDocumento {
    id: number;
    tag: string;
    descripcion: string;
    Cliente: Cliente[];
    recepcionista: Recepcionista[];
}

export interface Cliente {
    id: number;
    nombres: string;
    apellidos: string;
    tipodoc: number;
    numdoc: string;
    sexo: string;
    telefono: number;
    email: string;
    tipodocumento: TipoDocumento[] | null;
    reserva: Reserva[] | null;
}

export interface Recepcionista {}
export interface Reserva {}