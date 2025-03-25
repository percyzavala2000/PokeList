import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'


export const useDebouncedValue = (input:string='',time:number=500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(handler);
    };
    
  }, [input])
// render
  return debouncedValue
}
