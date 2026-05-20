import { Plus, Search } from "lucide-react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectSearchTerm, setSearchTerm } from "../store/recordSlice";

type HeaderProps = {
  handleOpen: () => void;
};

const Header = ({ handleOpen }: HeaderProps) => {
  const dispatch = useDispatch();

  const searchTerm = useSelector(selectSearchTerm);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Management System
          </h1>

          <p className="text-gray-500 text-sm">
            Manage employee records efficiently with search, add, edit, and
            delete features.
          </p>
        </div>
      </div>

      {/* Search + Add Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search name, email, or position..."
              className="
                w-full
                pl-10
                pr-4
                py-2.5
                border
                border-gray-300
                rounded-xl
                text-sm
                outline-none
                transition-all
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>

          {/* Add Button */}
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={handleOpen}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              py: 1.2,
              fontSize: "0.95rem",
              fontWeight: 500,
              boxShadow: "none",
            }}
          >
            Add New Record
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
