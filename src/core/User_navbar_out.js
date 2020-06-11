import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import Signin from '../user/Signin';
import Signup from '../user/Signup';
import { findByLabelText } from '@testing-library/react';




const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#000000"}
}

// const customStyles = {
//     content : {
//       display:'flex',
//       flexDirection:'column', 
//       alignItems:'center',
//       position:'relative',
//       top                   : '45%',
//       left                  : '50%',
//       right                 : 'auto',
//       bottom                : 'auto',
//       marginRight           : '-50%',
//       transform             : 'translate(-50%, -50%)',
//       width                 : '300px',
//       height                : '500px',
//       border:'solid',
//       focus:'none'
//     }
//   };


function User_navbar ({history}) {
//  const [modalIsOpen, setModalIsOpen] = useState (false)
//  const [modalIsOpenSignup, setModalIsOpenSignup] = useState (false)

    return (

    <nav className="user-navbar-not-in">
        <ul className="nav nav-tabs">
            <li className="nav-item">

                 {/* <Modal isOpen={modalIsOpen} 
                        onRequestClose= {() => setModalIsOpen(false)}
                        style={customStyles}
                        className="YouClass"
                        overlayClassName="Overlay"      
                       >

                    <Signin/>
                    <button className="close-modal-signin" onClick={()=>setModalIsOpen(false)}>+</button>

                    <p>or you can <button onClick={()=>{setModalIsOpenSignup(true);setModalIsOpen(false);}}>Signup</button></p>


                </Modal>  */}



                <Link style={isActive(history, "/signin")} to="/signin">
                    Singin
                </Link>
            </li>
            <li className="nav-item">
                {/* <button className="signup-modal" onClick= {()=> setModalIsOpenSignup(true)}>Signup</button> */}

                {/* <Modal isOpen={modalIsOpenSignup}   
                       onRequestClose= {() => setModalIsOpenSignup(false)}  
                         
                 >    
                        // style={customStyles}>
                        <Signup/>
                        <button onClick={()=>setModalIsOpenSignup(false)}>Close</button>
                        <p>or you can <button onClick={()=>{setModalIsOpenSignup(false);setModalIsOpen(true);}}>Signin</button></p>
                    </Modal> */}


                <Link style={isActive(history, "/signup")} to="/signup">
                    Signup
                </Link>
            </li>
        </ul>
    </nav>
    ) 
            }
export default withRouter(User_navbar);