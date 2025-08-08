import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../redux/actions/authActions";
import { logout } from "../redux/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.userName || "");

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    await dispatch(updateUsername(newUsername));
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src="./argentBankLogo.png" alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {user?.userName}
          </Link>
          <button className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-user-circle"></i>
            Sign Out
          </button>
        </div>
      </nav>

      <main className="main bg-dark">
        <div className="header">
          {editMode ? (
            <>
              <h1>Edit user info</h1>
              <form className="edit-user-form">
                <div className="input-wrapper">
                  <label>User name:</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <label>First name:</label>
                  <input type="text" value={user?.firstName} disabled />
                </div>
                <div className="input-wrapper">
                  <label>Last name:</label>
                  <input type="text" value={user?.lastName} disabled />
                </div>
                <div className="button-wrapper">
                  <button className="edit-button" type="button" onClick={handleSave}>
                    Save
                  </button>
                  <button className="edit-button cancel-button" type="button" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
            ) : (
            <>
              <h1>
                Welcome back<br />{user?.firstName} {user?.lastName}!
              </h1>
              <button className="edit-button" onClick={handleEdit}>Edit Name</button>
            </>
          )}
        </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button" onClick={() => navigate("/transactions")}>
                View transactions
              </button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button" onClick={() => navigate("/transactions")}>
                View transactions
              </button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button" onClick={() => navigate("/transactions")}>
                View transactions
              </button>
            </div>
          </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default ProfilePage;
