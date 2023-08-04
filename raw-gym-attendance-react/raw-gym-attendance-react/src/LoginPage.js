import React, { useState } from 'react';
import { Input,Button,Form } from 'antd';
import { setCookie } from './config/cookie';

const LoginPage = ({LoginHandler}) => {
  
  const staticPassword= "RawGYM001"
  const [password, setPassword]=useState("")

  const LoginSubmit=()=>{
    if(staticPassword===password){
      console.log("entered password :", password)
      setCookie("userLoggedIn",true)
      LoginHandler();
    }
    else{
      alert("Wrong Password Entered")
    }
  }


  return (
    <div className='login_main'>
        <div>
            <h2>Login to Attendance Portal</h2>
            <Form
              onFinish={LoginSubmit}
            >
            <Form.Item>
              <Input.Password
                required
                className='login_input' 
                placeholder='Enter Password to Login'
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Form.Item>
            <div className='login_button'>
              <Form.Item>
                <Button 
                  type='primary' 
                  htmlType='submit'>
                    Log In
                </Button>
              </Form.Item>
            </div>
            </Form>
        </div>
    </div>
  )
}

export default LoginPage