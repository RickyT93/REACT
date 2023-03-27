import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import * as userServices from "../../services/userServices";
import toastr from "toastr";
// import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
const _logger = debug.extend("LogIn");

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

const divStyle = {
  color: "white",
};

function LogIn() {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tenantId: "U04DK1F8PB2",
  });

  // const onFormFieldChange = (event) => {
  //   console.log("onChange", { syntheticEvent: event });

  //   //capture info you need from event here as the event object will fall out of scope quickly

  //   //the event.target will represent the input
  //   const target = event.target;

  //   //this is the value of the input, the value in the text box the user types into
  //   const newUserValue = target.value;
  //   console.log(newUserValue);

  //   //this is the name (so be sure to give your form fields a name attribute)
  //   const nameOfField = target.name;

  //   //set the new state using the old property name / object key and using the new value (updatedFormData)
  //   setFormData((prevState) => {
  //     console.log("updater onChange");

  //     // copy the personData object from state using the spread operator
  //     const newUserObject = {
  //       ...prevState,
  //     };

  //     //change the value of the copied object using the name and using bracket notation
  //     newUserObject[nameOfField] = newUserValue;

  //     return newUserObject;
  //   });
  //   console.log("end onChange");
  // };

  // const onClickSubmit = (e) => {
  //   e.preventDefault();

  //   userServices
  //     .logIn(formData)
  //     .then(onUserLogInSuccess)
  //     .catch(onUserLogInError);
  // };

  const onUserLogInSuccess = (response) => {
    toastr.success("Success! User Logged In");
    // console.log(response);
    // navigate("/home");
    currentUser();
    _logger("Login Success", response);
  };

  const onUserLogInError = (error) => {
    toastr.error("Error! User Not Logged In");
    console.warn(error, "onUserAddError");
  };

  const currentUser = () => {
    userServices.getCurrentUser().then(onGetUserSuccess).catch(onGetUserError);
  };

  const onGetUserSuccess = (response) => {
    toastr.success("Success! Current User Signed In!");
    // console.log(response.data.item.id);

    const targetId = response.data.item.id;
    // console.log(targetId);
    _logger(targetId);
    getUserById(targetId);

    setFormData((prevState) => {
      _logger("updater onChange");

      //copy the personData object from state using the spread operator
      let newFriendObject = { ...prevState };

      newFriendObject.id = response.data.item.id;

      _logger(newFriendObject);

      // newFriendObject[nameOfField] = newFriendValue;
      return newFriendObject;
    });
  };

  const onGetUserError = (error) => {
    toastr.error("Error! User Not Logged In");
    console.warn(error, "onUserAddError");
  };

  const getUserById = (id) => {
    console.log(id);
    userServices
      .currentUserById(id)
      .then(onGetUserByIdSuccess)
      .catch(onGetUserByIdError);
  };

  const onGetUserByIdSuccess = (response) => {
    toastr.success("Success! User Logged In");
    // console.log(response);
    _logger(response);
  };

  const onGetUserByIdError = (error) => {
    console.warn(error, "onGetUserByIdError");
  };

  const handleSubmit = (values) => {
    userServices.logIn(values).then(onUserLogInSuccess).catch(onUserLogInError);

    _logger(values);
    var message = `Just Submitted the form with these values and will be clearing form.
    ${JSON.stringify(values, null, 2)} `;
    _logger(message);

    setFormData((prevState) => {
      const newUserObject = { ...prevState };
      newUserObject.email = "";
      newUserObject.password = "";
      return newUserObject;
    });
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .min(2)
            .required("Is Required"),
          password: Yup.string().required("Required"),
        })}
        initialValues={formData}
        onSubmit={handleSubmit}
      >
        <section className="vh-100" style={sectionStyle}>
          <div className="container">
            <div className="container mt-5 fs-2">
              <div className="row">
                <div className="col-md-5">
                  <Form>
                    <div className="mb-3 form-group" style={divStyle}>
                      <label htmlFor="lastName" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        className="form-control  form-control-lg"
                        id="email"
                        name="email"
                        placeholder="Please Enter Your Email"
                        // value={formData.email}
                        // onChange={onFormFieldChange}
                      />
                    </div>

                    <div className="mb-3" style={divStyle}>
                      <label htmlFor="firstName" className="form-label">
                        Password
                      </label>
                      <Field
                        type="password"
                        className="form-control  form-control-lg"
                        id="password"
                        name="password"
                        placeholder="Please Enter Your Passwword"
                        // value={formData.password}
                        // onChange={onFormFieldChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      // onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Formik>
    </React.Fragment>
  );
}

export default LogIn;
