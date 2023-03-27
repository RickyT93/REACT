import Pagination from "rc-pagination";

import "rc-pagination/assets/index.css";

import locale from "rc-pagination/lib/locale/en_US";

import React, { useEffect, useState } from "react";
import * as jobServices from "../../services/jobServices";
import toastr from "toastr";
import Job from "./Job";
import JobByQuery from "./JobByQuery";
// import JobModal from "./JobModal";
import debug from "sabio-debug";
const _logger = debug.extend("Jobs");

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
const row = {
  display: "flex",
};
const btnSearch = {
  alignitems: "center",
  justifyContent: "center",
  color: "black",
};

const btnWarning = {
  width: "auto",
  height: "auto",
  textAlign: "center",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
};
const button = {
  top: "300px",
};

function Jobs() {
  //********************************
  //***** STATE FOR PAGINATION *****
  //********************************
  const [current, setCurrent] = useState(1);

  const [size] = useState(4);

  const [totalCount, setTotalCount] = useState();

  const onChangedPage = (page) => {
    _logger("page in change p", page);
    setCurrent(page);
  };

  //********************************
  //* STATE FOR GET ALL AXIO REQUEST
  //********************************

  const [pageData, setPageData] = useState({
    arrayOfJobs: [],
    jobComponents: [],
  });

  //********************************
  //******* STATE RENDER CARDS *****
  //********************************

  const [show, setShow] = useState(false);

  //********************************
  //******* STATE FOR MODAL *****
  //********************************

  // const [toggleModal, setModal] = useState({ isOpen: false });
  // console.log(toggleModal);

  //********************************
  //* STATE FOR PAGIN SEARCH AXIOS *
  //********************************
  const [queryResponse, setQueryResponse] = useState({
    arrayFromQuery: [],
    jobComponents: [],
  });

  //********************************
  //* STATE FOR SEARCH BAR VALUE ***
  //********************************

  const [searchTerm, setSearchState] = useState({ query: "" });

  //********************************
  //***** ON SEARCH BAR FUNCTION ***
  //********************************

  const onSearchBarChange = (event) => {
    console.log(onSearchBarChange, "onSearchBarChange");
    console.log("onChange", { syntheticEvent: event });

    const target = event.target;
    const newQueryValue = target.value;
    _logger(newQueryValue);
    const nameOfField = target.name;

    setSearchState((prevState) => {
      _logger("updater onChange");

      // copy the personData object from state using the spread operator
      const newSearchTerm = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newSearchTerm[nameOfField] = newQueryValue;

      return newSearchTerm;
    });
    _logger("end onChange");
  };

  //********************************
  //******  SEARCH BAR CLICK *******
  //********************************
  const onClickSearchJobs = (e) => {
    e.preventDefault();

    _logger("searchByQuery");

    jobServices
      .getJobByQuery(0, 10, searchTerm.query)
      .then(onGetJobSearchSuccess)
      .catch(onGetJobSearchError);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfJobs = [];
      pd.jobComponents = [];
      _logger(pd);
      return pd;
    });
  };
  //********************************
  //**** SEARCH BAR SUCC HANDLER ***
  //********************************
  var onGetJobSearchSuccess = (response) => {
    _logger(response);
    let queryResponseComponents = response;
    _logger(queryResponseComponents);

    setQueryResponse((prevState) => {
      let qr = { ...prevState };

      qr.arrayFromQuery = queryResponseComponents;

      _logger(qr.arrayFromQuery);

      qr.jobComponents = qr.arrayFromQuery.map(mapSearchedJob);
      _logger(qr);

      return qr;
    });
  };

  //********************************
  //**** SEARCH BAR ERROR HANDLER ***
  //********************************
  var onGetJobSearchError = (err) => {
    console.error(err);
  };

  //********************************
  //**** MAPPING FRIEND ON SEARCH **
  //********************************
  const mapSearchedJob = (aJob) => {
    _logger("Mapping From Search", aJob);
    return <JobByQuery searchedJob={aJob} key={"ListA-" + aJob.id} />;
  };

  //********************************
  //*********  USE EFFECT   ********
  //********************************
  useEffect(() => {
    jobServices
      .getAll(current - 1, size)
      .then(onGetJobsSuccess)
      .catch(onGetJobsError);
  }, [current]);

  //********************************
  //*** GET JOB SUCC HANDLER ***
  //********************************
  const onGetJobsSuccess = (response) => {
    toastr.success("Success! Got All The Jobs");
    _logger(response);
    // const pageTotal = response.data.item.totalCount;
    // setTotalCount(pageTotal);

    setTotalCount(response.data.item.totalCount);
    _logger(response.data.item.totalCount);

    let arrayOfJobs = response.data.item.pagedItems;

    _logger(arrayOfJobs);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfJobs = arrayOfJobs;
      pd.jobComponents = arrayOfJobs.map(mapJob);
      _logger(pd);
      return pd;
    });
  };

  //********************************
  //*** GET JOBS SUCC ERROR *****
  //********************************
  const onGetJobsError = (error) => {
    toastr.error("Error! User Not Logged In");
    console.warn(error, "onUserAddError");
  };

  //********************************
  //**** MAPPING JOB ON RENDER **
  //********************************

  const mapJob = (aJob) => {
    _logger(aJob);
    _logger("mapping", aJob);
    return (
      <React.Fragment>
        {/* <JobModal modalInfo={aJob} /> */}
        <Job
          job={aJob}
          key={"ListA-" + aJob.id}
          // onClick={onModalBtnClick}
          // isOpen={toggleModal.isOpen}
          // toggleModal={toggleModal}
        />
      </React.Fragment>
    );
  };

  //********************************
  //********  SHOW MODAL *********
  //********************************
  // const onModalBtnClick = useCallback((e) => {
  //   e.preventDefault();
  //   console.log("Toggling Modal");

  //   setModal((prevState) => {
  //     const toggleModal = { ...prevState };

  //     toggleModal.isOpen = !prevState.isOpen;
  //     return toggleModal;
  //   });
  // }, []);

  //********************************
  //********  SHOW JOBS *********
  //********************************
  const onClickShowJobs = (e) => {
    e.preventDefault();
    _logger("Toggling Jobs");

    setShow((prevState) => !prevState);

    jobServices
      .getAll(current - 1, size)
      .then(onGetJobsSuccess)
      .catch(onGetJobsError);

    setQueryResponse((prevState) => {
      let qr = { ...prevState };
      qr.arrayFromQuery = [];
      qr.jobComponents = [];
      return qr;
    });
  };

  return (
    <React.Fragment>
      <section className="vh-100" style={sectionStyle}>
        <div className="container-fluid display:flex">
          <button
            style={btnWarning}
            className=".my-button btn btn-warning"
            type="button"
            onClick={onClickShowJobs}
          >
            Click To Show jobs
          </button>
          <div className="row display:flex" style={row}>
            {" "}
            {show === true && pageData.jobComponents}
            {queryResponse.jobComponents}
          </div>
          <div className="input-group">
            <input
              style={btnSearch}
              id="query"
              name="query"
              type="text"
              value={searchTerm.query}
              onChange={onSearchBarChange}
              className="form-control rounded"
              placeholder="Search"
            />
            <span>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={onClickSearchJobs}
              >
                Search
              </button>
            </span>
          </div>
        </div>
        <div>
          <Pagination
            onChange={onChangedPage}
            locale={locale}
            current={current}
            pageSize={size}
            total={totalCount}
          />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Jobs;
