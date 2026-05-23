import { useState } from "react";
import Header from "./components/Header";
import RecordTable from "./components/RecordTable";
import "./index.css";
import RecordModel from "./components/RecordModel";
import { Toaster } from "react-hot-toast";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
        <Header handleOpen={handleOpen} />
        <Toaster position="top-right" reverseOrder={false} />
        <RecordTable />

        <RecordModel open={open} handleClose={handleClose} />
      </div>
    </>
  );
}

export default App;
