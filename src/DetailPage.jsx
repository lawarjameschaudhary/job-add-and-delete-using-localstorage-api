import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const DetailPage = () => {
  const { description } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/details");
      const result = await response.json();
      const filteredData = result.find((item) => item.description === description);
      setData(filteredData || null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Job Details</h2>

      {data ? (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">{data.description}</h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Start Date:</span> {data.start}
            </p>
            <p>
              <span className="font-medium text-gray-900">End Date:</span> {data.end}
            </p>
            <p className={`px-3 py-1 rounded-lg text-white inline-block ${
              data.status.toLowerCase() === "completed !!"
                ? "bg-green-500"
                : data.status.toLowerCase() === "in progress"
                ? "bg-blue-500"
                : data.status.toLowerCase() === "rejected !"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}>
              {data.status}
            </p>
          </div>

          <div className="mt-6">
            <NavLink to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition transform duration-300 hover:bg-blue-700 hover:scale-105">
              Back to Jobs
            </NavLink>
          </div>
        </div>
      ) : (
        <p className="text-lg text-center text-red-600">No data found for this description.</p>
      )}
    </div>
  );
};

export default DetailPage;
