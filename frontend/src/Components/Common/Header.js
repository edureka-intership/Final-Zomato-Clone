
import React,{useState} from 'react';
import '../../style/Header.css';
import Modal from 'react-modal';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';


Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function Header() {
 const[isLoginModalOpen,setIsLoginModalOpen]=useState(false)
 const [isCreateAccountOpen,setCreateAccount]=useState(false)



  return (
    <div className='header'>
        <div className='s-logo'>
            <span>e!</span>
        </div>
        <div className='btn-group login-block'>
            <span className='login' onClick={()=>setIsLoginModalOpen(true)}>LogIn</span>
            <span className='signUp' onClick={()=>setCreateAccount(true)}>Create An Account</span>
        </div>
        <Modal
           isOpen={isLoginModalOpen}
           style={customStyles}
        >
            <div>
                <h2>Login 
                  <button className='btn btn-danger' style={{float:'right'}} onClick={()=>setIsLoginModalOpen(false)}>X</button>
                </h2>
            </div>
            {/* three different options for login 1. usename & pwd  2. use facebook account 3.use google account */}
            <div>
                <form>
                    <input type="text" placeholder="enter your email"/><br/><br/>
                    <input type="password" placeholder='enter your password'/><br/><br/>
                    <button className='btn btn-secondary'>Login</button>
                </form>
            </div><br/><br/>
            <div>
              {/* <FacebookLogin></FacebookLogin>
              <GoogleLogin></GoogleLogin> */}
            </div>
        </Modal>

        <Modal 
           isOpen={isCreateAccountOpen}
           style={customStyles}
        >
            <div>
                <h2>Create An Account 
                     <button className='btn btn-danger' style={{float:'right'}} onClick={()=>setCreateAccount(false)}>X</button>
                </h2> 
            </div>
            <div>
                <form>
                    <input placeholder='Enter your email' id="email" type="email"/><br/>
                    <input placeholder='Enter your password' type="password" /><br/>
                    <input placeholder='Enter your password again' type="password" /><br/>
                    <button className='btn btn-primary'>Create Account</button>
                </form>
            </div>
        </Modal>
   </div>
  )
}
