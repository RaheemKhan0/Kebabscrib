interface Props {
  onClose: () => void;
  onSkip: () => void;
  onVerify: () => void;
  loading: boolean;
}

const VerifyModal = ({ onClose, onSkip, onVerify, loading }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-KC_GREEN rounded-lg p-6 shadow-lg w-full max-w-md transition-colors duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-KC_BROWN text-3xl font-bold hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 mt-3 text-center text-white">
          You're not verified
        </h2>
        <p className="text-center mb-6 text-white">Verify Email</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onVerify}
            disabled={loading}
            className={`w-full bg-KC_PEACH text-white py-2 text-lg font-semibold rounded transition-colors duration-200 
    ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-800"}`}
          >
            {loading ? "Sending..." : "Verify"}
          </button>

          <button
            onClick={onSkip}
            className="w-full bg-KC_BROWN text-white py-2 text-lg font-bold rounded hover:bg-yellow-800 transition-colors duration-200"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
