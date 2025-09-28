import React, { useState } from 'react';

function App() {
  const [role, setRole] = useState('buyer');
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registered as ${role} with wallet ${wallet}`);
    // You would send this to your backend to store
  };

  const handlePay = () => {
    // Payment data
    const paymentData = {
      amount: 0.01,
      memo: "Payment for goods",
      metadata: { role, name }
    };

    const onReadyForServerApproval = (paymentId) => {
      console.log("onReadyForServerApproval", paymentId);
      fetch('/payments/approve', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({paymentId})
      });
    };

    const onReadyForServerCompletion = (paymentId, txid) => {
      console.log("onReadyForServerCompletion", paymentId, txid);
      fetch('/payments/complete', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({paymentId, txid})
      });
    };

    const onCancel = (paymentId) => {
      console.log("onCancel", paymentId);
    };

    const onError = (error, payment) => {
      console.error("onError", error, payment);
    };

    Pi.createPayment(paymentData, {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    }).then(payment => {
      console.log(payment);
    }).catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Africa-China Trading Platform</h1>
      <form onSubmit={handleRegister}>
        <label>
          Role:
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="warehouse">Warehouse Owner</option>
          </select>
        </label>
        <label>
          Name:
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Pi Wallet Address:
          <input value={wallet} onChange={e => setWallet(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
      <button onClick={handlePay}>Pay 0.01 Pi</button>
    </div>
  );
}

export default App;
