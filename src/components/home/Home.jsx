import { Grid, Box, Container, useTheme, useMediaQuery } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ 
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
        }}>
            <Banner />
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid 
                        item 
                        xs={12} 
                        sm={3} 
                        md={2}
                        sx={{
                            position: isMobile ? 'static' : 'sticky',
                            top: 80,
                            height: 'fit-content',
                        }}
                    >
                        <Categories />
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                        <Posts />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;