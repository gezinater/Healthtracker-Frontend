import type { HealthEntryRequestDTO } from "../types/HealthEntryRequestDTO";
import type { ErrorResponseDTO } from "../types/ErrorResponseDTO";

type HealthEntryEditPanelProps = {
    editing: {id: number; data: HealthEntryRequestDTO} | null;
    onCancel: () => void;
    onChangeData: (next: HealthEntryRequestDTO) => void;
    onSave: () => void;
    error: ErrorResponseDTO | null;
}

function HealthEntryEditPanel ({editing, onCancel, onChangeData, onSave, error}: HealthEntryEditPanelProps) {
  if (!editing) {
    return null;
  }

  return (
    <div>
        <div>
          <h2>Bearbeiten</h2>
          {error && (
            <div style={{ color: "red", marginBottom: "0.5rem" }}>
              {error.message}
            </div>
          )}
          <label>
            Datum:
            <input
                type="date"
                value={editing.data.date}
                onChange={(e) =>
                    onChangeData({
                        ...editing.data,
                        date: e.target.value,
                    })
                }
            />
          </label>
          {error?.details
            .filter((d) => d.field === "date")
            .map((d, index) => (
            <div key={index} style={{ color: "red", fontSize: "0.9rem" }}>
              {d.message}
            </div>
          ))}
          <label>
            {" "}Gewicht:
            <input
              type="number"
              value={editing.data.weightInKg}
              onChange={(e) =>
                onChangeData({
                  ...editing.data,
                  weightInKg: Number(e.target.value)
                  })
              }
            />
          </label>
          {error?.details
            .filter((d) => d.field === "weightInKg")
            .map((d, index) => (
            <div key={index} style={{ color: "red", fontSize: "0.9rem" }}>
              {d.message}
            </div>
          ))}
          <label>
            {" "}Größe:
            <input
              type="number"
              value={editing.data.heightInMeter}
              onChange={(e) =>
                onChangeData({
                  ...editing.data,
                  heightInMeter: Number(e.target.value)
                  })
              }
            />
          </label>
          {error?.details
            .filter((d) => d.field === "heightInMeter")
            .map((d, index) => (
            <div key={index} style={{ color: "red", fontSize: "0.9rem" }}>
              {d.message}
            </div>
          ))}
          <label>
            {" "}Schritte:
            <input
              type="number"
              value={editing.data.steps ?? ""}
              onChange={(e) =>
                onChangeData({
                  ...editing.data,
                  steps: Number(e.target.value)
                })
              }
            />
          </label>
          {error?.details
            .filter((d) => d.field === "steps")
            .map((d, index) => (
            <div key={index} style={{ color: "red", fontSize: "0.9rem" }}>
              {d.message}
            </div>
          ))}
          <label>
            {" "}Schlafstunden:
            <input
              type="number"
              value={editing.data.sleepHours ?? ""}
              onChange={(e) =>
                onChangeData({
                    ...editing.data,
                    sleepHours: Number(e.target.value)
                  })
              }
            />
          </label>
          {error?.details
            .filter((d) => d.field === "sleepHours")
            .map((d, index) => (
            <div key={index} style={{ color: "red", fontSize: "0.9rem" }}>
              {d.message}
            </div>
          ))}
          <label>
            {" "}Trinken:
            <input
              type="number"
              value={editing.data.waterLiters ?? ""}
              onChange={(e) =>
                onChangeData({
                    ...editing.data,
                    waterLiters: Number(e.target.value)
                  })
              }
            />
          </label>
          {error?.details
            .filter((d) => d.field === "waterLiters")
            .map((d, index) => (
            <div key={index} style={{ color: "red", fontSize: "0.9rem" }}>
              {d.message}
            </div>
          ))}
        </div>
        <button type="button" onClick={onSave}>Speichern</button>
        <button type="button" onClick={onCancel}>Abbrechen</button>
    </div>
  )
}

export default HealthEntryEditPanel;