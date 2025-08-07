import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [createStatus, setCreateStatus] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("/api/inquiry/all", { withCredentials: true });
      setInquiries(res.data);
    } catch (error) {
      console.error("Error fetching inquiries", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await axios.delete(`/api/inquiry/${id}`, { withCredentials: true });
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleEdit = (id) => {
    alert("Edit functionality coming soon...");
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/register", newAdmin, { withCredentials: true });
      setCreateStatus("✅ Admin created successfully.");
      setNewAdmin({ username: "", password: "" });
    } catch (error) {
      console.error("Error creating admin:", error);
      setCreateStatus("❌ Failed to create admin.");
    }
  };

  const filteredInquiries = inquiries.filter((inq) =>
    inq.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInquiries = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>

      {/* Create Admin Form */}
      <h3>Create New Admin</h3>
      <form onSubmit={handleCreateAdmin} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Username"
          value={newAdmin.username}
          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
          required
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          required
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Admin
        </button>
      </form>
      {createStatus && <p>{createStatus}</p>}

      {/* Inquiry Section */}
      <h3 style={{ marginTop: "40px" }}>Inquiry Submissions</h3>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "250px" }}
      />

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CA Number</th>
            <th>Address</th>
            <th>Bill</th>
            <th>Submitted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentInquiries.length > 0 ? (
            currentInquiries.map((inq, index) => (
              <tr key={inq._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{inq.name}</td>
                <td>{inq.email}</td>
                <td>{inq.phone}</td>
                <td>{inq.caNumber}</td>
                <td>{inq.address}</td>
                <td>
                  {inq.electricityBill ? (
                    <a
                      href={inq.electricityBill}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue" }}
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{new Date(inq.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(inq._id)}
                    style={{
                      marginRight: "8px",
                      color: "white",
                      background: "red",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(inq._id)}
                    style={{
                      background: "blue",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                No inquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={{
                padding: "6px 12px",
                backgroundColor: currentPage === pageNum ? "#007bff" : "#f0f0f0",
                color: currentPage === pageNum ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
