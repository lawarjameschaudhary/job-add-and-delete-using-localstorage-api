import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    description: "",
    start: "",
    end: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl p-6">
        {/* Left Image */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://img.freepik.com/free-vector/man-works-home-with-laptop-prevent-virus-infection_1150-34980.jpg?t=st=1739254692~exp=1739258292~hmac=1c8c040f14935d0fd41a0e59f5423cd0a1c0ea0b0fb4e45c0ff83d8a36f94111&w=1800"
            alt="developer working"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 ml-0 md:ml-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Add New Job</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Job ID</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Job Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Start Date</label>
              <input
                type="date"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">End Date</label>
              <input
                type="date"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg h-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pending...">Pending</option>
                <option value="Completed !!">Completed</option>
                <option value="in progress">In Progress</option>
                <option value="on going">On going</option>
                <option value="in review">In Review</option>
                <option value="Rejected !">Rejected</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-5"
            >
              Add Job
            </button>
          </form>
        </div>
      </div>

      <div className="mt-5 text-center">
        <NavLink
          to="/"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default Add;
