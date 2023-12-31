import "./App.css";
import { useState } from "react";
import { validateEmail } from "./utils";

function PasswordErrorMessage({ message }) {
  return <p style={{ color: "red" }}>{message}</p>;
}

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });

  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    const isFirstNameValid = firstName.trim() !== "";
    const isEmailValid = validateEmail(email) && email.trim() !== "";
    const isPasswordValid = password.value.length >= 8 && password.isTouched;
    const isRoleValid = role === "individual" || role === "business";

    return isFirstNameValid && isEmailValid && isPasswordValid && isRoleValid;
  };
  const isFormValid = getIsFormValid();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (getIsFormValid()) {
      // Form submission logic
      clearForm();
    }
  };

  const clearForm = () => {
    setFirstName("");
    setEmail("");
    setPassword({ value: "", isTouched: false });
    setRole("");
  };
  const handlePasswordChange = (event) => {
    const updatedPassword = {
      value: event.target.value,
      isTouched: true,
    };
    setPassword(updatedPassword);
  };
  const isPasswordValid = password.value.length < 8 && password.isTouched;
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              placeholder="First name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              placeholder="Last name"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              placeholder="Password"
              type="password"
              value={password.value}
              onChange={handlePasswordChange}
            />
            {isPasswordValid && (
              <PasswordErrorMessage message="Password should be at least 8 characters long." />
            )}
          </div>
          <div className="Field">
            <label htmlFor="role">
              Role <sup>*</sup>
            </label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
