import { useState } from "react";
import toast from "react-hot-toast";

interface props {
  onClose : () => void,
  onSubmit : (name : string, email : string) => void
}

const GuestDetails = ({ onClose, onSubmit } : props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    // Optionally validate email pattern here
    onSubmit( name, email );
    onClose(); // close modal
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-KC_GREEN rounded-lg p-6 shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-2xl font-bold hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-white">
          Enter Guest Details
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />

          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-KC_PEACH text-white font-semibold py-2 rounded hover:bg-yellow-800 transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;
