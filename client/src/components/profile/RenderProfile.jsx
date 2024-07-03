import React, { useState } from "react";
import {
  Balance,
  FirstCard,
  PlayerStrength,
  BasicInfo,
  Logout,
} from "./ProfileComponents";
import {
  BasicInfoForm,
  FirstCardForm,
  PlayerStrengthForm,
} from "./ProfileForms";
import useLoginUser from "../../hooks/useLoginUser";

function RenderProfile({ profileData, role }) {
  const [updateFirstCard, setUpdateFirstCard] = useState(false);
  const [updatePlayerStrength, setUpdatePlayerStrength] = useState(false);
  const [updateBasicInfo, setUpdateBasicInfo] = useState(false);
  const { logoutUser } = useLoginUser();

  const togglePlayerStrength = () => {
    setUpdatePlayerStrength(!updatePlayerStrength);
  };

  const toggleBasicInfo = () => {
    setUpdateBasicInfo(!updateBasicInfo);
  };

  const toggleFirstCard = () => {
    setUpdateFirstCard(!updateFirstCard);
  };

  return (
    <>
      {updateFirstCard ? (
        <FirstCardForm data={profileData} toggleFirstCard={toggleFirstCard} />
      ) : (
        <FirstCard playerData={profileData} toggleFirstCard={toggleFirstCard} />
      )}
      <Balance playerData={profileData} />
      {updateBasicInfo ? (
        <BasicInfoForm data={profileData} toggleBasicInfo={toggleBasicInfo} />
      ) : (
        <BasicInfo playerData={profileData} toggleBasicInfo={toggleBasicInfo} />
      )}
      {role === "player" && updatePlayerStrength && (
        <PlayerStrengthForm
          data={profileData}
          togglePlayerStrength={togglePlayerStrength}
        />
      )}

      {role === "player" && !updatePlayerStrength && (
        <PlayerStrength
          playerData={profileData}
          togglePlayerStrength={togglePlayerStrength}
        />
      )}
      <Logout logoutUser={logoutUser} />
    </>
  );
}

export default RenderProfile;
