import type { HealthEntryResponseDTO } from "../types/HealthEntryResponseDTO";


type HealthEntryListProps = {
  entries: HealthEntryResponseDTO[];
  onDelete: (id: number) => void;
  onEdit: (entry: HealthEntryResponseDTO) => void;
};

function HealthEntryList({entries, onDelete, onEdit}: HealthEntryListProps) {
  return <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.date}</strong>, {entry.weightInKg} kg,{" "}
            {entry.heightInMeter}m,{" "}
            {entry.steps ?? 0} steps,{" "}
            {entry.sleepHours} std.,{" "}
            {entry.waterLiters} l
            <button type="button" onClick={() => onDelete(entry.id)}>Löschen</button>
            <button type="button" onClick={() => onEdit(entry)}>Bearbeiten</button>
          </li>
        ))}
      </ul>;
}

export default HealthEntryList;