import React, { useState } from "react";
import { Button, DialogActions, Dialog, DialogTitle, DialogContent, TextField, DialogContentText } from "@mui/material";
import { handleReload, handleUserTokenAndIdCookiesSetting } from "@helpers/additional-funcs";
import "./LoginModal.css";
import { UseStoreDispatcher } from "@redux/store/store";
import { authorizationActions } from "@redux/slices/authorization-slice";
import { preloadTime } from "@helpers/const-values";

export default function AuthorizationModal() {
  const dispatch = UseStoreDispatcher();

  const [formData, setFormData] = useState({
    credentials: {
      username: "",
      token: "",
    },
  });

  const handleClose = () => {
    dispatch(authorizationActions.changedLogInVisibility(false));
    handleReload(preloadTime);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      credentials: {
        ...prevFormData.credentials,
        [name]: value,
      },
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data :  ", formData);
    if (!formData) {
      return;
    }
    handleUserTokenAndIdCookiesSetting("userToken", formData.credentials.token);
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog open={true} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Login Form</DialogTitle>
          <DialogContent>
            <DialogContentText>For further cooperation, please enter username and token here</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={formData.credentials.username}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="token"
              name="token"
              label="Token"
              type="text"
              fullWidth
              variant="standard"
              value={formData.credentials.token}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
