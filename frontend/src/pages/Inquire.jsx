import { useState } from 'react';
import axios from 'axios';
import './Inquire.css';

const Inquire = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    caNumber: '',
  });
  const [billFile, setBillFile] = useState(null);
  const [loading, setLoading] = useState(false); // 🚀 Added loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File is too large! Please upload a file less than 5MB.');
      return;
    }
    setBillFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔄 Start loading

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (billFile) {
        formData.append('electricityBill', billFile);
      }

      await axios.post('http://localhost:5000/api/inquiry', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Inquiry submitted successfully!');
      setForm({ name: '', phone: '', email: '', address: '', caNumber: '' });
      setBillFile(null);
    } catch (err) {
      console.error(err);
      alert('Submission failed!');
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="inquire-form">
      <h2 className="inquire-title">Inquire Now</h2>

      <input
        name="name"
        onChange={handleChange}
        value={form.name}
        placeholder="Full Name"
        required
        disabled={loading}
      />
      <input
        name="email"
        onChange={handleChange}
        value={form.email}
        placeholder="Email"
        type="email"
        required
        disabled={loading}
      />
      <input
        name="phone"
        onChange={handleChange}
        value={form.phone}
        placeholder="Phone"
        required
        disabled={loading}
      />
      <input
        name="address"
        onChange={handleChange}
        value={form.address}
        placeholder="Address"
        required
        disabled={loading}
      />
      <input
        name="caNumber"
        onChange={handleChange}
        value={form.caNumber}
        placeholder="CA Number"
        required
        disabled={loading}
      />

      <label className="upload-label">
        Upload Electricity Bill (Optional):
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          disabled={loading}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
};

export default Inquire;
