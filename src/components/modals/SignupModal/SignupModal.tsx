import React, { useState } from "react";
import { Dialog, DialogContentText, TextField, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material";
import { UseStoreDispatcher } from "@redux/store/store";
import { authorizationActions } from "@redux/slices/authorization-slice";

export default function SignupModal() {
  const dispatch = UseStoreDispatcher();

  const [formData, setFormData] = useState({
    email: "",
    token: "",
  });
  const handleClose = () => {
    dispatch(authorizationActions.changedSignUpVisibility(false));
  };
  const handleLogInModalOpening = () => {
    dispatch(authorizationActions.changedLogInVisibility(true));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData) {
      return;
    }
    handleClose();
    handleLogInModalOpening();
  };
  return (
    <React.Fragment>
      <Dialog open={true} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>SignUp form</DialogTitle>
          <DialogContent>
            <DialogContentText>For the next usage, please write down your email</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={formData.email}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Sign up!</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
