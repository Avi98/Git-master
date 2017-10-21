import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Contacts from '../pages/Contacts';


class Layout extends Component {
    state = {
        openMenu:false,
        openAddcontact:false
    }
    onClickNavigation = () => {
        this.setState({
            openMenu: !this.state.openMenu
        })
    }

    onClickForm = () => {
        this.setState({
            openAddcontact: !this.state.openAddcontact
        })
    }
    render() {
        return (
            <div>
                <Navbar 
                    onclickNav={this.onClickNavigation }
                />
                <Contacts onClickForm={this.onClickForm}/>
            </div>
        );
    }
}

export default Layout;