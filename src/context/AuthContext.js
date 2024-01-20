import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const mockUser = {
    uid: "123456",
    email: "test@example.com",
    displayName: "Test User",
    // Add any other properties your app uses
  };

  const [currentUser, setCurrentUser] = useState(mockUser);

  // Replace this useEffect logic with your own authentication logic
  useEffect(() => {
    // Mock the onAuthStateChanged functionality
    const mockAuthStateChanged = () => {
      // Use your authentication logic to determine the user
      // For example, you can check if the user is authenticated via cookies, tokens, etc.
      const isAuthenticated = true;

      if (isAuthenticated) {
        setCurrentUser(mockUser); // Set the user data accordingly
      } else {
        setCurrentUser(null); // Set to null if the user is not authenticated
      }
    };

    // Call the mockAuthStateChanged when the component mounts
    mockAuthStateChanged();

    // Return a cleanup function (optional)
    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
