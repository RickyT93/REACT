import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as jobServices from "../../services/jobServices";
import * as techCoServices from "../../services/techCoServices";
import toastr from "toastr";

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
function JobForm() {
  //********************************
  //* STATE FOR GET ALL AXIO REQUEST
  //********************************

  const [pageData, setPageData] = useState({
    arrayOfJobs: [],
    jobComponents: [],
  });

  const [techCoData, setTechData] = useState([]);

  console.log(techCoData);

  console.log(pageData);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: 0,
    slug: "",
    statusId: 0,
    techCompanyId: "",
    skills: [""],
  });

  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;

    //this is the value of the input, the value in the text box the user types into
    const newUserValue = target.value;
    console.log(newUserValue);

    //this is the name (so be sure to give your form fields a name attribute)
    const nameOfField = target.name;

    //set the new state using the old property name / object key and using the new value (updatedFormData)
    setFormData((prevState) => {
      console.log("updater onChange");

      // copy the personData object from state using the spread operator
      const newUserObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
    console.log("end onChange");
  };

  const onClickSubmit = (e) => {
    e.preventDefault();

    if (formData.id > 0) {
      if (!Array.isArray(formData.skills) && formData.skills) {
        formData.skills = formData.skills.split(",");
        jobServices
          .update(formData.id, formData)
          .then(onJobUpdateSuccess)
          .catch(onJobUpdateError);
      }
    } else {
      if (!Array.isArray(formData.skills) && formData.skills) {
        formData.skills = formData.skills.split(",");
      }
      jobServices.addJob(formData).then(onJobAddSuccess).catch(onJobAddError);
    }
  };
  //********************************
  //***     ADD JOB SUCC HANDLER ***
  //********************************
  const onJobAddSuccess = (response) => {
    toastr.success("Success! User Registered");
    console.log("onJobAddSuccess", response);
  };
  //********************************
  //***  ADD JOB SUCC ERROR ******
  //********************************
  const onJobAddError = (error) => {
    toastr.error("Error! User Not Registered");
    console.warn(error, "onUserAddError");
  };

  //********************************
  //***   UPDATE JOB SUCC HANDLER **
  //********************************
  const onJobUpdateSuccess = (response) => {
    toastr.success("Success! Job Not Updated");
    console.log("onJobUpdateSuccess", response);
  };
  //********************************
  //***  UPDATE JOB SUCC ERROR *****
  //********************************
  const onJobUpdateError = (error) => {
    toastr.error("Error! Job Not Updated");
    console.warn(error, "onJobUpdateError");
  };

  //********************************
  //*********  USE EFFECT   ********
  //********************************
  useEffect(() => {
    jobServices.getAll(0, 40).then(onGetJobsSuccess).catch(onGetJobsError);

    techCoServices
      .getAll(0, 100)
      .then(onGetTechCoSuccess)
      .catch(onGetTechCoError);

    if (jobId) {
      jobServices
        .getById(jobId)
        .then(onJobGetByIdSuccess)
        .catch(onJobGetByIdError);
    }
  }, []);

  /*
      1. Have a useEffect that fetches ALL TC
      2. On success map them
      3. Then as you map them
      4. Create options for the select
      5. Set state that data

      select
        option that says select a TC
        {optiosnFromState}
      closeSelect

      const mapOptions = (tc) => {
        return (
          option value=tc.id {tc.name} closeOption
        )
      }

      */
  //********************************
  //*** GET JOB By ID SUCC HANDLER *
  //********************************
  const onJobGetByIdSuccess = (response) => {
    toastr.success("Success! Got Your Job");
    console.log("onGetJobsSuccess", response);

    setFormData((prevState) => {
      console.log("Updating State From By Id Hander");
      let newJobObject = { ...prevState };

      newJobObject.title = response.title;
      newJobObject.description = response.description;
      newJobObject.summary = response.summary;
      newJobObject.pay = response.pay;
      newJobObject.slug = response.slug;
      newJobObject.skills = response.skills;
      newJobObject.statusId = response.statusId;
      newJobObject.techCompanyId = response.techCompany.id;
      newJobObject.techCompanyName = response.techCompany.name;
      newJobObject.id = response.id;

      newJobObject.skills = response.skillsForJobs[0].name.toString(",");
      console.log(newJobObject.skills);

      console.log(newJobObject);

      return newJobObject;
    });
  };

  //********************************
  //** GET JOB By ID ERROR HANDLER *
  //********************************
  const onJobGetByIdError = (error) => {
    toastr.error("Error! Did Not Get Your Job");
    console.warn(error, "onJobGetByIdError");
  };
  //********************************
  //*** GET JOB SUCC HANDLER ***
  //********************************
  const onGetJobsSuccess = (response) => {
    toastr.success("Success! Got All The Jobs");
    console.log("onGetJobsSuccess", response);

    let arrayOfJobs = response.data.item.pagedItems;

    console.log("onGetJobsSuccess", arrayOfJobs);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfJobs = arrayOfJobs;
      pd.jobComponents = arrayOfJobs.map(mapJob);
      return pd;
    });
  };

  //********************************
  //**** MAPPING JOB ON RENDER **
  //********************************

  const mapJob = (aJob) => {
    console.log("mapping", aJob);

    let jobObject = {
      title: aJob.title,
      id: aJob.id,
      slug: aJob.slug,
      statusId: aJob.statusId,
      summary: aJob.summary,
      skills: aJob.skills,
      pay: aJob.pay,
    };

    return jobObject;
  };

  //********************************
  //*** GET JOBS SUCC ERROR *****
  //********************************
  const onGetJobsError = (error) => {
    toastr.error("Error! User Not Logged In");
    console.warn(error, "onUserAddError");
  };

  //********************************
  //*** GET TECH SUCC HANDLER ***
  //********************************
  const onGetTechCoSuccess = (response) => {
    toastr.success("Success! Got All The Tech Companies");
    console.log("onGetTechCoSuccess", response.techCompany);

    let arrayOfTechData = response.techCompany;
    console.log(arrayOfTechData);

    setTechData(() => {
      return arrayOfTechData.map(mapTechCompany);
    });
  };
  //********************************
  //**** MAPPING TECH CO ON RENDER **
  //********************************

  const mapTechCompany = (aCompany) => {
    console.log("mapping", aCompany);

    return (
      <option key={aCompany.id} value={aCompany.id}>
        {aCompany.name}
      </option>
    );

    // let techCoObject = {
    //   techCompanyName: aCompany.name,
    //   id: aCompany.id,
    // };

    // return techCoObject;
  };

  //********************************
  //*** GET TECH ERROR *****
  //********************************
  const onGetTechCoError = (error) => {
    toastr.error("Error! Did Not Grab Tech Companies");
    console.warn(error, "onGetTechCoError");
  };

  //********************************
  //**** GRAB ID IN URL IF NEEDED **
  //********************************
  const { jobId } = useParams();
  console.log("Params", jobId);

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
                        Add New Job{" "}
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="title"
                              name="title"
                              className="title"
                              value={formData.title}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Position/Title</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="description"
                              name="description"
                              className="description"
                              value={formData.description}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">
                              Job Description
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="summary"
                              name="summary"
                              className="summary"
                              value={formData.summary}
                              onChange={onFormFieldChange}
                            />
                            <label className="email">Job Summary</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="pay"
                              name="pay"
                              className="pay"
                              value={formData.pay}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Salary</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="slug"
                              name="slug"
                              className="slug"
                              value={formData.slug}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Slug</label>
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
                            <label className="form-label">Desired Skills</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="statusId"
                              className="statusId"
                              id="statusId"
                              value={formData.statusId}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Status</label>
                          </div>
                        </div>

                        <select
                          id="techCompanyId"
                          name="techCompanyId"
                          className="form-select d-flex flex-row align-items-center mb-4"
                          aria-label="Default select example"
                          value={formData.techCompanyId}
                          onChange={onFormFieldChange}
                        >
                          <option value="">Tech Company</option>
                          {techCoData}
                        </select>

                        {/* <select
                          id="techCompanyId"
                          name="techCompanyId"
                          className="form-select d-flex flex-row align-items-center mb-4"
                          aria-label="Default select example"
                          value=""
                          onChange={onFormFieldChange}
                        >
                          <option value="">Tech Company</option>
                          <option id="68252" value="68252">
                            Atlassian
                          </option>
                          <option id="68239" value="68239">
                            Adobe
                          </option>
                          <option id="68240" value="68240">
                            Zoom Video Communications
                          </option>
                          <option id="68831" value="68831">
                            Apple
                          </option>
                          <option id="68809" value="68809">
                            Tesla
                          </option>
                        </select> */}

                        {/* <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="number"
                              id="techCompanyId"
                              name="techCompanyId"
                              className="techCompanyId"
                              value={formData.techCompanyId}
                              onChange={onFormFieldChange}
                            />
                            <label className="form-label">Company ID#</label>
                          </div>
                        </div> */}

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

export default JobForm;
