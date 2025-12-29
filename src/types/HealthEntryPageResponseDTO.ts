import type { HealthEntryResponseDTO } from "../types/HealthEntryResponseDTO";

export interface HealthEntryPageResponseDTO {
    content: HealthEntryResponseDTO[];
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}