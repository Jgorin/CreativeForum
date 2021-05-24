import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    file: {},
    fileName: ""
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, username } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if(username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required"
      }
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    validateInput(userPayload);
    if (Object.keys(errors).length === 0) {
      let info = new FormData()
      for(const [key, value] of Object.entries(userPayload)){
        info.append(key, value)
      }
      fetch("/api/v1/users", {
        method: "post",
        body: info
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            setShouldRedirect(true);
          });
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      });
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const onFileChange = async(event) => {
    const file = event.currentTarget.files[0]
    const fileName = file.name
    setUserPayload({
      ...userPayload,
      ["file"]: file,
      ["fileName"]: fileName
    })
  }

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1>Register</h1>
      <form>
        <div>
          <label>
            Username
            <input type="text" name="username" value={userPayload.username} onChange={onInputChange} />
          </label>
        </div>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <label>
            <input
              type="file"
              name="file"
              onChange={onFileChange}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
