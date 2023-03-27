import React from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
const _logger = debug.extend("SiteNav");

const img = {
  width: "50px",
  display: "flex",
  marginLeft: "10%",
};

function SiteNav(props) {
  const navigate = useNavigate();

  _logger(props.userAuth);

  const onLogoutClicked = (evt) => {
    evt.preventDefault();
    props.logOut(evt);
  };

  const goToPage = (e) => {
    navigate(e.currentTarget.dataset.page);
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item"></li>
              <li className="nav-item">
                <button
                  className="nav-link px-2 text-white link-button"
                  id="home"
                  data-page="/home"
                  onClick={goToPage}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link px-2 text-white link-button"
                  id="friends"
                  data-page="/friends"
                  onClick={goToPage}
                >
                  Friends
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link px-2 text-white link-button"
                  id="addfriend"
                  data-page="/addfriend"
                  onClick={goToPage}
                >
                  Add Friend
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="jobs"
                  data-page="/jobs"
                  onClick={goToPage}
                >
                  Jobs
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="jobform"
                  data-page="/jobform"
                  onClick={goToPage}
                >
                  Job Form
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="techcompanyform"
                  data-page="/techcompanyform"
                  onClick={goToPage}
                >
                  TechCompany Form
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="techcompanies"
                  data-page="/techcompanies"
                  onClick={goToPage}
                >
                  TechCompanies
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="events"
                  data-page="/events"
                  onClick={goToPage}
                >
                  Events
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="testandajax"
                  data-page="/testandajax"
                  onClick={goToPage}
                >
                  Test and Ajax Call
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="politicalcandidates"
                  data-page="/politicalcandidates"
                  onClick={goToPage}
                >
                  Political Candidates
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="cars"
                  data-page="/cars"
                  onClick={goToPage}
                >
                  Cars
                </button>
              </li>
              <li className="nav-item">
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                  id="politicalcandidates"
                  data-page="/ballplayers"
                  onClick={goToPage}
                >
                  Ball Players
                </button>
              </li>
            </ul>
            <div className="text-end">
              <a
                href="/"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
              >
                {props.user.firstName} is Online
              </a>
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
              {props.userAuth ? (
                <button
                  type="button"
                  id="logout"
                  data-page="/LogIn"
                  className="btn btn-primary"
                  onClick={onLogoutClicked}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  id="login"
                  data-page="/LogIn"
                  className="btn btn-primary"
                  onClick={goToPage}
                >
                  Login
                </button>
              )}

              {props.userAuth ? null : (
                <button
                  type="button"
                  id="register"
                  data-page="/register"
                  className="btn btn-primary"
                  onClick={goToPage}
                >
                  Register
                </button>
              )}
              <span>
                <img
                  src={props.user.avatarUrl}
                  className="rounded-3"
                  style={img}
                  alt="Avatar"
                />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SiteNav;
