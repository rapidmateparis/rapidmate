import React, {createContext, useState, useContext} from 'react';

const PickupAddressContext = createContext();
const DropAddressContext = createContext();
const UserDetailsContext = createContext();
const UserSignUpContext = createContext();
const ForgotPasswordContext = createContext();

export const StoreContext = ({children}) => {
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [signUpDetails, setSignUpDetails] = useState(null);
  const [forgotPasswordDetails, setForgotPasswordDetails] = useState(null);

  const savePickupAddress = address => {
    setPickupAddress(address);
  };

  const saveDropAddress = address => {
    setDropAddress(address);
  };

  const saveUserDetails = userDetails => {
    setUserDetails(userDetails);
  };

  const saveSignUpDetails = signUpDetails => {
    setSignUpDetails(signUpDetails);
  };

  const saveForgotPasswordDetails = forgotPasswordDetails => {
    setForgotPasswordDetails(forgotPasswordDetails);
  };

  return (
    <UserDetailsContext.Provider value={{userDetails, saveUserDetails}}>
      <PickupAddressContext.Provider value={{pickupAddress, savePickupAddress}}>
        <DropAddressContext.Provider value={{dropAddress, saveDropAddress}}>
          <UserSignUpContext.Provider value={{signUpDetails, saveSignUpDetails}}>
            <ForgotPasswordContext.Provider value={{forgotPasswordDetails, saveForgotPasswordDetails}}>
              {children}
            </ForgotPasswordContext.Provider>
          </UserSignUpContext.Provider>
        </DropAddressContext.Provider>
      </PickupAddressContext.Provider>
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext);
export const usePickupAddress = () => useContext(PickupAddressContext);
export const useDropAddress = () => useContext(DropAddressContext);
export const useSignUpDetails = () => useContext(UserSignUpContext);
export const useForgotPasswordDetails = () => useContext(ForgotPasswordContext);
