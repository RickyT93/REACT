import React from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
const _logger = debug.extend("TechCompany");

const cardImg = {
  maxWidth: "80%",
  maxHeight: "20vw",
  objectFit: "contain",
  marginTop: "20px",
};

const card = {
  width: "10%",
  height: "11vw",
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

function TechCompany(props) {
  const navigate = useNavigate();
  const atechCompany = props.techCompany;
  _logger(props.techCompany.id);
  const navigateToTechCompanyPage = (atechCompany) => {
    navigate(`/techcompanies/${atechCompany.id}`);
  };

  const goToPage = (e) => {
    e.preventDefault();
    navigateToTechCompanyPage(props.techCompany);
  };

  const onLocalCompanyClicked = (evt) => {
    evt.preventDefault();
    props.onCompanyClicked(atechCompany.id, evt);
  };

  _logger(props.techCompany);

  return (
    <div style={card} className="card col-md-3">
      <div
        className="bg-image hover-overlay ripple"
        data-mdb-ripple-color="light"
      >
        <img
          src={atechCompany.image.imageUrl}
          style={cardImg}
          className="card-img-top"
          alt="I love Friends"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title font-bold">{atechCompany.name}</h5>
        <p className="card-text">{atechCompany.profile}</p>
        <button
          className="delete .my-button btn btn-primary btn btn-danger btn-small"
          type="button"
          id="delete"
          onClick={onLocalCompanyClicked}
        >
          Delete
        </button>
        <button
          className="edit .my-button btn btn-primary btn-small"
          type="button"
          id="edit"
          onClick={goToPage}
          data-page={atechCompany.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(TechCompany);
