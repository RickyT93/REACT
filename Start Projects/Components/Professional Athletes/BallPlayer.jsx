import React, { useState, useEffect } from "react";
import SingleBallPlayer from "./SingleBallPlayer";

function BallPlayers() {
  const [playerData, setPlayerData] = useState({
    arrayofPlayers: [
      {
        id: 1,
        name: "Karl Malone",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        pictureUrl: "https://via.placeholder.com/400x400",
      },
      {
        id: 2,
        name: "Michael Jordan",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        pictureUrl: "https://via.placeholder.com/400x400",
      },
      {
        id: 3,
        name: "Lebron James",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        pictureUrl: "https://via.placeholder.com/400x400",
      },
      {
        id: 4,
        name: "Kobe Bryant",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        pictureUrl: "https://via.placeholder.com/400x400",
      },
    ],
    playerComponents: [],
  });
  console.log(playerData);

  //********************************
  //****SET BBALL PLAYER TO STATE
  //********************************

  useEffect(() => {
    setPlayerData((prevState) => {
      let pd = { ...prevState };

      pd.playerComponents = pd.arrayofPlayers.map(mapBallPlayer);
      return pd;
    });
  }, []);

  //********************************
  //**** MAPPING FRIEND ON RENDER **
  //********************************

  const mapBallPlayer = (aPlayer) => {
    console.log("mapping", aPlayer);
    return (
      <SingleBallPlayer ballPlayer={aPlayer} key={"ListA-" + aPlayer.id} />
    );
  };

  return <React.Fragment>{playerData.playerComponents}</React.Fragment>;
}

export default BallPlayers;
