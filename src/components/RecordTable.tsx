import { Button, Tooltip } from "@mui/material";
import { Trash2, Edit2 } from "lucide-react";
import Footer from "./Footer";

import {
  deleteRecord,
  selectFilteredRecords,
  selectAllRecords,
} from "../store/recordSlice";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import RecordModel from "./RecordModel";
import type { EmployeeRecord } from "../types/employee";

import toast from "react-hot-toast";

const RecordTable = () => {
  const dispatch = useDispatch();

  const filteredRecords = useSelector(selectFilteredRecords);
  const allRecords = useSelector(selectAllRecords);

  const storedRecords = [...filteredRecords].sort((a, b) => b.id - a.id);

  // Modal State
  const [open, setOpen] = useState(false);

  // Current Edit Record
  const [selectedRecord, setSelectedRecord] = useState<EmployeeRecord | null>(
    null,
  );

  // Open Edit Modal
  const openEditModel = (record: EmployeeRecord) => {
    setSelectedRecord(record);
    setOpen(true);

    // EDIT TOAST
    toast.success("Edit mode opened");
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  // Delete
  const handleDelete = (id: number, record: EmployeeRecord) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <span className="text-sm font-medium text-gray-700">
          Are you sure want to delete{" "}
          <span className="font-bold text-red-500">{record.name}</span>?
        </span>

        <div className="flex items-center justify-end gap-2">
          {/* Cancel Button */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              dispatch(deleteRecord(id));

              toast.dismiss(t.id);

              toast.success("Record deleted successfully");
            }}
            className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md max-w-7xl mx-auto overflow-hidden">
        {/* Responsive Wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-100 md:min-w-full">
            {/* Header */}
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>

                <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>

                <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>

                <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Position
                </th>

                <th className="px-4 sm:px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-200 bg-white">
              {storedRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-48 sm:h-64 bg-slate-50">
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <p className="text-base font-medium">No Record Found</p>

                      <p className="text-sm text-gray-400 mt-1">
                        Add a new record to get started
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                storedRecords.map((record, index) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-4 sm:px-6 py-4 text-sm whitespace-nowrap">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 sm:px-6 py-4 text-sm max-w-35">
                      <Tooltip
                        title={record.name}
                        arrow
                        disableHoverListener={record.name.length < 18}
                      >
                        <p className="truncate cursor-pointer">{record.name}</p>
                      </Tooltip>
                    </td>

                    {/* Email */}
                    <td className="px-4 sm:px-6 py-4 text-sm max-w-35">
                      <Tooltip
                        title={record.email}
                        arrow
                        disableHoverListener={record.email.length < 18}
                      >
                        <p className="truncate cursor-pointer">
                          {record.email}
                        </p>
                      </Tooltip>
                    </td>

                    {/* Phone */}
                    <td className="px-4 sm:px-6 py-4 text-sm whitespace-nowrap">
                      {record.phone}
                    </td>

                    {/* Position */}
                    <td className="px-4 sm:px-6 py-4 text-sm max-w-35">
                      <Tooltip
                        title={record.position}
                        arrow
                        disableHoverListener={record.position.length < 18}
                      >
                        <p className="truncate cursor-pointer">
                          {record.position}
                        </p>
                      </Tooltip>
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          startIcon={<Edit2 size={15} />}
                          onClick={() => openEditModel(record)}
                          sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            minWidth: "90px",
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<Trash2 size={15} />}
                          onClick={() => handleDelete(record.id, record)}
                          sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            minWidth: "90px",
                            boxShadow: "none",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Footer storedRecords={storedRecords} allRecords={allRecords} />
      </div>

      {/* Edit Modal */}
      <RecordModel
        open={open}
        handleClose={handleClose}
        editData={selectedRecord}
      />
    </>
  );
};

export default RecordTable;
