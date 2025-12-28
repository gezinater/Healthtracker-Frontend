import type { HealthEntryRequestDTO } from "../types/HealthEntryRequestDTO";
import type { ErrorResponseDTO } from "../types/ErrorResponseDTO";

type HealthEntryCreateFormProps = {
    value: HealthEntryRequestDTO;
    onChangeData: (next: HealthEntryRequestDTO) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onReset: () => void;
    error: ErrorResponseDTO | null;
}

function HealthEntryCreateForm({value, onChangeData, onSubmit, onReset, error}: HealthEntryCreateFormProps){
    return (
    <form onSubmit={onSubmit}>
      {error && (
        <div style={{ color: "red", marginBottom: "0.5rem" }}>
          {error.message}
        </div>
      )}

      <div>
        <label>
            Datum:
            <input
              type="date"
              value={value.date}
              onChange={(e) =>
                onChangeData({...value, date: e.target.value})
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
      </div>
      <div>
        <label>
            Gewicht (kg):
            <input
              type="number"
              value={value.weightInKg}
              onChange={(e) =>
                onChangeData({...value, weightInKg: Number(e.target.value)})
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
      </div>
      <div>
        <label>
            Körpergröße (m):
            <input
              type="number"
              value={value.heightInMeter}
              onChange={(e) =>
                onChangeData({ ...value, heightInMeter: Number(e.target.value)})
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
      </div>
      <div>
        <label>
            Schritte:
            <input
              type="number"
              value={value.steps ?? ""}
              onChange={(e) =>
                onChangeData({ ...value, steps: e.target.value === "" ? null : Number(e.target.value)})
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
      </div>
      <div>
        <label>
            Schlafstunden:
            <input
              type="number"
              value={value.sleepHours ?? ""}
              onChange={(e) =>
                onChangeData({ ...value, sleepHours: e.target.value === "" ? null : Number(e.target.value)})
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
      </div>
      <div>
        <label>
            Wasser:
            <input
              type="number"
              value={value.waterLiters ?? ""}
              onChange={(e) =>
                onChangeData({ ...value, waterLiters: e.target.value === "" ? null : Number(e.target.value)})
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
      <div>
        <button type="submit">Speichern</button>
          <button type="button" onClick={onReset}>Zurücksetzen</button>
      </div>
    </form>
  );
}

export default HealthEntryCreateForm;