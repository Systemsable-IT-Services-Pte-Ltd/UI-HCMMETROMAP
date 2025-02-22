import { useNavigate } from "react-router-dom";

const ErrorLayout = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-4">
        Sorry, an unexpected error has occurred.
      </p>
      <button
        onClick={handleGoHome}
        className="text-purple-500 hover:underline"
      >
        Go back to Home
      </button>
    </div>
  );
};

export default ErrorLayout;
