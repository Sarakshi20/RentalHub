import React from 'react'
import Login from './Login';
import ListViewComp from '../ListView/ListViewComp';

function ListView() {
  return (
    localStorage.getItem('token')?<ListViewComp />:<Login/>
  )
}

export default ListView