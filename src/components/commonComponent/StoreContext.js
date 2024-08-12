import React, {createContext, useState, useContext} from 'react';

const PickupAddressContext = createContext();
const DropAddressContext = createContext();
const UserDetailsContext = createContext();
const UserSignUpContext = createContext();
const ForgotPasswordContext = createContext();
const ServiceTypeContext = createContext();
const LookupContext = createContext();

export const StoreContext = ({children}) => {
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [signUpDetails, setSignUpDetails] = useState(null);
  const [forgotPasswordDetails, setForgotPasswordDetails] = useState(null);
  const [serviceTypeDetails, setServiceTypeDetails] = useState(null);
  const [lookupData, setLookupData] = useState(null);

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

  const saveServiceTypeDetails = serviceTypeDetails => {
    setServiceTypeDetails(serviceTypeDetails);
  };

  const saveLookupData = lookupData => {
    setLookupData(lookupData);
  };

  return (
    <UserDetailsContext.Provider value={{userDetails, saveUserDetails}}>
      <PickupAddressContext.Provider value={{pickupAddress, savePickupAddress}}>
        <DropAddressContext.Provider value={{dropAddress, saveDropAddress}}>
          <UserSignUpContext.Provider
            value={{signUpDetails, saveSignUpDetails}}>
            <ForgotPasswordContext.Provider
              value={{forgotPasswordDetails, saveForgotPasswordDetails}}>
              <ServiceTypeContext.Provider
                value={{serviceTypeDetails, saveServiceTypeDetails}}>
                <LookupContext.Provider value={{lookupData, saveLookupData}}>
                  {children}
                </LookupContext.Provider>
              </ServiceTypeContext.Provider>
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
export const useServiceTypeDetails = () => useContext(ServiceTypeContext);
export const useLookupData = () => useContext(LookupContext);
