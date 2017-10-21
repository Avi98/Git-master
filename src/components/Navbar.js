import React, { Component } from 'react';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const Ul = styled.ul`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
list-style-type: none;
margin: 0;
padding: 0;
width:100%;
background-color: rgb(0, 188, 212);
`;
const Li = styled.li`
`; 

const A = styled.a`
display: block;
color: #000;
padding: 8px 16px;
text-decoration: none;
&:hover{
  background-color: #555;
  color: white;
}
`;

class NavBar extends Component{
  constructor(){
    super();
    this.state={
      open:false,
      contacts:false
    }
  }

  handleToggle = () => {this.setState({open: !this.state.open})} 

  handleTabContacts = () => {
    this.setState({contacts: !this.state.contacts})

}

  render(){
    return(
      <div>
      <AppBar
      position="static" 
      color="default"
      title=""
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap = {() => {this.handleToggle()}}
      >
    <Ul>
    <A >
    <Li>Reports</Li>
    </A>
    <A onClick={()=>{!this.handleTabContacts()}}>
    <Li>Contacts</Li>
    </A>
    <A >
    <Li>Vouchers</Li>
    </A>
    <A>
    <Li>Items</Li>
    </A>
    </Ul>
    <Avatar
    color={'orange200'}
    backgroundColor={'pink400'}
    size={30}
    style={'margin: 5'}
    />
    <List>
    <ListItem
    disabled={true}
    leftAvatar={
      <Avatar src="images/uxceo-128.jpg" />
    }
    />
    </List>
      </AppBar>
      <Drawer 
      docked={false}
      open={this.state.open}
      onRequestChange={(open) => this.setState({open})}
      >
      <a onClick={()=>{this.handleToggle()}}>
      <MenuItem>Close Dwarer</MenuItem>
      </a>
      <MenuItem>Menu Item 2</MenuItem>
      </Drawer>    
      </div>
      
    );
  }
}
  
  export default NavBar;
  