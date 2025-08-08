import React, { useState, useEffect } from "react";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Ici tu feras l'appel à l'API plus tard
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
            <p><strong>Category:</strong> {tx.category}</p>
            <p><strong>Note:</strong> {tx.note}</p>
          </div>
        </section>
      ))}
    </main>
  );
}

export default TransactionsPage;
