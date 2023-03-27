import React from "react";
const card = {
  width: "10%",
  height: "12vw",
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

function PresidentCard(props) {
  console.log(props.president);
  let aPresident = props.president;
  const onLocalPersonClicked = (evt) => {
    evt.preventDefault();
    console.log(aPresident);
  };
  return (
    <React.Fragment>
      <div className="card col-md-3" style={card}>
        <div
          className="bg-image hover-overlay ripple"
          data-mdb-ripple-color="light"
        >
          {" "}
          <img
            className="img-thumbnail"
            src="https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwMTcyOTk2MjYwODY1MzA1/us-flag-gettyimages-1315606853.jpg"
            alt="I love Friends"
          ></img>
        </div>
        <div className="card-body">
          <h5 className="card-title font-bold">{aPresident.nm}</h5>
          <p className="card-text">{aPresident.pp}</p>
          <button
            className="delete .my-button btn btn-primary btn btn-danger btn-small"
            type="button"
            id="delete"
            onClick={onLocalPersonClicked}
          >
            Click Me
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PresidentCard;
