import React, { useState } from "react";

function AdminPage() {
  const [form, setForm] = useState({ customerName: "", amount: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.amount) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/bills/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          amount: Number(form.amount),
        }),
      });

      const data = await res.json();
      setMessage("✅ " + data.message);
      setForm({ customerName: "", amount: "" });
    } catch (err) {
      setMessage("❌ Failed to create bill: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Admin — Create Bill</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Customer Name</label>
        <input
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          placeholder="e.g. John Doe"
        />
        <label>Bill Amount (Rs.)</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="e.g. 1500"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Create Bill & Send Notification"}
        </button>
      </form>
      {message && <p className="status">{message}</p>}
    </div>
  );
}

export default AdminPage;
