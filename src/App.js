import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';
import Header from './core/Header'
import SideDrawer from './core/SideDrawer/SideDrawer';
import UserSideDrawer from './core/SideDrawer/UserSideDrawer'
import Backdrop from './core/Backdrop/Backdrop';
import Footer from './core/Footer'
import Modal from 'react-modal'
import SignInMoldal from './core/Modals/SignInModal'
import ModalIn from './core/Modals/ModalIn';


Modal.setAppElement('#root')
class App extends Component {

  state = {
    SideDrawerOpen: false,
    UserSideDrawerOpen:false,
    signinModalOpen:false,
    creating: false

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

  signinModalHandler = () => {
    this.setState((prevState) => {
      return {signinModalOpen: !prevState.signinModalOpen}
    })
  }


  backdropClickHandler = () => {
    this.setState({SideDrawerOpen: false, UserSideDrawerOpen:false})
  }

  StartCreateEventHandler = () => {
    this.setState({creating:true})
  } 





  render () {
    let backdrop;
    
    if (this.state.SideDrawerOpen || this.state.UserSideDrawerOpen || this.state.signinModalOpen){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
  
  return (
  <div style={{height: '100%'}}>
    <BrowserRouter>
      <SideDrawer close={this.backdropClickHandler} show={this.state.SideDrawerOpen}/>
      {backdrop}
      <UserSideDrawer close={this.backdropClickHandler} show={this.state.UserSideDrawerOpen}/>
      {backdrop}
      {/* <SignInMoldal close={this.signinModalHandler} show={this.state.signinModalOpen}/> */}
      
      <Header drawerClickHandler={this.drawerToggleClickHandler}  userClickHandler={this.UserDrawerToggleClickHandler}/>
      <MainRouter/>
    </BrowserRouter>
    <Footer/>

  </div>
    )
  }
}
export default App;
