import React from "react";

function SingleCar(props) {
  console.log(props.car);
  let aCar = props.car;
  let show = props.showButton;
  console.log(show);
  let carClicked = props.onCarClicked;

  carClicked = () => {
    //! INPUT LOGIC HERE TO RETURN TO PARENT COMPONENT IN CAR
    //! RETURN SPECIFIC CARD DATA
  };

  return (
    <React.Fragment>
      <div className="card card mt-3 mb-3 me-3" style={{ width: "13.8rem" }}>
        <div className="card-body">
          <h5 className="card-title">{aCar.make}</h5>
          <p className="card-text">{aCar.model}</p>
          <p className="card-text">{aCar.year}</p>
          <button
            className="select-me btn btn-primary"
            type="button"
            id="edit"
            onClick={carClicked}
          >
            Select Me
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SingleCar;
