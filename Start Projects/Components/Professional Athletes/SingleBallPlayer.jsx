import React from "react";

function SingleBallPlayer(props) {
  console.log(props.ballPlayer);
  let bData = props.ballPlayer;
  const onLocalPersonClicked = (evt) => {
    evt.preventDefault();
    console.log(bData);
  };
  return (
    <React.Fragment>
      <div className="card col-md-3">
        <div
          className="bg-image hover-overlay ripple"
          data-mdb-ripple-color="light"
        >
          <img
            src={bData.pictureUrl}
            className="card-img-top"
            alt="I love Friends"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title font-bold">{bData.name}</h5>
          <p className="card-text">{bData.description}</p>
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

export default SingleBallPlayer;
