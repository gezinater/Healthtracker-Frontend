import type { HealthEntryRequestDTO } from "../types/HealthEntryRequestDTO";

type HealthEntryEditPanelProps = {
    editing: {id: number; data: HealthEntryRequestDTO} | null;
    onCancel: () => void;
    onChangeData: (next: HealthEntryRequestDTO) => void;
    onSave: () => void;
}

function HealthEntryEditPanel ({editing, onCancel, onChangeData, onSave}: HealthEntryEditPanelProps) {
    if (!editing) {
    return null;
  }

  return (
    <div>
            <div>
            <h2>Bearbeiten</h2>
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
            </div>
        <button type="button" onClick={onSave}>Speichern</button>
        <button type="button" onClick={onCancel}>Abbrechen</button>
    </div>
  )
}

export default HealthEntryEditPanel;