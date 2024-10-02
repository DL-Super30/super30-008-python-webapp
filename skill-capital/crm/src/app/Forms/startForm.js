'use client';
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Password, Tune } from "@mui/icons-material";

export default function StartForm({ closeForm }) {

  const [isButtonDisabled, SetIsButtonDisabled] = useState(true);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e) => {

    const { name, value } = e.target;
    setUsername(e.target.value);
    if (name === 'username') {
      setUsername(value);
      validateInput(); // Call username validation when username field is changed
    }

    if (name === 'password') {
      setPassword(value);
      validatePassword(); // Call password validation when password field is changed
    }
    setPassword(e.target.value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };



  // handle data
  const handleData = async (e) => {
    validateInput();
    validatePassword();
    e.preventDefault();

    try {
      const apiUrl=process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/signUp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(formData),
        }
      );


      if (response.ok) {
        alert('Form data successfully submitted');
        setFormData({
          user: '',
          Password: '',
        });
        closeForm(); // Close the form
      } else {
        alert('Failed to submit data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('An error occurred while submitting the data.');
    }
  };

  // validations :

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [usernameBorderColor, setUsernameBorderColor] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState("");

  const validateInput = () => {
    if (!username) {
      setUsernameWarning("Username is required");
      setUsernameBorderColor("red");
      SetIsButtonDisabled(false);
    }

    else if (username.length <= 5) {
      setUsernameWarning("Username invalid length");
      setUsernameBorderColor("Orange");
      SetIsButtonDisabled(false);

    }
    else {
      setUsernameWarning("username is fine");
      setUsernameBorderColor("green");
      SetIsButtonDisabled(true);
    }
  };

  const validatePassword = () => {

    if (!password) {
      setPasswordWarning("Password is required");
      setPasswordBorderColor("red");
      SetIsButtonDisabled(false);
    }

    else if (password.length <= 5) {
      setPasswordBorderColor("orange");
      setPasswordWarning("Password too short mainatin atleast greater than 5 characters");
      SetIsButtonDisabled(false);
    }

    else {
      setPasswordWarning(" Password  is fine");
      setPasswordBorderColor("green");
      SetIsButtonDisabled(true);
    }
  };


  return (

    <form onSubmit={handleData} >
      <div className="  flex flex-col gap-4 bg-rose-200  w-[400px] max-w-5xl max-h-[90vh] p-8 rounded-lg shadow-lg mx-auto mt-5">

        <div className="flex flex-row items-center justify-between text-center not-italic font-bold">
          <h2>Sign Up Here</h2>
          <div>
            <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3  items-center justify-center not italic">
          <div className="flex flex-col not italic font-bold capitalize">
            <label >Username</label>
            <input
              type="text"
              className="w-[300px] rounded border-1 text-center p-1"
              placeholder="email"
              name="username"
              value={formData.user}
              onChange={handleChange}
              required
              style={{ borderColor: usernameBorderColor }}
            />
            <span id="span" className="text-xs" style={{ color: usernameBorderColor }}>
              {usernameWarning}
            </span>
          </div>
          <div className="flex flex-col not italic font-bold capitalize">
            <label >password</label>
            <input
              type="password"
              className="w-[300px] rounded border-1 text-center p-1"
              placeholder="password"
              name="password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
            <span id="span-1" className="text-xs" style={{ color: passwordBorderColor }}>
              {passwordWarning}
            </span>
          </div>
          <button
            type="submit"
            // disabled={isButtonDisabled }
            className="w-[140px] h-[40px] bg-green-200 rounded-lg" value="signUp">Sign Up</button>
        </div>
      </div>
    </form>
  );
}
