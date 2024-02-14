import React from 'react'
import Login from './Login';
import ListItemsComp from '../listItems/ListItemsComp';

function ListItems() {
    return (
        localStorage.getItem('token')?<ListItemsComp/>:<Login/>
    )
}

export default ListItems