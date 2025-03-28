import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        paddingX: { xs: 2, sm: 4, md: 6 },
      }}
    >
      

      <Container
        maxWidth="lg"
        sx={{
          mt: 10,
          width: { xs: "90%", sm: "80%", md: "100%" },
        }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {/* Left Side - Image */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <img
              src="/assets/Login.png"
              alt="Project Management"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} md={5}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "10px",
                p: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <CardContent>
                {forgotPassword ? (
                  <>
                    <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                      Forgot Password
                    </Typography>

                    {!otpSent ? (
                      <>
                        <TextField
                          fullWidth
                          label="Enter your Email"
                          variant="outlined"
                          margin="normal"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 2, backgroundColor: "#28a745" }}
                          onClick={() => setOtpSent(true)}
                        >
                          Send OTP
                        </Button>
                      </>
                    ) : !otpVerified ? (
                      <>
                        <TextField
                          fullWidth
                          label="Enter OTP"
                          variant="outlined"
                          margin="normal"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 2, backgroundColor: "#28a745" }}
                          onClick={() => setOtpVerified(true)}
                        >
                          Verify OTP
                        </Button>
                      </>
                    ) : (
                      <>
                        <TextField
                          fullWidth
                          label="New Password"
                          variant="outlined"
                          margin="normal"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Confirm Password"
                          variant="outlined"
                          margin="normal"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#3f85f7" }}>
                          Submit
                        </Button>
                      </>
                    )}

                    <Typography textAlign="center" sx={{ mt: 2 }}>
                      <Button
                        sx={{ color: "#3f85f7", textTransform: "none" }}
                        onClick={() => {
                          setForgotPassword(false);
                          setOtpSent(false);
                          setOtpVerified(false);
                        }}
                      >
                        Back to Login
                      </Button>
                    </Typography>
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Enter your Email"
                      variant="outlined"
                      margin="normal"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label="Enter your Password"
                      variant="outlined"
                      margin="normal"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#3f85f7" }}
                      onClick={() => navigate("/dashboard")}
                    >
                      Login
                    </Button>

                    <Typography textAlign="center" sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button
                          sx={{ color: "#3f85f7", textTransform: "none", fontSize: "0.9rem" }}
                          onClick={() => navigate("/register")}
                        >
                          New Register?
                        </Button>

                        <Button
                          sx={{ color: "#3f85f7", textTransform: "none", fontSize: "0.9rem" }}
                          onClick={() => {
                            setForgotPassword(true);
                            setOtpSent(false);
                            setOtpVerified(false);
                          }}
                        >
                          Forgot Password?
                        </Button>
                      </Box>
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
