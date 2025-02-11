import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    start: "",
    end: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/details/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/details/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-border animate-spin"></div>
    </div>
  );
  
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Edit Job</h2>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl p-8">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://img.freepik.com/free-vector/graphic-designer-isometric_98292-7041.jpg?t=st=1739255656~exp=1739259256~hmac=798de39dcb17caa8192ae8f52e9491c8e39b5b89c4ea9bafb5434ac66e3f8f8d&w=1800"
            alt="developer working"
            className="w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 md:ml-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="form-group">
              <label htmlFor="id" className="block text-gray-700">Job ID</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                readOnly
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="block text-gray-700">Job Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="start" className="block text-gray-700">Start Date</label>
              <input
                type="date"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end" className="block text-gray-700">End Date</label>
              <input
                type="date"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="block text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-10"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="On Going">On Going</option>
                <option value="In Review">In Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
