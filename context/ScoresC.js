import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';


export const ScoresContext = React.createContext();

export const ScoresProvider = ({ children }) => {
    const [scores, setScores] = useState();

    useEffect(()=>{
        
    })



    return (
        <ScoresContext.Provider
            value={
                scores
            }
        >
            {children}
        </ScoresContext.Provider>
    );
};