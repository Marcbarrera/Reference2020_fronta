import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';
import Header from './core/Header'
import SideDrawer from './core/SideDrawer/SideDrawer';
import UserSideDrawer from './core/SideDrawer/UserSideDrawer'
import Backdrop from './core/Backdrop/Backdrop';
import Footer from './core/Footer'



class App extends Component {

  state = {
    SideDrawerOpen: false,
    UserSideDrawerOpen:false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {SideDrawerOpen: !prevState.SideDrawerOpen}
    }); 
  }

  UserDrawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {UserSideDrawerOpen: !prevState.UserSideDrawerOpen}
    }); 
  }


  backdropClickHandler = () => {
    this.setState({SideDrawerOpen: false, UserSideDrawerOpen:false})
  }

  render () {
    let backdrop;
    
    if (this.state.SideDrawerOpen || this.state.UserSideDrawerOpen ){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
  
  return (
  <div style={{height: '100%'}}>
    <BrowserRouter>
      <SideDrawer close={this.backdropClickHandler} show={this.state.SideDrawerOpen}/>
      {backdrop}
      <UserSideDrawer close={this.backdropClickHandler} show={this.state.UserSideDrawerOpen}/>
      {backdrop}
      <Header drawerClickHandler={this.drawerToggleClickHandler}  userClickHandler={this.UserDrawerToggleClickHandler}/>
      <MainRouter/>
    </BrowserRouter>
    <Footer/>

  </div>
    )
  }
}
export default App;
