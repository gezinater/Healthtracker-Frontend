export interface HealthEntryRequestDTO{
    date: string;
    weightInKg: number;
    heightInMeter: number;
    steps?: number | null;
    sleepHours?: number | null;
    waterLiters?: number | null;
}