import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
    },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
    width: 64,
    height: 64,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
}));

const About = () => {
    const features = [
        {
            icon: <EmojiObjectsIcon sx={{ fontSize: 32 }} />,
            title: 'Creative Freedom',
            description: 'Express yourself freely with our intuitive writing tools and rich formatting options.',
        },
        {
            icon: <PeopleIcon sx={{ fontSize: 32 }} />,
            title: 'Community Driven',
            description: 'Connect with like-minded writers and readers in a supportive environment.',
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 32 }} />,
            title: 'Fast & Responsive',
            description: 'Enjoy a seamless experience with our optimized platform performance.',
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 32 }} />,
            title: 'Secure Platform',
            description: 'Your content and data are protected with enterprise-grade security.',
        },
    ];

    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                {/* Mission Section */}
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Our Mission
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        We're on a mission to empower writers and creators to share their stories with the world.
                        Our platform provides the tools and community support needed to make your voice heard.
                    </Typography>
                </Box>

                {/* Features Section */}
                <Box>
                    <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
                        Why Choose Us
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <StyledPaper elevation={2}>
                                    <FeatureIcon>
                                        {feature.icon}
                                    </FeatureIcon>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </StyledPaper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default About;