import { 
    Button, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    Paper, 
    Typography,
    Divider,
    useTheme
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { categories } from '../../constants/data';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const theme = useTheme();
    
    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Button
                component={Link}
                to={`/create?category=${category || ''}`}
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                sx={{ 
                    mb: 3,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600
                }}
            >
                Create Blog
            </Button>

            <Typography 
                variant="subtitle1" 
                sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    px: 1
                }}
            >
                Categories
            </Typography>

            <List sx={{ p: 0 }}>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        to="/"
                        selected={!category}
                        sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.primary.light + '20',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light + '30',
                                }
                            }
                        }}
                    >
                        <ListItemText 
                            primary="All Categories"
                            primaryTypographyProps={{
                                fontWeight: !category ? 600 : 400,
                                color: !category ? 'primary' : 'text.primary'
                            }}
                        />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 1 }} />

                {categories.map((cat) => (
                    <ListItem key={cat.id} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={`/?category=${cat.type}`}
                            selected={category === cat.type}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.primary.light + '20',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light + '30',
                                    }
                                }
                            }}
                        >
                            <ListItemText 
                                primary={cat.type}
                                primaryTypographyProps={{
                                    fontWeight: category === cat.type ? 600 : 400,
                                    color: category === cat.type ? 'primary' : 'text.primary'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Categories;