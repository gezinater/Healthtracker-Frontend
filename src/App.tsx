import { useEffect, useState } from "react";
import type { HealthEntryResponseDTO } from "./types/HealthEntryResponseDTO";
import type { HealthEntryRequestDTO } from "./types/HealthEntryRequestDTO";
import type { ErrorResponseDTO } from "./types/ErrorResponseDTO";
import HealthEntryList from "./components/HealthEntryList";
import HealthEntryEditPanel from "./components/HealthEntryEditPanel";
import HealthEntryCreateForm from "./components/HealthEntryCreateForm";

function App() {
  const emptyEntry: HealthEntryRequestDTO = {
    date: "",
    weightInKg: 0,
    heightInMeter: 0,
    steps: null,
    sleepHours: null,
    waterLiters: null,
  };
  const [entries, setEntries] = useState<HealthEntryResponseDTO[]>([]);
  const [newEntry, setNewEntry] = useState<HealthEntryRequestDTO>(emptyEntry);
  const [editingEntry, setEditingEntry] = useState<{
    id: number;
    data: HealthEntryRequestDTO;
  } | null>(null);
  const [createError, setCreateError] = useState<ErrorResponseDTO | null>(null);
  const [createEditError, setCreateEditError] =
    useState<ErrorResponseDTO | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/entries")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((err) => console.error("Error fetching entries:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // alten Fehler zurücksetzen
    setCreateError(null);

    fetch("http://localhost:8080/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => {
        if (res.status === 400) {
          // Validierungsfehler vom Backend
          return res.json().then((errorBody: ErrorResponseDTO) => {
            setCreateError(errorBody);
            // hier KEIN throw, sondern "abbrechen"
            return null;
          });
        }

        if (!res.ok) {
          throw new Error("Failed to create entry");
        }

        return res.json();
      })
      .then((createdEntry) => {
        // Wenn wir wegen Fehler "null" zurückgegeben haben → hier abbrechen
        if (!createdEntry) {
          return;
        }

        setEntries((prev) => [...prev, createdEntry]);
        setNewEntry(emptyEntry);
      })
      .catch((err) => {
        console.error(err);
        // optional: später globaler Fehler-Toast etc.
      });
  };

  const handleDelete = (id: number) => {
    const shouldDelete = window.confirm(
      "Möchten Sie diesen Eintrag wirklich löschen?"
    );

    if (!shouldDelete) {
      return;
    }

    fetch(`http://localhost:8080/api/entries/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete this entity with id: " + id);
        }
        setEntries((prev) => prev.filter((e) => e.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetForm = () => {
    setNewEntry(emptyEntry);
  };

  const handleEditClick = (entryToEdit: HealthEntryResponseDTO) => {
    setEditingEntry({
      id: entryToEdit.id,
      data: {
        date: entryToEdit.date,
        weightInKg: entryToEdit.weightInKg,
        heightInMeter: entryToEdit.heightInMeter,
        steps: entryToEdit.steps ?? null,
        sleepHours: entryToEdit.sleepHours ?? null,
        waterLiters: entryToEdit.waterLiters ?? null,
      },
    });
  };

  const handlePut = () => {
    if (editingEntry !== null) {
      setCreateEditError(null);

      fetch(`http://localhost:8080/api/entries/${editingEntry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingEntry.data),
      })
        .then((res) => {
          if (res.status === 400) {
            res.json().then((errorBody: ErrorResponseDTO) => {
              setCreateEditError(errorBody);
              return null;
            });
          }

          if (!res.ok) {
            throw new Error(`PUT failed with status ${res.status}`);
          }

          return res.json();
        })
        .then((updatedEntry) => {
          if (!updatedEntry) {
            return;
          }

          setEntries((prevEntries) =>
            prevEntries.map((entry) =>
              entry.id === updatedEntry.id ? updatedEntry : entry
            )
          );
        })
        .then(() => {
          setEditingEntry(null);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>Health Entries</h1>
      <HealthEntryList
        entries={entries}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />

      <HealthEntryEditPanel
        editing={editingEntry}
        onCancel={() => setEditingEntry(null)}
        onChangeData={(nextData) =>
          setEditingEntry((prev) =>
            prev ? { id: prev.id, data: nextData } : prev
          )
        }
        onSave={handlePut}
        error={createEditError}
      />

      <HealthEntryCreateForm
        value={newEntry}
        onChangeData={setNewEntry}
        onSubmit={handleSubmit}
        onReset={resetForm}
        error={createError}
      />
    </div>
  );
}

export default App;
