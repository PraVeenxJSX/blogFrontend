import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, Container, Paper, InputAdornment, IconButton, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const LoginContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: 400,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    },
}));

const Logo = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    fontSize: '2rem',
    background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius,
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const LoginButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    marginTop: theme.spacing(2),
}));

const SignupButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
}));

const Login = ({ isUserAuthenticated }) => {
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);
    const [account, toggleAccount] = useState('login');
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });
    const [signup, setSignup] = useState({
        name: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setError('');
    }, [login, signup]);

    const handleChange = (e) => {
        if (account === 'login') {
            setLogin({ ...login, [e.target.name]: e.target.value });
        } else {
            setSignup({ ...signup, [e.target.name]: e.target.value });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const loginUser = async () => {
        try {
            const response = await API.userLogin(login);
            if (response.isSuccess) {
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                isUserAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup({ name: '', username: '', password: '' });
                toggleAccount('login');
                setError('Account created successfully! Please login.');
            } else if (response.isError) {
                setError(response.msg);
            } else {
                setError('Something went wrong! Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.msg || 'Something went wrong! Please try again.');
        }
    };

    const toggleSignup = () => {
        toggleAccount(account === 'signup' ? 'login' : 'signup');
        setError('');
        // Clear form data when switching
        if (account === 'signup') {
            setSignup({ name: '', username: '', password: '' });
        } else {
            setLogin({ username: '', password: '' });
        }
    };

    return (
        <LoginContainer>
            <LoginCard elevation={3}>
                <Logo>BlogSpace</Logo>
                
                {error && (
                    <Alert 
                        severity={error.includes('successfully') ? 'success' : 'error'} 
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                {account === 'login' ? (
                    <>
                        <StyledTextField
                            variant="outlined"
                            label="Username"
                            name="username"
                            value={login.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <StyledTextField
                            variant="outlined"
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={login.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LoginButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={loginUser}
                        >
                            Sign In
                        </LoginButton>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Don't have an account?
                            </Typography>
                            <SignupButton
                                fullWidth
                                onClick={toggleSignup}
                            >
                                Create Account
                            </SignupButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <StyledTextField
                            variant="outlined"
                            label="Name"
                            name="name"
                            value={signup.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <StyledTextField
                            variant="outlined"
                            label="Username"
                            name="username"
                            value={signup.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <StyledTextField
                            variant="outlined"
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={signup.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LoginButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={signupUser}
                        >
                            Sign Up
                        </LoginButton>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Already have an account?
                            </Typography>
                            <SignupButton
                                fullWidth
                                onClick={toggleSignup}
                            >
                                Sign In
                            </SignupButton>
                        </Box>
                    </>
                )}
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;