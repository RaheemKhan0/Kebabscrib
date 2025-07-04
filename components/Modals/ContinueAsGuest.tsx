import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  onGuestClick: () => void;
}

const ContinueAsGuest = ({ onClose, onGuestClick }: Props) => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };

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
          You're not logged in
        </h2>
        <p className="text-center mb-6 text-gray-700 font-medium">
          Would you like to log in or continue as a guest?
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="w-full bg-KC_Yellow text-KC_GREEN font-semibold py-2 text-lg rounded-lg hover:bg-yellow-500 hover:text-KC_BROWN transition-all duration-200 shadow-md"
          >
            Log In
          </button>

          <button
            onClick={onGuestClick}
            className="w-full bg-KC_Yellow text-KC_GREEN font-bold py-2 text-lg rounded-lg hover:bg-yellow-500 hover:text-KC_BROWN transition-all duration-200 shadow-md"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueAsGuest;
