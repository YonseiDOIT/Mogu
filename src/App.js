import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackBeforeLogin from './navigation/StackBeforeLogin';
import StackAfterLogin from './navigation/StackAfterLogin';

// AuthContext 생성
export const AuthContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 로직

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        {isLoggedIn ? <StackAfterLogin /> : <StackBeforeLogin />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
