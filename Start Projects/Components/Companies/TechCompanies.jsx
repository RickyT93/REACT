import React, { useEffect, useState, useCallback } from "react";
import * as techCoServices from "../../services/techCoServices";
import toastr from "toastr";
import TechCompany from "../techcompanies/TechCompany";
import TechCompanyByQuery from "../techcompanies/TechCompanyByQuery";

import Pagination from "rc-pagination";

import "rc-pagination/assets/index.css";

import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";
const _logger = debug.extend("TechCompanies");

const sectionStyle = {
  backgroundColor: "blue",
  height: "100vh",
  backgroundSize: "cover",
  display: "block",
  justifyContent: "center",
  alignitems: "center",
  backgroundattachment: "fixed",
};

// const h3 = {
//   color: "White",
// };

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
// const btnAddFriend = {
//   width: "auto",
//   height: "auto",
//   textAlign: "center",
//   justifyContent: "center",
//   margin: "auto",
//   display: "flex",
// };

const btnSearch = {
  alignitems: "center",
  justifyContent: "center",
  color: "black",
};

function TechCompanies() {
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
  //* STATE FOR PAGIN SEARCH AXIOS *
  //********************************
  const [queryResponse, setQueryResponse] = useState({
    arrayFromQuery: [],
    queryTechComponents: [],
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
  //* STATE FOR GET ALL AXIO REQUEST
  //********************************

  const [TCData, setTCData] = useState({
    arrayOfTC: [],
    techCompanyComponents: [],
  });
  _logger(TCData);

  //********************************
  //******* STATE RENDER CARDS *****
  //********************************

  const [show, setShow] = useState(false);
  _logger(show);

  //********************************
  //*********  USE EFFECT   ********
  //********************************
  useEffect(() => {
    techCoServices
      .getAll(current - 1, size)
      .then(onGetTechCoSuccess)
      .catch(onGetTechCoError);
  }, [current]);

  //********************************
  //*** GET Tech SUCC HANDLER ***
  //********************************
  const onGetTechCoSuccess = (response) => {
    toastr.success("Success! Got All The Tech Companies");
    _logger(response);

    let arrayOfTC = response.data.item.pagedItems;

    _logger(arrayOfTC);

    // const pageTotal = response.data.item.totalCount;
    // setTotalCount(pageTotal);

    setTCData((prevState) => {
      const tc = { ...prevState };
      tc.arrayOfTC = arrayOfTC;
      tc.techCompanyComponents = tc.arrayOfTC.map(mapTechCo);
      _logger(tc);
      return tc;
    });

    const pageTotal = response.data.item.totalCount;
    setTotalCount(pageTotal);
  };

  //********************************
  //*** GET Tech  ERROR *****
  //********************************
  const onGetTechCoError = (error) => {
    toastr.error("Error! Failed to GET Tech Companies");
    console.warn(error, "onGetTechCoError");
  };

  //********************************
  //**** MAPPING FRIEND ON RENDER **
  //********************************

  const mapTechCo = (aTC) => {
    _logger("mapping", aTC);
    _logger(aTC.id);
    return (
      <React.Fragment>
        <TechCompany
          techCompany={aTC}
          key={"ListA-" + aTC.id}
          onCompanyClicked={onClick}
        />
      </React.Fragment>
    );
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

    techCoServices.deleteById(id).then(handler).catch(onCompanyDeleteError);
  };

  //********************************
  //****  DELETE SUCC HANDLER ******
  //********************************

  const getDeleteSuccessHandler = (id) => {
    return () => {
      _logger("removeFriendDeleted", id);

      setTCData((prevState) => {
        _logger("setPageData");

        const tc = { ...prevState };

        tc.arrayOfTC = [...tc.arrayOfTC];

        // eslint-disable-next-line array-callback-return
        tc.arrayOfTC = tc.arrayOfTC.filter((company) => {
          let result = false;

          if (!company.id || company.id <= 0) {
            result = false;
            return `${result} Filter for  ${company.id} did not work`;
          } else if (company.id !== id) {
            return company;
          }
        });

        tc.techCompanyComponents = tc.arrayOfTC.map(mapTechCo);

        _logger(tc);

        return tc;
      });
    };
  };

  //********************************
  //****  DELETE ERROR HANDLER ******
  //********************************
  const onCompanyDeleteError = (error) => {
    toastr.error("Error! Company Not Deleted");
    console.warn(error, "onCompanyDeleteError");
  };

  //********************************
  //********  SHOW FRIENDS *********
  //********************************
  const onClickShowFriends = (e) => {
    e.preventDefault();
    _logger("Toggling Friends");

    setShow((prevState) => !prevState);

    techCoServices
      .getAll(current - 1, size)
      .then(onGetTechCoSuccess)
      .catch(onGetTechCoError);

    // setQueryResponse((prevState) => {
    //   let qr = { ...prevState };

    //   qr.arrayFromQuery = [];

    //   qr.friendComponents = [];

    //   return qr;
    // });
  };

  //********************************
  //******  SEARCH BAR CLICK *******
  //********************************
  const onClickSearchFriends = (e) => {
    e.preventDefault();

    _logger("searchByQuery");

    techCoServices
      .getCompanyByQuery(0, 10, searchTerm.query)
      .then(onGetCompanySearchSuccess)
      .catch(onGetCompanySearchError);

    setTCData((prevState) => {
      let tc = { ...prevState };
      tc.arrayOfTC = [];
      tc.techCompanyComponents = [];
      return tc;
    });
  };

  //********************************
  //**** SEARCH BAR SUCC HANDLER ***
  //********************************
  var onGetCompanySearchSuccess = (response) => {
    _logger(response);
    let queryResponseComponents = response.data.item.pagedItems;
    _logger(queryResponseComponents);

    setQueryResponse((prevState) => {
      let tc = { ...prevState };

      tc.arrayFromQuery = queryResponseComponents;

      _logger(tc.arrayFromQuery);

      tc.queryTechComponents = tc.arrayFromQuery.map(mapSearchedFriend);

      return tc;
    });
  };

  //********************************
  //**** SEARCH BAR ERROR HANDLER ***
  //********************************
  var onGetCompanySearchError = (err) => {
    console.error(err);
  };

  //********************************
  //**** MAPPING FRIEND ON SEARCH **
  //********************************
  const mapSearchedFriend = (aCompany) => {
    _logger("Mapping From Search", aCompany);
    return (
      <TechCompanyByQuery
        searchedFriend={aCompany}
        key={"ListA-" + aCompany.id}
        onCompanyClicked={onClick}
      />
    );
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
            {show === true && TCData.techCompanyComponents}
            {queryResponse.queryTechComponents}
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
export default TechCompanies;
