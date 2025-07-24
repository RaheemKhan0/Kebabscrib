interface Props {
  onClose: () => void;
  onSkip: () => void;
  onVerify: () => void;
  loading: boolean;
}

const VerifyModal = ({ onClose, onSkip, onVerify, loading }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-EggShell rounded-xl p-6 shadow-2xl w-full max-w-md transition-colors duration-200 relative border-2 border-KC_GREEN">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-KC_GREEN text-3xl font-bold hover:text-red-500 transition-colors"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-3 text-center text-KC_GREEN">
          You're not verified
        </h2>
        <p className="text-center mb-6 text-gray-700 font-medium">
          Please verify your email before continuing.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onVerify}
            disabled={loading}
            className={`w-full bg-KC_Yellow text-KC_GREEN font-semibold py-2 text-lg rounded-lg shadow-md transition-all duration-200 ${loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-500 hover:text-KC_BROWN"
              }`}
          >
            {loading ? "Sending..." : "Verify"}
          </button>

          <button
            onClick={onSkip}
            className="w-full bg-KC_Yellow text-KC_GREEN font-bold py-2 text-lg rounded-lg hover:bg-yellow-500 hover:text-KC_BROWN transition-all duration-200 shadow-md"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
