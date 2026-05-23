import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { EmployeeRecord } from "../types/employee";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecord,
  selectAllRecords,
  updateRecord,
} from "../store/recordSlice";
import toast from "react-hot-toast";

type RecordModelProps = {
  open: boolean;
  handleClose: () => void;
  editData?: EmployeeRecord | null;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  position: string;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: 500,
  },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const RecordModel = ({ open, handleClose, editData }: RecordModelProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        position: editData.position,
      });
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        position: "",
      });
    }

    setTimeout(() => {
      setFocus("name");
    }, 100);
  }, [editData, reset]);

  console.log("editData", editData);

  const dispatch = useDispatch();
  const allRecords = useSelector(selectAllRecords);

 const onSubmit: SubmitHandler<FormValues> = (data) => {
  // EDIT
  if (editData) {
    dispatch(
      updateRecord({
        id: editData.id,
        ...data,
      }),
    );

    toast.success("Record updated successfully");
  }

  // ADD
  else {
    const newId =
      allRecords.length > 0
        ? Math.max(...allRecords.map((r: EmployeeRecord) => r.id)) + 1
        : 1;

    dispatch(
      addRecord({
        id: newId,
        ...data,
      }),
    );

    toast.success("Record added successfully");
  }

  reset();

  handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
      <Box sx={style}>
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {editData ? "Edit Record" : "Register New Record"}
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          {/* Name */}
          <TextField
            label="Name *"
            // autoFocus
            fullWidth
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message || " "}
            slotProps={{
              formHelperText: {
                sx: {
                  ml: 0,
                },
              },
            }}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must not exceed 30 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name should contain only letters",
              },
            })}
          />

          {/* Email */}
          <TextField
            label="Email *"
            fullWidth
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message || " "}
            slotProps={{
              formHelperText: {
                sx: {
                  ml: 0,
                },
              },
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />

          {/* Phone */}
          <TextField
            label="Phone *"
            fullWidth
            size="small"
            error={!!errors.phone}
            helperText={errors.phone?.message || " "}
            slotProps={{
              formHelperText: {
                sx: {
                  ml: 0,
                },
              },
            }}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            })}
          />

          {/* Position */}
          <TextField
            label="Position *"
            fullWidth
            size="small"
            error={!!errors.position}
            helperText={errors.position?.message || " "}
            slotProps={{
              formHelperText: {
                sx: {
                  ml: 0,
                },
              },
            }}
            {...register("position", {
              required: "Position is required",
              minLength: {
                value: 2,
                message: "Position must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Position must not exceed 50 characters",
              },
            })}
          />

          {/* Footer Buttons */}
          <div className="-mx-8 border-t border-gray-200 px-4 pt-4 mt-1">
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  boxShadow: "none",
                }}
              >
                {editData ? "Update" : "Register"}
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default RecordModel;
