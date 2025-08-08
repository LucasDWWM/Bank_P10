import React, { useState, useEffect } from "react";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Ici tu pourras mettre un appel API plus tard
    const dummyData = [
      {
        id: 1,
        date: "27/02/20",
        description: "Golden Sun Bakery",
        amount: "$8.00",
        balance: "$298.00",
        transactionType: "Electronic",
        category: "Food",
        note: ""
      },
      {
        id: 2,
        date: "28/02/20",
        description: "Supermarket",
        amount: "$20.00",
        balance: "$278.00",
        transactionType: "Electronic",
        category: "Groceries",
        note: ""
      }
    ];
    setTransactions(dummyData);
  }, []);

  // Gestion de l'édition
  const handleCategoryChange = (id, newCategory) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, category: newCategory } : tx
      )
    );
  };

  const handleNoteChange = (id, newNote) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, note: newNote } : tx
      )
    );
  };

  const handleSave = (id) => {
    // Ici tu peux appeler l'API plus tard si besoin
    console.log("Saved transaction", transactions.find((tx) => tx.id === id));
    alert("Changes saved!");
  };

  return (
    <main className="main bg-dark">
      <h1>Transactions</h1>
      {transactions.map((tx) => (
        <section key={tx.id} className="account">
          <div className="account-content-wrapper">
            <p><strong>Date:</strong> {tx.date}</p>
            <p><strong>Description:</strong> {tx.description}</p>
            <p><strong>Amount:</strong> {tx.amount}</p>
            <p><strong>Balance:</strong> {tx.balance}</p>
            <p><strong>Transaction Type:</strong> {tx.transactionType}</p>
            <div>
              <label><strong>Category:</strong></label>{" "}
              <select
                value={tx.category}
                onChange={(e) => handleCategoryChange(tx.id, e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <div>
              <label><strong>Note:</strong></label>{" "}
              <input
                type="text"
                value={tx.note}
                onChange={(e) => handleNoteChange(tx.id, e.target.value)}
              />
            </div>
            <button
              className="transaction-button"
              onClick={() => handleSave(tx.id)}
            >
              Save
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default TransactionsPage;
