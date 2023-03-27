import React, { useState } from "react";
import JobModal from "./JobModal";
import { useNavigate } from "react-router-dom";
const cardImg = {
  maxWidth: "50%",
  maxHeight: "5vw",
  objectFit: "contain",
  marginTop: "20px",
};

const card = {
  width: "8%",
  height: "10vw",
  objectFit: "cover",
  backgroundColor: "whitesmoke",
  top: "45px",
  left: "45px",
  bottom: "25px",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "2%",
  position: "relative",
  boxShadow: "10px 10px",
  textAlign: "center",
  marginBottom: "100px",
};
const button = {
  top: "300px",
};

function Job(props) {
  const navigate = useNavigate();

  console.log("Rendering Jobs Now");

  const [show, setShow] = useState(false);

  console.log(show);
  console.log(props.job);
  const aJob = props.job;
  console.log(props.job.id);
  // const showModal = () => setModal({ isOpen: false });
  // // const hideModal = () => setModal({ isOpen: true });

  const onModalBtnClick = (e) => {
    e.preventDefault();
    console.log("Toggling Modal");

    setShow(!show);
  };

  const navigateToFriendPage = (object) => {
    const stateForTransports = {
      type: "FRIEND_VIEW",
      payload: object,
    };

    navigate(`/jobs/${object}`, { state: stateForTransports });
  };
  const goToPage = (e) => {
    e.preventDefault();
    navigateToFriendPage(aJob.id);
    // console.log(e.currentTarget.dataset.page);
    // navigate(e.currentTarget.dataset.page, aFriend);
    // console.log(e.currentTarget.dataset.page, { aFriend });
  };

  return (
    <React.Fragment>
      <div style={card} className="card col-md-3">
        <div
          className="bg-image hover-overlay ripple"
          data-mdb-ripple-color="light"
        >
          <img
            src={aJob.techCompany.image.imageUrl}
            style={cardImg}
            className="card-img-top"
            alt="I love Friends"
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title font-bold">{aJob.pay}</h5>
          <p className="card-text">{aJob.techCompany.name}</p>
          <div className="card-footer">
            <button
              className="edit .my-button btn btn-primary btn-small mt-auto"
              type="button"
              id="viewMore"
              onClick={onModalBtnClick}
              data-page=""
              style={button}
            >
              View More
            </button>
            <button
              className="edit .my-button btn btn-success btn-small mt-auto"
              type="button"
              id="edit"
              onClick={goToPage}
              data-page={aJob.id}
              style={button}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* isOpen={modalStatus} hideShow={modalStatus} isOpen={modalStatus} */}
      {show && <JobModal job={aJob} show={show} updateShow={setShow} />}
    </React.Fragment>
  );
}

export default React.memo(Job);
