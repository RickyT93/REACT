import React, { useState, useEffect } from "react";
import toastr from "toastr";
import * as friendServices from "../../services/friendServices";
import { useParams } from "react-router-dom";

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
const label = {
  display: "block",
  marginBottom: "20px",
};
const input = {
  display: "block",
};

function AddFriend() {
  console.log("AddFriend");

  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    imageTypeId: 0,
    imageUrl: "",
    userId: "0",
    skills: [""],
  });
  console.log(formData);

  // const [myFriend] = useState(formData)

  const onFormFieldChange = (event) => {
    console.log(onFormFieldChange, "onFormFieldChange");
    console.log("onChange", { syntheticEvent: event });

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;

    //this is the value of the input, the value in the text box the user types into
    const newFriendValue = target.value;
    console.log(newFriendValue);

    //this is the name (so be sure to give your form fields a name attribute)
    const nameOfField = target.name;

    //set the new state using the old property name / object key and using the new value (updatedFormData)
    setFormData((prevState) => {
      console.log("updater onChange");

      // copy the personData object from state using the spread operator
      const newFriendObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newFriendObject[nameOfField] = newFriendValue;

      return newFriendObject;
    });
    console.log("end onChange");
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    // if (!Array.isArray(jobPostingCardData.skills) && jobPostingCardData.skills) {
    //   jobPostingCardData.skills = jobPostingCardData.skills.split(",");
    // }

    if (!Array.isArray(formData.skills) && formData.skills) {
      formData.skills = formData.skills.split(",");
    }

    if (formData.id > 0) {
      friendServices
        .update(formData.id, formData)
        .then(onFriendUpdateSuccess)
        .catch(onFriendUpdateError);
    } else {
      friendServices
        .addFriend(formData)
        .then(onFriendAddSuccess)
        .catch(onFriendAddError);
    }
  };

  const onFriendAddSuccess = (response) => {
    toastr.success("Success! User Registered");
    console.log(response);
  };
  const onFriendAddError = (error) => {
    toastr.error("Error! User Not Registered");
    console.warn(error, "onUserAddError");
  };

  const onFriendUpdateSuccess = (response) => {
    toastr.success("Success! Friend Updated");
    console.log(response);
  };
  const onFriendUpdateError = (error) => {
    toastr.error("Error! Friend Not Updated");
    console.warn(error, "onFriendUpdateError");
  };

  const { friendId } = useParams();
  console.log("Params", friendId);

  useEffect(() => {
    console.log("firing useEffect for get Friends");

    if (friendId) {
      friendServices
        .getById(friendId)
        .then(onFriendGetByIdSuccess)
        .catch(onFriendGetByIdError);
    }
  }, []);

  const onFriendGetByIdSuccess = (response) => {
    toastr.success("Success! Friend Found");
    console.log(response);

    setFormData((prevState) => {
      console.log("updater onChange");

      //     //copy the personData object from state using the spread operator
      let newFriendObject = { ...prevState };

      newFriendObject.title = response.title;
      newFriendObject.bio = response.bio;
      newFriendObject.summary = response.summary;
      newFriendObject.headline = response.headline;
      newFriendObject.slug = response.slug;
      newFriendObject.imageUrl = response.primaryImage.url;
      newFriendObject.imageTypeId = response.primaryImage.typeId;
      newFriendObject.statusId = response.statusId;
      newFriendObject.id = response.id;
      newFriendObject.userId = response.userId;
      // newFriendObject.skills = response.skills.map(mapSkills);
      if (response.skills) {
        newFriendObject.skills = response.skills.map(mapSkills);
      }

      function mapSkills(skill) {
        let skillObj = {};
        skillObj = skill.name;
        console.log(skillObj);
        return skillObj;
      }

      // newFriendObject.skills = response.skills[0].name.toString(",");

      console.log(newFriendObject);

      // newFriendObject[nameOfField] = newFriendValue;
      return newFriendObject;
    });
    //change the value of the copied object using the name and using bracket notation
  };

  const onFriendGetByIdError = (error) => {
    toastr.error("Error! Friend Not Found");
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
                              style={input}
                              type="text"
                              id="title"
                              name="title"
                              className="title"
                              value={formData.title}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              style={input}
                              type="text"
                              id="bio"
                              name="bio"
                              className="bio"
                              value={formData.bio}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              Bio
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              style={input}
                              type="text"
                              id="summary"
                              name="summary"
                              className="summary"
                              value={formData.summary}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              Summary
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              style={input}
                              type="text"
                              id="headline"
                              name="headline"
                              className="headline"
                              value={formData.headline}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              Headline
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              style={input}
                              type="text"
                              id="slug"
                              name="slug"
                              className="slug"
                              value={formData.slug}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              Slug
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              style={input}
                              type="text"
                              id="statusId"
                              name="statusId"
                              className="statusId"
                              value={formData.statusId}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              StatusId
                            </label>
                          </div>
                        </div>
                        <select
                          id="imageTypeId"
                          name="imageTypeId"
                          className="form-select d-flex flex-row align-items-center mb-4"
                          aria-label="Default select example"
                          value={formData.imageTypeId}
                          onChange={onFormFieldChange}
                        >
                          <option value="">Select Choose Image Type</option>
                          <option id="imageTypeId" name="imageTypeId" value="1">
                            SEO
                          </option>
                          <option
                            id="imageTypeId2"
                            name="imageTypeId"
                            value="2"
                          >
                            Cover
                          </option>
                          <option
                            id="imageTypeId3"
                            name="imageTypeId"
                            value="3"
                          >
                            Main
                          </option>
                          <option
                            id="imageTypeId4"
                            name="imageTypeId"
                            value="4"
                          >
                            Other
                          </option>
                          <option
                            id="imageTypeId5"
                            name="imageTypeId"
                            value="5"
                          >
                            Logo
                          </option>
                        </select>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="imageUrl"
                            name="imageUrl"
                            className="form-control"
                            id="imageUrl"
                            onChange={onFormFieldChange}
                            value={formData.imageUrl}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            URL
                          </label>
                        </div>
                        {/* <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              style={input}
                              type="url"
                              attribute="ImageUrl"
                              name="ImageUrl"
                              className="form-control"
                              id="ImageUrl"
                              value={formData.ImageUrl}
                              onChange={onFormFieldChange}
                            />
                            <label style={label} className="form-label">
                              Avatar URL
                            </label>
                          </div>
                        </div> */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="userId"
                              className="userId"
                              id="userId"
                              value={formData.userId}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">userId</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="skills"
                              className="skills"
                              id="skills"
                              value={formData.skills}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Skills</label>
                          </div>
                        </div>
                        <div
                          className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                          id="friendSubmit"
                        >
                          <button
                            type="button"
                            id="submit"
                            className="btn btn-primary btn-lg"
                            onClick={onClickSubmit}
                          >
                            Submit
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

export default AddFriend;
