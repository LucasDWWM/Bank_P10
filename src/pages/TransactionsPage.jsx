import React, { useState, useEffect } from "react";

function TransactionsPage() {
  const [accountId, setAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Charger les comptes pour récupérer accountId
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/accounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Erreur API : ${res.status}`);

        const data = await res.json();

        if (data.body && data.body.length > 0) {
          setAccountId(data.body[0].accountId); // Premier compte trouvé
        } else {
          setError("No account found for this user.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load accounts.");
      }
    };

    if (token) fetchAccounts();
  }, [token]);

  // Charger les transactions du compte
  useEffect(() => {
    if (!accountId) return; // pas encore d'ID de compte

    // Charger les transactions
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/accounts/${accountId}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Erreur API : ${res.status}`);

        const data = await res.json();
        setTransactions(data.body || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load transactions.");
      }
    };

    if (token) fetchTransactions();
  }, [accountId, token]);

  // Changement de catégorie
  const handleCategoryChange = (id, newCategory) => {
    setTransactions((prev) =>
      // Met à jour la catégorie de la transaction correspondante
      prev.map((tx) =>
        tx.transactionId === id ? { ...tx, category: newCategory } : tx
      )
    );
  };

  // Changement de note
  const handleNoteChange = (id, newNote) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.transactionId === id ? { ...tx, note: newNote } : tx
      )
    );
  };

  // Sauvegarde d'une transaction
  const handleSave = async (id) => {
    const tx = transactions.find((t) => t.transactionId === id);

    if (!tx.category) {
      setError("Please select a category before saving.");
      setConfirmation(null);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/accounts/${accountId}/transactions/${tx.transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category: tx.category,
            note: tx.note,
          }),
        }
      );

      if (!res.ok) throw new Error(`Erreur API : ${res.status}`);

      setConfirmation("Transaction saved successfully!");
      setError(null);
      setTimeout(() => setConfirmation(null), 3000);
    } catch (err) {
      console.error(err);
      setError("Error saving transaction.");
      setConfirmation(null);
    }
  };

  return (
    <main className="main bg-dark">
      <h1>Transactions</h1>

      {confirmation && <div className="success-message">{confirmation}</div>}
      {error && <div className="error-message">{error}</div>}

      {transactions.map((tx) => (
        <section key={tx.transactionId} className="account">
          <div className="account-content-wrapper">
            <p><strong>Date:</strong> {tx.date}</p>
            <p><strong>Description:</strong> {tx.description}</p>
            <p><strong>Amount:</strong> {tx.amount}</p>
            <p><strong>Balance:</strong> {tx.balance}</p>
            <p><strong>Transaction Type:</strong> {tx.transactionType}</p>

            <div>
              <label><strong>Category:</strong></label>{" "}
              <select
                value={tx.category || ""}
                onChange={(e) =>
                  handleCategoryChange(tx.transactionId, e.target.value)
                }
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
                value={tx.note || ""}
                onChange={(e) =>
                  handleNoteChange(tx.transactionId, e.target.value)
                }
              />
            </div>
            <button
              className="transaction-button"
              onClick={() => handleSave(tx.transactionId)}
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
