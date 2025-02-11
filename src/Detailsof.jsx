import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Detailsof = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/details");
      const result = await response.json();
      setData(result);  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await fetch(`http://localhost:3000/details/${id}`, {
        method: "DELETE",
      });
      setDeleteStatus("Data successfully deleted.");
      fetchData(); 
    } catch (error) {
      setDeleteStatus("Error deleting data.");
      console.error("Error deleting data", error);
    }
  };

  const setStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending...":
        return "text-gray-500 font-extrabold  ";
      case "completed !!":
        return "text-green-500 font-bold";
      case "on going":
        return "text-blue-500 font-bold";
      case "in review":
        return "text-yellow-500 font-bold";
      case "in progress":
        return "text-blue-500 font-bold";
      case "rejected !":
        return "text-red-600 font-bold";
      default:
        return "text-black";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Job Details</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
        </div>
      ) : (
        <>
          {deleteStatus && (
            <div
              className={`mb-4 p-4 rounded-lg text-center ${
                deleteStatus.includes("Error") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {deleteStatus}
            </div>
          )}  

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Job Description</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className=" border border-gray-300 hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2"><NavLink to={`/details/${encodeURIComponent(item.description)}`} className="hover:text-blue-700">
                      {item.description}
                    </NavLink></td>
                  <td className="border border-gray-300 px-4 py-2">{item.start}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.end}</td>
                  <td className={`border border-gray-300 px-4 py-2 ${setStatusColor(item.status)}`}>
                    {item.status}
                  </td>
                  <td className="py-2 flex gap-5 justify-center">
                    <NavLink to={`/edit/${item.id}`} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                      Edit
                    </NavLink>
                    <button
                      onClick={() => deleteHandler(item.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="mt-10 text-center">
        <NavLink to="/add" className="px-10 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
          Add Job
        </NavLink>
      </div>
    </div>
  );
};

export default Detailsof;
