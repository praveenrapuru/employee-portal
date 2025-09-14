import { useLocation, useNavigate } from "react-router-dom";

function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Employee Details</h2>
        <p className="mb-3">No employee selected.</p>
        <button
          onClick={() => navigate("/list")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Employee List
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Employee Details</h2>
      <p><b>ID:</b> {state?.id}</p>
      <p><b>Name:</b> {state?.name}</p>
      <p><b>City:</b> {state?.city}</p>
      <p><b>Salary:</b> {state?.salary}</p>
      <button onClick={() => navigate("/photo")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Capture Photo</button>
    </div>
  );
}

export default DetailsPage;
