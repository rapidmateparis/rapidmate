import React, { createContext, useState, useContext } from 'react';

const PickupAddressContext = createContext();
const DropAddressContext = createContext();

export const StoreContext = ({ children }) => {
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);

  const savePickupAddress = (address) => {
    setPickupAddress(address);
  };

  const saveDropAddress = (address) => {
    setDropAddress(address);
  };

  return (
    <PickupAddressContext.Provider value={{ pickupAddress, savePickupAddress }}>
      <DropAddressContext.Provider value={{ dropAddress, saveDropAddress }}>
        {children}
      </DropAddressContext.Provider>
    </PickupAddressContext.Provider>
  );
};

export const usePickupAddress = () => useContext(PickupAddressContext);
export const useDropAddress = () => useContext(DropAddressContext);
