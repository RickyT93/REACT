import React, { useCallback, useEffect, useState } from "react";
import * as friendServices from "../../services/friendServices";
import toastr from "toastr";
import Friend from "./Friend";
import FriendByQuery from "./FriendByQuery";
import { useNavigate } from "react-router-dom";

import Pagination from "rc-pagination";

import "rc-pagination/assets/index.css";

import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";
const _logger = debug.extend("Friends");

const sectionStyle = {
  backgroundColor: "blue",
  height: "100vh",
  backgroundSize: "cover",
  display: "block",
  justifyContent: "center",
  alignitems: "center",
  backgroundattachment: "fixed",
};

const h3 = {
  color: "White",
};

const row = {
  display: "flex",
};

const btnWarning = {
  width: "auto",
  height: "auto",
  textAlign: "center",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
};
const btnAddFriend = {
  width: "auto",
  height: "auto",
  textAlign: "center",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
};

const btnSearch = {
  alignitems: "center",
  justifyContent: "center",
  color: "black",
};

/*
  1. Pagination -> We need some values for pagination
  to work in the first plce

  1. pageSize
  2. totalCount -> How many items thre are in total
  3. pageIndex -> current page you're on, 1 - 4 - 9 whatever pageur on

  All we have to do with rc-pag

  is juist provide 2 things
  1. The values that it needs 
  2. function to handle the page change

  Give it afnc to help us change the page number that comes back

  now we have to have code

  that handles that page change

  and we can do it a couple of different ways

  but i prefer to use useEffect

  useEffect will essentially capture the new page index

  and  i will then fetch the next page of friends

  using the api call

  api call -> getFriend(pageSize, pageIndex);
  pageIndex will be varaible -> 1, 2, 9, 10

  and when that changes,

  we need to make thiscall again getFriend(pageSize, pageIndex); with the correct page 
*/

function Friends() {
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
  // const [pagination, setPagination] = useState({
  //   currentPage: 1,
  //   totalCount: 5,
  //   pageSize: 10,
  // });

  //********************************
  //* STATE FOR GET ALL AXIO REQUEST
  //********************************

  const [pageData, setPageData] = useState({
    arrayOfFriends: [],
    peopleComponents: [],
  });

  //********************************
  //***** STATE FOR RENDER COUNT ***
  //********************************

  const [count, setCount] = useState(0);

  //********************************
  //******* STATE RENDER CARDS *****
  //********************************

  const [show, setShow] = useState(false);
  _logger(show);

  //********************************
  //* STATE FOR PAGIN SEARCH AXIOS *
  //********************************
  const [queryResponse, setQueryResponse] = useState({
    arrayFromQuery: [],
    friendComponents: [],
  });

  //********************************
  //* STATE FOR SEARCH BAR VALUE ***
  //********************************

  const [searchTerm, setSearchState] = useState({ query: "" });

  //********************************
  //***** ON SEARCH BAR FUNCTION ***
  //********************************

  const onSearchBarChange = (event) => {
    _logger(onSearchBarChange, "onSearchBarChange");
    _logger("onChange", { syntheticEvent: event });

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
  //*********  USE EFFECT   ********
  //********************************
  useEffect(() => {
    friendServices
      .getAll(current - 1, size)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, [current]);

  //********************************
  //*** GET FRIENDS SUCC HANDLER ***
  //********************************
  const onGetFriendsSuccess = (response) => {
    toastr.success("Success! Got All The Friends");

    _logger(response);
    let arrayOfFriends = response.data.item.pagedItems;

    _logger(arrayOfFriends);

    const pageTotal = response.data.item.totalCount;
    setTotalCount(pageTotal);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfFriends = arrayOfFriends;
      pd.peopleComponents = pd.arrayOfFriends.map(mapFriend);
      _logger(pd);
      return pd;
    });
  };

  //********************************
  //*** GET FRIENDS SUCC ERROR *****
  //********************************
  const onGetFriendsError = (error) => {
    toastr.error("Error! User Not Logged In");
    console.warn(error, "onUserAddError");
  };

  //********************************
  //*** RENDER COUNTER CLICK  ******
  //********************************
  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  //********************************
  //******** DELETE FRIEND    ******
  //********************************

  const onClick = useCallback((id, eObj) => {
    _logger(id, eObj);
    deletingFriend(id);
  }, []);

  const deletingFriend = (id) => {
    _logger(id);

    const handler = getDeleteSuccessHandler(id);

    friendServices.deleteById(id).then(handler).catch(onFriendDeleteError);
  };

  //********************************
  //****  DELETE SUCC HANDLER ******
  //********************************

  const getDeleteSuccessHandler = (id) => {
    return () => {
      _logger("removeFriendDeleted", id);

      setPageData((prevState) => {
        _logger("setPageData");

        const pd = { ...prevState };

        pd.arrayOfFriends = [...pd.arrayOfFriends];

        // eslint-disable-next-line array-callback-return
        pd.arrayOfFriends = pd.arrayOfFriends.filter((friend) => {
          let result = false;

          if (!friend.id || friend.id <= 0) {
            result = false;
            return `${result} Filter for  ${friend.id} did not work`;
          } else if (friend.id !== id) {
            return friend;
          }
        });

        pd.peopleComponents = pd.arrayOfFriends.map(mapFriend);

        _logger(pd);

        return pd;
      });
    };
  };

  //       const idxOf = pd.arrayOfFriends.findIndex((id) => {
  //         let result = false;
  //         if (id) {
  //           result = true;
  //         }
  //         return result;
  //       });
  //       console.log(idxOf);
  //       if (idxOf >= 0) {
  //         pd.arrayOfFriends.splice(idxOf, 1);
  //         pd.peopleComponents = pd.arrayOfFriends.map(mapFriend);
  //       }
  //       return pd;
  //     });
  //   };
  // };

  //       const idxOf = pd.arrayOfFriends.filter((friend) => {
  //         console.log(friend.id);
  //         let result = false;
  //         if (friend.id === id) {
  //           result = true;
  //         } else if (!friend.id || friend.id <= 0) {
  //           result = false;
  //         }
  //         return result;
  //       });

  //       console.log(idxOf);

  //       if (idxOf >= 0) {
  //         pd.arrayOfFriends.splice(idxOf, 1);
  //         console.log(pd.arrayOfFriends);
  //         pd.peopleComponents = pd.arrayOfFriends.map(mapFriend);
  //       }
  //       console.log(pd);
  //       return pd;
  //     });
  //   };
  // };

  //   const getDeleteSuccessHandler = ((id) => {

  //   console.log("removeFriendDeleted", id);

  //   setPageData((prevState) => {

  //     console.log("setPageData");

  //     const pd = { ...prevState }

  //     pd.arrayOfFriends = [...pd.arrayOfFriends]

  //     const idxOf = pd.arrayOfFriends.findIndex((id) => {
  //       let result = false

  //       if (id) {
  //         result = true
  //       }

  //       return result
  //     });
  //     console.log(idxOf);
  //     if (idxOf >= 0) {
  //       pd.arrayOfFriends.splice(idxOf, 1);
  //       pd.peopleComponents = pd.arrayOfFriends.map(mapFriend);
  //     }
  //     return pd;
  //   });
  // })

  //********************************
  //****  DELETE ERROR HANDLER ******
  //********************************
  const onFriendDeleteError = (error) => {
    toastr.error("Error! Friend Not Deleted");
    console.warn(error, "onFriendDeleteError");
  };

  //********************************
  //****     USE NAVIGATE     ******
  //********************************
  const navigate = useNavigate();

  const goToPage = (e) => {
    _logger(e.currentTarget.dataset.page);
    navigate(e.currentTarget.dataset.page);
  };

  //********************************
  //**** MAPPING FRIEND ON RENDER **
  //********************************

  const mapFriend = (aFriend) => {
    _logger("mapping", aFriend);
    return (
      <React.Fragment>
        <Friend
          friend={aFriend}
          key={"ListA-" + aFriend.id}
          onFriendClicked={onClick}
        />
      </React.Fragment>
    );
  };

  //********************************
  //**** MAPPING FRIEND ON SEARCH **
  //********************************
  const mapSearchedFriend = (aFriend) => {
    _logger("Mapping From Search", aFriend);
    return (
      <FriendByQuery
        searchedFriend={aFriend}
        key={"ListA-" + aFriend.id}
        onFriendClicked={onClick}
      />
    );
  };

  //********************************
  //********  SHOW FRIENDS *********
  //********************************
  const onClickShowFriends = (e) => {
    e.preventDefault();
    _logger("Toggling Friends");

    setShow((prevState) => !prevState);

    friendServices
      .getAll(current - 1, size)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);

    setQueryResponse((prevState) => {
      let qr = { ...prevState };

      qr.arrayFromQuery = [];

      qr.friendComponents = [];

      return qr;
    });
  };

  //********************************
  //******  SEARCH BAR CLICK *******
  //********************************
  const onClickSearchFriends = (e) => {
    e.preventDefault();

    _logger("searchByQuery");

    friendServices
      .getFriendByQuery(0, 10, searchTerm.query)
      .then(onGetFriendSearchSuccess)
      .catch(onGetFriendSearchError);

    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.arrayOfFriends = [];
      pd.peopleComponents = [];
      return pd;
    });
  };

  //********************************
  //**** SEARCH BAR SUCC HANDLER ***
  //********************************
  var onGetFriendSearchSuccess = (response) => {
    _logger(response);
    let queryResponseComponents = response.pagedItems;
    _logger(queryResponseComponents);

    setQueryResponse((prevState) => {
      let qr = { ...prevState };

      qr.arrayFromQuery = queryResponseComponents;

      _logger(qr.arrayFromQuery);

      qr.friendComponents = qr.arrayFromQuery.map(mapSearchedFriend);

      return qr;
    });
  };

  //********************************
  //**** SEARCH BAR ERROR HANDLER ***
  //********************************
  var onGetFriendSearchError = (err) => {
    console.error(err);
  };

  return (
    <React.Fragment>
      <section className="vh-100" style={sectionStyle}>
        <div className="container-fluid display:flex">
          <div className="row" style={row}>
            <button
              style={btnWarning}
              className=".my-button btn btn-warning"
              type="button"
              onClick={onClickShowFriends}
            >
              Click To Show Friends
            </button>
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
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={onClickSearchFriends}
              >
                Search
              </button>
            </div>
            <button
              style={btnAddFriend}
              className=".my-button btn btn-warning"
              type="button"
              id="home"
              data-page="/addfriend"
              onClick={goToPage}
            >
              Click To Add New Friend
            </button>
            <h3 style={h3} onClick={onHeaderClicked}>
              Rendering {count}
            </h3>

            {show === true && pageData.peopleComponents}
            {queryResponse.friendComponents}
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

export default Friends;
