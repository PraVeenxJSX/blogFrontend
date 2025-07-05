import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  styled, 
  Button, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
  boxShadow: 'none',
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4),
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.5rem',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  letterSpacing: '-0.02em',
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const StyledLink = styled(Link)(({ theme, active }) => ({
  color: active === 'true' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  fontWeight: active === 'true' ? 600 : 500,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 280 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
        <Typography variant="subtitle1" fontWeight={600}>
          User Name
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.main',
                }
              }
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem 
          button 
          onClick={() => navigate('/account')}
          sx={{ color: 'error.main' }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar>
        <Container maxWidth="xl">
          <StyledToolbar>
            <Logo component={Link} to="/">
              BlogNow
            </Logo>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <NavLinks>
                {menuItems.map((item) => (
                  <StyledLink
                    key={item.text}
                    to={item.path}
                    active={(location.pathname === item.path).toString()}
                  >
                    {item.text}
                  </StyledLink>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/create"
                  sx={{ 
                    ml: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  New Post
                </Button>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ 
                    ml: 2,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      minWidth: 180,
                    }
                  }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/account'); }}>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/account'); }}>
                    <ListItemText primary="Settings" />
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                    onClick={() => { handleMenuClose(); navigate('/account'); }}
                    sx={{ color: 'error.main' }}
                  >
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </NavLinks>
            )}
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
      <Toolbar /> {/* Spacer */}
    </>
  );
};

export default Header;