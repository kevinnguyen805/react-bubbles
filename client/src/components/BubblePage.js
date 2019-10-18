import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=> {
    getColors();
  },[])

  const getColors = () => {
    axiosWithAuth()
    .get('/api/colors')
    .then(response => {
      console.log(response.data)
      setColorList(response.data)
    })
    .catch(error => console.log(error))
  }

  console.log(props)

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} {...props}/>
      <Bubbles colors={colorList} />
      
    </>
  );
};

export default BubblePage;
