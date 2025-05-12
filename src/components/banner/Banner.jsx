import { styled, Box, Typography, Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';

const BannerContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    background: `linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%), 
                 url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/cover`,
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '150px',
        background: 'linear-gradient(to top, ' + theme.palette.background.default + ', transparent)',
    }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
    }
}));

const FeatureCard = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    }
}));

const Banner = () => {
    return (
        <BannerContainer>
            <ContentWrapper>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h1"
                            sx={{
                                color: 'white',
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 2,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            Share Your Story with the World
                        </Typography>
                        
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontWeight: 400,
                                mb: 4,
                                maxWidth: '600px',
                            }}
                        >
                            Join our community of writers and share your thoughts, experiences, and knowledge with readers around the globe.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <StyledButton
                                component={Link}
                                to="/create"
                                variant="contained"
                                color="secondary"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ 
                                    backgroundColor: 'white',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    }
                                }}
                            >
                                Start Writing
                            </StyledButton>
                            
                            <StyledButton
                                component={Link}
                                to="/"
                                variant="outlined"
                                sx={{ 
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                Explore Posts
                            </StyledButton>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FeatureCard>
                                    <SearchIcon sx={{ fontSize: 40, mb: 2 }} />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Discover Stories
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Explore thousands of articles across various topics
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                            <Grid item xs={6}>
                                <FeatureCard>
                                    <TrendingUpIcon sx={{ fontSize: 40, mb: 2 }} />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Trending Topics
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Stay updated with the latest trends
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                            <Grid item xs={6}>
                                <FeatureCard>
                                    <PeopleIcon sx={{ fontSize: 40, mb: 2 }} />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Join Community
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Connect with like-minded writers
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ContentWrapper>
        </BannerContainer>
    );
};

export default Banner;