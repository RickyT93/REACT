import React, { useState, useEffect } from "react";
import carService from "./services/carService";
import toastr from "toastr";
import SingleCar from "./SingleCar";

const btnWarning = {
  width: "auto",
  height: "auto",
  textAlign: "center",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
};

function Cars() {
  //********************************
  //* STATE FOR GET ALL AXIO REQUEST
  //********************************

  const [carData, setCarData] = useState({
    //! ORIGINAL DATA FROM RESPONSE
    arrayOfCars: [],
    carComponents: [],

    //! FILTERED STATE FOR SPECIFIC YEAR FROM ORIGINAL DATA
    filtered2018Components: [],
    filtered2019Components: [],
    filtered2020Components: [],
    filtered2021Components: [],

    //! FILTERED & MAPPED STATE FOR SPECIFIC YEAR FROM FILTERED DATA
    mappedFiltered2018components: [],
    mappedFiltered2019components: [],
    mappedFiltered2020components: [],
    mappedFiltered2021components: [],
  });
  const [carYear] = useState({
    year18: 2018,
    year19: 2019,
    year20: 2020,
    year21: 2021,
  });

  console.log(carData);

  //********************************
  //******* STATE SHOW ALL CARS *****
  //********************************

  const [show, setShow] = useState(false);
  console.log(show);

  //********************************
  //******** SET SHOW CARS *********
  //********************************
  const showAllButton = (e) => {
    e.preventDefault();
    console.log("Toggling Cars");

    setShow((prevState) => !prevState);
  };

  //********************************
  //******* STATE SHOW 2018 CAR ****
  //********************************

  const [show2018, set2018] = useState(false);

  //********************************
  //******* STATE SHOW 2019 CAR ****
  //********************************

  const [show2019, set2019] = useState(false);
  console.log(show);

  //********************************
  //******* STATE SHOW 2020 CAR ****
  //********************************

  const [show2020, set2020] = useState(false);
  console.log(show);

  //********************************
  //******* STATE SHOW 2021 CAR ****
  //********************************

  const [show2021, set2021] = useState(false);
  console.log(show);

  //********************************
  //* STATE SHOWBUTTON ON SINGLE CARD
  //********************************
  const [showButton, setShowButton] = useState(true);
  console.log(showButton);

  //********************************
  //***** USE EFFECT ***************
  //********************************

  useEffect(() => {
    carService.getAll().then(onGetCarsSuccess).catch(onGetCarsError);
  }, []);

  //********************************
  //*** GET CARS SUCC HANDLER ***
  //********************************
  const onGetCarsSuccess = (response) => {
    toastr.success("Success! Got All The Cars");
    console.log(response.data);
    const carsArray = response.data;
    console.log(carsArray);

    if (carsArray?.length > 0) {
      setCarData((prevState) => {
        const cd = { ...prevState }; //! USE carsArray and invoke filter function and mapping function (FILTER FIRST !!!!)
        cd.arrayOfCars = carsArray; //! FILTER 1 at a time and ensure it is loggging correct amount
        cd.carComponents = cd.arrayOfCars.map(mapCars);
        cd.filtered2018Components = carsArray.filter(filter2018Cars);
        cd.filtered2019Components = carsArray.filter(filter2019Cars);
        cd.filtered2020Components = carsArray.filter(filter2020Cars);
        cd.filtered2021Components = carsArray.filter(filter2021Cars);
        cd.mappedFiltered2018components = cd.filtered2018Components.map(
          map2018FilteredComponents
        );
        cd.mappedFiltered2019components = cd.filtered2019Components.map(
          map2019FilteredComponents
        );
        cd.mappedFiltered2020components = cd.filtered2020Components.map(
          map2020FilteredComponents
        );
        cd.mappedFiltered2021components = cd.filtered2021Components.map(
          map2021FilteredComponents
        );
        console.log(cd);
        return cd;
      });
    }
  };

  //********************************
  //**** FILTER 2018 CARS  *********
  //********************************
  const filter2018Cars = (aCar, index, allCars) => {
    console.log(aCar, index, allCars);
    if (aCar.year === carYear.year18) {
      return aCar;
    }
  };

  //********************************
  //* MAPPING & FILTERING 2018 COMP*
  //********************************

  const map2018FilteredComponents = (aCar) => {
    console.log("mapping", aCar);
    return (
      <React.Fragment>
        <SingleCar
          car={aCar}
          key={"ListA-" + aCar.id} //! unsure what the unique "key" prop would be? no ID was given in original array, How do i assigned it myself?
          showButton={showButton}
          onCarClicked={onCarClicked}
          id="side-card"
        />
      </React.Fragment>
    );
  };

  //********************************
  //**** FILTER 2019 CARS  *********
  //********************************
  const filter2019Cars = (aCar, index, allCars) => {
    console.log(aCar, index, allCars);
    if (aCar.year === carYear.year19) {
      return aCar;
    }
  };

  //********************************
  //* MAPPING & FILTERING 2019 COMP*
  //********************************

  const map2019FilteredComponents = (aCar) => {
    console.log("mapping", aCar);
    return (
      <React.Fragment>
        <SingleCar
          car={aCar}
          showButton={showButton}
          onCarClicked={onCarClicked}
          id="side-card"
        />
      </React.Fragment>
    );
  };

  //********************************
  //**** FILTER 2020 CARS  *********
  //********************************
  const filter2020Cars = (aCar, index, allCars) => {
    console.log(aCar, index, allCars);
    if (aCar.year === carYear.year20) {
      return aCar;
    }
  };

  //********************************
  //* MAPPING & FILTERING 2020 COMP*
  //********************************

  const map2020FilteredComponents = (aCar) => {
    console.log("mapping", aCar);
    return (
      <React.Fragment>
        <SingleCar
          car={aCar}
          showButton={showButton}
          onCarClicked={onCarClicked}
          id="side-card"
        />
      </React.Fragment>
    );
  };

  //********************************
  //**** FILTER 2021 CARS  *********
  //********************************
  const filter2021Cars = (aCar, index, allCars) => {
    console.log(aCar, index, allCars);
    if (aCar.year === carYear.year21) {
      return aCar;
    }
  };

  //********************************
  //* MAPPING & FILTERING 2021 COMP*
  //********************************

  const map2021FilteredComponents = (aCar) => {
    console.log("mapping", aCar);
    return (
      <React.Fragment>
        <SingleCar
          car={aCar}
          showButton={showButton}
          onCarClicked={onCarClicked}
          id="side-card"
        />
      </React.Fragment>
    );
  };

  //********************************
  //**** MAPPING CAR ON RENDER **
  //********************************

  const mapCars = (aCar) => {
    console.log("mapping", aCar);
    return (
      <React.Fragment>
        <SingleCar
          car={aCar}
          showButton={showButton}
          onCarClicked={onCarClicked}
          id="side-card"
        />
      </React.Fragment>
    );
  };

  //********************************
  //**** MAPPING SIDE CAR  *********
  //********************************

  //   const mapSideCar = (aCar) => {
  //     console.log("mapping", aCar);  //! ran out of time to complete logic due to zoom call with haley.
  //     return (
  //       <React.Fragment>
  //         <SingleCar
  //           car={aCar}
  //           showButton={showButton}
  //           onCarClicked={onCarClicked}
  //           id="side-card"
  //         />
  //       </React.Fragment>
  //     );
  //   };
  //********************************
  //*** LOGIC FOR CAR SELECTED *****
  //********************************
  const onCarClicked = () => {
    //! ran out of time to complete logic due to zoom call with haley.
    //mapSideCar()    //! INVOKE Seperate mapping function to render specific card data under sibiling col
    //! when clicked set SHOW BUTTON TO FALSE INSIDE OF OTHER BUTTONS BELOW
    setShowButton((prevState) => !prevState);
  };

  //********************************
  //*** GET CARS ERROR *************
  //********************************
  const onGetCarsError = (error) => {
    toastr.error("Error! No Cars Found");
    console.warn(error, "onGetCarsError");
  };

  //********************************
  //***  CAR 2018 SELECTED *****
  //********************************
  const onCar2018Clicked = () => {
    if ("show-2018-cars") {
      setShowButton((prevState) => !prevState);
      set2018((prevState) => !prevState);
      carData.filtered2018Components.map(map2018FilteredComponents);
    }
    // } else if ("show-2019-cars") {
    //   carData.filtered2019Components.map(map2019FilteredComponents);
    // } else if ("show-2020-cars") {
    //   carData.filtered2020Components.map(map2020FilteredComponents);
    // } else if ("show-2021-cars") {
    //   carData.filtered2021Components.map(map2020FilteredComponents);
  };
  //********************************
  //***  CAR 2019 SELECTED *****
  //********************************
  const onCar2019Clicked = () => {
    if ("show-2019-cars") {
      setShowButton((prevState) => !prevState);
      set2019((prevState) => !prevState);

      carData.filtered2019Components.map(map2019FilteredComponents);
    }
  };
  //********************************
  //***  CAR 2020 SELECTED *****
  //********************************
  const onCar2020Clicked = () => {
    if ("show-2020-cars") {
      setShowButton((prevState) => !prevState);
      set2020((prevState) => !prevState);

      carData.filtered2020Components.map(map2020FilteredComponents);
    }
  };
  //********************************
  //***  CAR 2021 SELECTED *****
  //********************************
  const onCar2021Clicked = () => {
    if ("show-2021-cars") {
      setShowButton((prevState) => !prevState);
      set2021((prevState) => !prevState);
      carData.filtered2021Components.map(map2021FilteredComponents);
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <button
            id="show-all"
            style={btnWarning}
            className=".my-button btn btn-warning"
            type="button"
            onClick={showAllButton}
          >
            Show Cars
          </button>
          <button
            id="show-2018-cars"
            style={btnWarning}
            className=".my-button btn btn-warning"
            type="button"
            onClick={onCar2018Clicked}
          >
            2018 Cars
          </button>
          <button
            id="show-2019-cars"
            style={btnWarning}
            className=".my-button btn btn-warning"
            type="button"
            onClick={onCar2019Clicked}
          >
            2019 Cars
          </button>
          <button
            id="show-2020-cars"
            style={btnWarning}
            className=".my-button btn btn-warning"
            type="button"
            onClick={onCar2020Clicked}
          >
            2020 Cars
          </button>
          <button
            id="show-2021-cars"
            style={btnWarning}
            className=".my-button btn btn-warning"
            type="button"
            onClick={onCar2021Clicked}
          >
            2021 Cars
          </button>
          {show === true && carData.carComponents}
          {show2018 === true && carData.mappedFiltered2018components}
          {show2019 === true && carData.mappedFiltered2019components}
          {show2020 === true && carData.mappedFiltered2020components}
          {show2021 === true && carData.mappedFiltered2021components}
          <div className="col">{/* RENDER SIDE CAR HERE!!!!!!!! */}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cars;
