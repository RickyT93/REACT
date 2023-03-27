import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userServices from "../../services/userServices";
import toastr from "toastr";
import debug from "sabio-debug";
const _logger = debug.extend("Register");
const sectionStyle = {
  backgroundImage:
    "url(https://timetoact-group.com/thumbnail_direct/20379?w=4000&h=1116&solid)",
  height: "100vh",
  backgroundSize: "cover",
  display: "block",
  justifyContent: "center",
  alignitems: "center",
  backgroundattachment: "fixed",
};
const Card = {
  borderRadius: "50px",
  width: "800px",
  top: "-150px",
  backgroundColor: "grey",
  color: "white",
};
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U04DK1F8PB2",
  });

  const onFormFieldChange = (event) => {
    _logger("onChange", { syntheticEvent: event });

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;

    //this is the value of the input, the value in the text box the user types into
    const newUserValue = target.value;
    _logger(newUserValue);

    //this is the name (so be sure to give your form fields a name attribute)
    const nameOfField = target.name;

    //set the new state using the old property name / object key and using the new value (updatedFormData)
    setFormData((prevState) => {
      _logger("updater onChange");

      // copy the personData object from state using the spread operator
      const newUserObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
    _logger("end onChange");
  };

  const onClickSubmit = (e) => {
    e.preventDefault();

    userServices
      .register(formData)
      .then(onUserAddSuccess)
      .catch(onUserAddError);
  };

  const onUserAddSuccess = (response) => {
    _logger(
      "Something important somewhere in a function within your component",
      response
    );

    toastr.success("Success! User Registered");

    navigate("/login");
  };
  //     const userDataFromRegister = (props) => {
  //     let currentUser = { ...props}
  //     currentUser = {
  //       firstName: " ",
  //       avatarUrl: " ",
  //     }
  //     return currentUser
  //    }

  const onUserAddError = (error) => {
    toastr.error("Error! User Not Registered");
    console.warn(error, "onUserAddError");
  };

  return (
    <React.Fragment>
      <section className="vh-100" style={sectionStyle}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={Card}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up{" "}
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="firstName"
                              value={formData.firstName}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">First Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className="lastName"
                              value={formData.lastName}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Last Name </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="email"
                              value={formData.email}
                              onChange={onFormFieldChange}
                            />
                            <label className="email">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="password"
                              value={formData.password}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="passwordConfirm"
                              name="passwordConfirm"
                              className="passwordConfirm"
                              value={formData.passwordConfirm}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="url"
                              attribute="image"
                              name="avatarUrl"
                              className="form-control"
                              id="avatar"
                              value={formData.avatarUrl}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Avatar URL</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 d-none">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="number"
                              id="tenantId"
                              name="tenantId"
                              className="tenantId"
                              value={formData.tenantId}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Tenant Id</label>
                          </div>
                        </div>

                        <div
                          className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                          id="register"
                        >
                          <button
                            type="button"
                            id="registerUser"
                            className="btn btn-primary btn-lg"
                            onClick={onClickSubmit}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Register;
