import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import TextField from '@mui/material/TextField';  // Import from @mui/material

import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

import Checkbox from '@mui/joy/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';  // Updated to use material FormControlLabel

import Logo from '../src/assets/icons/Logo.png'; 
import Line from '../src/assets/icons/enterline.png'; 
import GoogleIcon from '../src/assets/icons/google icon.png';  // Import Google Icon





export default function LoginModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginClick = () => {
    console.log('Logging in with:', { username, password });
  };

  const handleGoogleLoginClick = () => {
    console.log('Google Login');
  };

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => setIsOpen(true)}
          className="bg-gray-200 text-gray-600 hover:bg-gray-300 py-2 px-4"
        >
          Login
        </Button>
      </Stack>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog sx={{borderRadius: '50px'}}className="bg-white p-6 shadow-lg w-[609px] h-[787px]">
          <ModalClose className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" />
          <DialogTitle className="text-2xl font-semibold text-center text-gray-700">
          
          </DialogTitle>
          <DialogContent>
            <Stack sx={{marginTop: '20px'}}>
              {/* Username Input */}
        
              <div className="text-center">
                <img src={Logo} className="w-[182px] mx-auto mb-[-20px]" alt="Logo" />
                <h1 className="text-[46px] text-center mb-[-15px]">Hacienda Darasa</h1>
                <p className="text-[19px] text-center">Please enter your information to sign in</p>
              </div>
              

            <div>

            <div className='mt-[20px]'>
                <h1 className='text-[18px] font-[400] ml-[76px] mb-[3px]'>Email</h1>
    
                <div className="text-center">
                <Input
                  className="w-[417px] h-[46px] mb-5 rounded-[10px] border-2 border-[#27272A]"
                  placeholder="Enter your username"
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                />
        
                </div>
              </div>

              <div className='mt-[10px]'>
                <h1 className='text-[18px] font-[400] ml-[76px] mb-[1px]'>Password</h1>
    
                <div className="text-center">
                <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                className="w-[417px] h-[46px] mb-[10px] rounded-[10px] border-2 border-[#27272A]"
                placeholder="Input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
        
                </div>
              </div>
      
              {/* Show Password Checkbox */}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="text-blue-500"
                  />
                }
                label="Show Password"
                className="text-gray-700"
              /> */}

         
             

              {/* Google Login Button */}
             
              <div className="text-center mt-[5px]">
                  <Button
                    sx={{width: '417px', height: '47px', fontSize: '18px'}}
                    variant="solid"
                    color="primary"
                    fullWidth
                    onClick={handleLoginClick}
                    className=""
                  >
                    Login
                  </Button>

                  <img src={Line} className='w-[417.5px] mt-[15px]'/> 
                  <Button
                    sx={{width: '417px', height: '47px', marginTop:'15px'}}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleGoogleLoginClick}
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                  >
                    <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-[6px]" />
                    Login with Google
                  </Button>

              </div>
            </div>
            <h1 className='text-[18px] font-[400] text-center mt-[100px]'>Don’t have an account? <a href='www.youtube.com'>Sign Up</a></h1>

            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
