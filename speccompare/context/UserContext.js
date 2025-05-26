import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ firstName, setFirstName, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
