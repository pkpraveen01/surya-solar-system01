import { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
      const res = await axios.get("https://surya-solar-system.onrender.com/api/inquiry/all", {
  withCredentials: true,
});

        setInquiries(res.data);
      } catch (err) {
        alert("Unauthorized. Redirecting to login.");
        window.location.href = "/admin/login";
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Inquiries</h2>
      {inquiries.map((item) => (
        <div key={item._id} className="border p-4 mb-2 rounded">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Phone:</strong> {item.phone}</p>
          <p><strong>Address:</strong> {item.address}</p>
          <p><strong>CA Number:</strong> {item.caNumber}</p>
          {item.billUrl && (
            <p>
              <a href={item.billUrl} className="text-blue-500" target="_blank" rel="noreferrer">
                View Bill
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminInquiries;
