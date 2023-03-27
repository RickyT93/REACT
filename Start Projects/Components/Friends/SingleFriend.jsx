import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("Friend");

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

function Friend(props) {
  // const [friendData] = useState({
  //   title: "",
  //   bio: "",
  //   summary: "",
  //   headline: "",
  //   slug: "",
  //   statusId: "",
  //   primaryImage: "",
  // });

  // const [myFriend] = useState(friendData);

  // const location = useLocation();

  const navigate = useNavigate();

  // const { friendId } = useParams();

  // console.log(friendId, location, myFriend);

  const navigateToFriendPage = (aFriend) => {
    const stateForTransports = {
      type: "FRIEND_VIEW",
      payload: aFriend.id,
    };

    navigate(`/friends/${aFriend.id}`, { state: stateForTransports });
  };

  const goToPage = (e) => {
    e.preventDefault();
    navigateToFriendPage(props.friend);
    // console.log(e.currentTarget.dataset.page);
    // navigate(e.currentTarget.dataset.page, aFriend);
    // console.log(e.currentTarget.dataset.page, { aFriend });
  };

  // console.log("Friend", props.friend);

  const aFriend = props.friend;
  // console.log(aFriend);
  // console.log(props);

  // setFriendData((prevState) => {
  //   let fd = [...prevState];
  //   fd.title = aFriend.title;
  //   fd.bio = aFriend.bio;
  //   fd.summary = aFriend.bio;
  //   fd.headline = aFriend.headline;
  //   fd.slug = aFriend.slug;
  //   fd.statusId = aFriend.statusId;
  //   fd.primaryImage = aFriend.primaryImage.imageUrl;
  //   return fd;
  // });

  const onLocalPersonClicked = (evt) => {
    evt.preventDefault();
    props.onFriendClicked(aFriend.id, evt);
  };

  _logger(aFriend);

  // console.log(aFriend);
  return (
    <div style={card} className="card col-md-3">
      <div
        className="bg-image hover-overlay ripple"
        data-mdb-ripple-color="light"
      >
        <img
          src={aFriend.primaryImage.url}
          style={cardImg}
          className="card-img-top"
          alt="I love Friends"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title font-bold">{aFriend.title}</h5>
        <p className="card-text">{aFriend.summary}</p>
        <button
          className="delete .my-button btn btn-primary btn btn-danger btn-small"
          type="button"
          id="delete"
          onClick={onLocalPersonClicked}
        >
          Delete
        </button>
        <button
          className="edit .my-button btn btn-primary btn-small"
          type="button"
          id="edit"
          onClick={goToPage}
          data-page={aFriend.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
Friend.propTypes = {
  friend: PropTypes.shape({
    // primaryImage.url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default React.memo(Friend);
