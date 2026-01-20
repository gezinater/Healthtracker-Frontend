import { useEffect, useState } from "react";
import type { HealthEntryResponseDTO } from "./types/HealthEntryResponseDTO";
import type { HealthEntryRequestDTO } from "./types/HealthEntryRequestDTO";
import type { ErrorResponseDTO } from "./types/ErrorResponseDTO";
import type { HealthEntryPageResponseDTO } from "./types/HealthEntryPageResponseDTO";
import HealthEntryList from "./components/HealthEntryList";
import HealthEntryEditPanel from "./components/HealthEntryEditPanel";
import HealthEntryCreateForm from "./components/HealthEntryCreateForm";
import Modal from "./components/modal/Modal";

function App() {
  const emptyEntry: HealthEntryRequestDTO = {
    date: "",
    weightInKg: 0,
    heightInMeter: 0,
    steps: null,
    sleepHours: null,
    waterLiters: null,
  };


  const pageSize = [5, 10, 20, 50];
  type EntryQuery = {
    page: number;
    size: number;
    from: string | null;
    to: string | null;
  };
  const [query, setQuery] = useState<EntryQuery>({
    page: 0,
    size: 10,
    from: null,
    to: null,
  });
  const [entryPage, setEntryPage] = useState<HealthEntryPageResponseDTO | null>(
    null
  );
  //const [entries, setEntries] = useState<HealthEntryResponseDTO[]>([]);
  const [newEntry, setNewEntry] = useState<HealthEntryRequestDTO>(emptyEntry);
  const [editingEntry, setEditingEntry] = useState<{
    id: number;
    data: HealthEntryRequestDTO;
  } | null>(null);
  const [createError, setCreateError] = useState<ErrorResponseDTO | null>(null);
  const [createEditError, setCreateEditError] =
    useState<ErrorResponseDTO | null>(null);
  const isDateRangeInvalid = query.from !== null && query.to !== null && query.from > query.to;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isDateRangeInvalid) {
      return;
    }

    const baseUrl: string = "http://localhost:8080/api/entries";
    const params = new URLSearchParams();
    params.set("page", String(query.page));
    params.set("size", String(query.size));
    if (query.from !== null) {
      params.set("from", String(query.from));
    }
    if (query.to !== null) {
      params.set("to", String(query.to));
    }
    const url: string = baseUrl + "?" + params.toString();

    fetch(url)
      .then((res) => res.json())
      .then((data: HealthEntryPageResponseDTO) => {
        setEntryPage(data);
      })
      .catch((err) => console.error("Error fetching entries:", err));
  }, [query.page, query.size, query.from, query.to]);

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

        setEntryPage((prev) =>
          prev
            ? {
              ...prev,
              content: [...prev.content, createdEntry],
              totalElements: prev.totalElements + 1,
            }
            : prev
        );
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
        setEntryPage((prev) =>
          prev
            ? {
              ...prev,
              content: prev.content.filter((e) => e.id !== id),
              totalElements: prev.totalElements - 1,
            }
            : prev
        );
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
    if (editingEntry === null) {
      return;
    }

    setCreateEditError(null);
    setIsSaving(true);

    fetch(`http://localhost:8080/api/entries/${editingEntry.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingEntry.data),
    })
      .then(async (res) => {
        if (res.status === 400) {
          const errorBody: ErrorResponseDTO = await res.json();
          setCreateEditError(errorBody);
          return null; // wichtig: stoppt "Erfolgspfad"
        }

        if (!res.ok) {
          throw new Error(`PUT failed with status ${res.status}`);
        }

        const updatedEntry = await res.json();
        return updatedEntry;
      })
      .then((updatedEntry) => {
        if (!updatedEntry) {
          return; // z.B. bei 400
        }

        setEntryPage((prev) =>
          prev
            ? {
              ...prev,
              content: prev.content.map((entry) =>
                entry.id === updatedEntry.id ? updatedEntry : entry
              ),
            }
            : prev
        );

        // NUR bei Erfolg schließen
        closeEditModal();
      })
      .catch((err) => {
        console.error(err);
        // optional: hier könntest du noch einen globalen Fehler setzen
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const closeEditModal = () => {
    setEditingEntry(null);
    setCreateEditError(null);
  }

  return (
    <div>
      <h1>Health Entries</h1>
      <div>
        <button
          type="button"
          onClick={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
          disabled={!entryPage || query.page === 0}
        >
          Zurück
        </button>
        <span>
          Seite {query.page + 1} von {entryPage?.totalPages ?? 1} (insgesamt{" "}
          {entryPage?.totalElements ?? 0} Einträge)
        </span>
        <button
          type="button"
          onClick={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
          disabled={!entryPage || query.page + 1 >= (entryPage.totalPages ?? 0)}
        >
          Weiter
        </button>
        <label>
          Einträge pro Seite:
          <select
            value={query.size}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              setQuery((q) => ({ ...q, page: 0, size: newSize }));
            }}
          >
            {pageSize.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Datum-von:
          <input
            type="date"
            value={query.from ?? ""}
            onChange={(e) =>
              setQuery((q) => ({
                ...q,
                page: 0,
                from: e.target.value || null,
              }))
            }
          />
        </label>
        <label>
          {" "}
          Datum-bis:
          <input
            type="date"
            value={query.to ?? ""}
            onChange={(e) =>
              setQuery((q) => ({
                ...q,
                page: 0,
                to: e.target.value || null,
              }))
            }
          />
        </label>
        <button
          type="button"
          onClick={() =>
            setQuery((q) => ({ ...q, page: 0, from: null, to: null }))
          }
        >
          Datum Reset
        </button>
      </div>
      {isDateRangeInvalid && (
        <p style={{ color: "red" }}>Datum-von darf nicht nach Datum-bis liegen.</p>
      )}
      <HealthEntryList
        entries={entryPage?.content ?? []}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />

      <Modal
        isOpen={editingEntry !== null}
        onClose={closeEditModal}
        title="Eintrag bearbeiten"
      >
        <HealthEntryEditPanel
          editing={editingEntry}
          onCancel={closeEditModal}
          onChangeData={(nextData) =>
            setEditingEntry((prev) =>
              prev ? { id: prev.id, data: nextData } : prev
            )}
          onSave={handlePut}
          onSaving={isSaving}
          error={createEditError}
        />
      </Modal>

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
