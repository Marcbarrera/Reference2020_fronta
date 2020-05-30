import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';
import Header from './core/Header'
import SideDrawer from './core/SideDrawer/SideDrawer';
import Backdrop from './core/Backdrop/Backdrop';


class App extends Component {

  state = {
    SideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {SideDrawerOpen: !prevState.SideDrawerOpen}
    }); 
  }

  backdropClickHandler = () => {
    this.setState({SideDrawerOpen: false})
  }

  render () {
    let backdrop;
    
    if (this.state.SideDrawerOpen){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
  return (
  <div style={{height: '100%'}}>
    <BrowserRouter>
      <SideDrawer close={this.backdropClickHandler} show={this.state.SideDrawerOpen}/>
      {backdrop}
      <Header drawerClickHandler={this.drawerToggleClickHandler} />
      <MainRouter/>
    </BrowserRouter>
  </div>
    )
  }
}
export default App;
