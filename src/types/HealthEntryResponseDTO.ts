export interface HealthEntryResponseDTO {
    id: number;
    date: string; // kommt als ISO-String im JSON
    weightInKg: number;
    heightInMeter: number;
    steps?: number | null;
    sleepHours?: number | null;
    waterLiters?: number | null;
}