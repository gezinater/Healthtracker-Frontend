export interface FieldErrorDTO {
    field: string;
    message: string;
}

export interface ErrorResponseDTO {
    status: number;
    error: string;
    message: string;
    timestamp: string;
    details: FieldErrorDTO[];
}