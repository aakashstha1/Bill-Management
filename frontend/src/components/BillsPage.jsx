import React, { useEffect, useState } from "react";

function BillsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/bills")
      .then((r) => r.json())
      .then((data) => setBills(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>All Bills</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bills.length === 0 ? (
        <p>No bills yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.customerName}</td>
                <td>Rs. {bill.amount}</td>
                <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BillsPage;
