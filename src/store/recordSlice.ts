import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface EmployeeRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
}

const demoRecords: EmployeeRecord[] = [];

// load records from local storage  or use demo data
const loadRecordsFromStorage = () => {
  try {
    const savedRecords = localStorage.getItem("employeeRecords");
    return savedRecords ? JSON.parse(savedRecords) : demoRecords;
  } catch (error) {
    console.log(`Error loading records: ${error}`);
  }
};

// Calculate the next ID based on the existing records
const calculateNextId = (records: { id: number }[]) => {
  if (!records || records.length === 0) {
    return 1;
  }
  const maxId = Math.max(...records.map((record: { id: number }) => record.id));
  return maxId + 1;
};

const recordSlice = createSlice({
  name: "records",
  initialState: {
    items: loadRecordsFromStorage(),
    searchTerm: "",
    nextId: calculateNextId(loadRecordsFromStorage()),
  },

  reducers: {
    // Add record
    addRecord: (state, action) => {
      state.items.push(action.payload);

      localStorage.setItem("employeeRecords", JSON.stringify(state.items));

      state.nextId = calculateNextId(state.items);
    },

    // Update record
    updateRecord: (state, action) => {
      const updatedRecord = action.payload;

      const index = state.items.findIndex(
        (r: EmployeeRecord) => r.id === updatedRecord.id,
      );

      if (index !== -1) {
        state.items[index] = updatedRecord;

        localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      }
    },

    // delete record
    deleteRecord: (state, action) => {
      state.items = state.items.filter(
        (r: EmployeeRecord) => r.id !== action.payload,
      );
      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // search record
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    resetAllRecords: (state) => {
      state.items = demoRecords;
      state.nextId = calculateNextId(demoRecords);
      localStorage.setItem("employeeRecords", JSON.stringify(demoRecords));
    },
  },
});

export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setSearchTerm,
  resetAllRecords,
} = recordSlice.actions;

// SELECTORS
export const selectAllRecords = (state: RootState) => state.records.items;
export const selectSearchTerm = (state: RootState) => state.records.searchTerm;

export const selectFilteredRecords = (state: RootState) => {
  const term = state.records.searchTerm.toLowerCase();

  return state.records.items.filter((r: EmployeeRecord) => {
    return (
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term)
    );
  });
};
export default recordSlice.reducer;
