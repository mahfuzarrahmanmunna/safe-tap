// components/UserProfileProvider.js
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { createContext, useContext } from 'react';
// import { useUserProfile } from '@/hooks/useUserProfile';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const userProfileData = useUserProfile();
  
  return (
    <UserProfileContext.Provider value={userProfileData}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () => {
  return useContext(UserProfileContext);
};