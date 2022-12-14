import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Modal, FormControl, InputLabel, Input, TextField, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------
const CHANGE_PASSWORD = [
  {
    label: 'Change Password',
    linkTo: '/',
  },
];
const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_DASHBOARD.user.profile,
  },
  {
    label: 'Settings',
    linkTo: PATH_DASHBOARD.user.account,
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '2px solid #ff8d00',
  boxShadow: 24,
  p: 4,
  m: 1,
  flexDirection: 'column',
  display: 'flex',
  borderRadius: '5px',
};
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const [openCP, setOpenCP] = useState(false);
  const handleOpenCP = () => setOpenCP(true);
  const handleCloseCP = () => setOpenCP(false);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState(newPassword);
  const Token = localStorage.getItem('token')
  console.log("my token==>",Token)

  const ChangePassword = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQ5N2QzYjI3LTAxNTQtNGVmZi1hNTE4LTkyMzc0NmU3NjBmMyIsImVtYWlsIjoiaG5odGVjaEBnbWFpbC5jb20iLCJleHAiOjE2NjY0MjQ3MzcsImlhdCI6MTY2NjMzODMzN30.YlWa1SUByeM4v8z6QB2vullcbXZVCsURoDRbdcH7yCQ");

    const formdata = new FormData();
    formdata.append("oldpassword", "admin12345");
    formdata.append("password", "admin1234");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://linkdinn.pythonanywhere.com/Admin/changepassword?role=superadmin", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Stack sx={{ p: 1 }}>
          {CHANGE_PASSWORD.map((option) => (
            <MenuItem key={option.label} onClick={handleOpenCP}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>

      <Modal
        open={openCP}
        onClose={handleCloseCP}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6">
            Change Your Password
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Old Password"
            type="password"
            autoComplete="old-password"
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ m: 1 }}
          />
          <TextField
            id="outlined-password-input"
            label="New Password"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ m: 1 }}
          />
          <TextField
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="confirm-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (confirmPassword !== newPassword) {
                console.log("password not matched")
              } else {

                setConfirmPassword(e.target.value)
              }
            }}
            sx={{ m: 1 }}
          />
          <Button variant="contained" type="submit" onClick={ChangePassword}>Updated</Button>
        </Box>
      </Modal>
    </>
  );
}
