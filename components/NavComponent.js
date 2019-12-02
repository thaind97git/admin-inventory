import React, { Component } from 'react';
import MenuComponent from '../components/MenuComponent';
import * as Utils from '../utils/utils';

class NavComponent extends Component {
    render() {
        const path = Utils.currentUrl();
        return (
            <MenuComponent 
                path={path}   
            />
        )
    }
}

export default NavComponent;