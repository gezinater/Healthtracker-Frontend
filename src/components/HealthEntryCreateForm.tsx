import type { HealthEntryRequestDTO } from "../types/HealthEntryRequestDTO";

type HealthEntryCreateFormProps = {
    value: HealthEntryRequestDTO;
    onChangeData: (next: HealthEntryRequestDTO) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onReset: () => void;
}

function HealthEntryCreateForm({value, onChangeData, onSubmit, onReset}: HealthEntryCreateFormProps){
    return (
    <form onSubmit={onSubmit}>
      {/* Inputs kommen gleich hier rein */}
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
      </div>
      <div>
        <button type="submit">Speichern</button>
          <button type="button" onClick={onReset}>Zurücksetzen</button>
      </div>
    </form>
  );
}

export default HealthEntryCreateForm;