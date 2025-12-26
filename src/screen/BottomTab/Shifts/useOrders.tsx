import { useState, useEffect, useRef } from 'react';
   
export const useOrders = () => {
    const [location, setLocation] = useState(null);
     const [isLoading, setIsLoading] = useState(false);
      const [orderData, setorderData] = useState([]);
 
 

  return {
    // States
    isLoading,
    setIsLoading,
 location, setLocation  ,
 orderData, setorderData
 
 
    // API function
   };
};
