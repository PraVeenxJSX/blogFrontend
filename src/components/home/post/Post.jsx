import { styled, Box, Typography, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { format } from 'date-fns';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

const StyledCardMedia = styled(CardMedia)({
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const CategoryChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.light + '20',
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.light + '40',
    },
}));

const Post = ({ post }) => {
    const url = post.picture || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    const addEllipsis = (str, limit) => {
        if (!str) return '';
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    };

    const formatDate = (date) => {
        try {
            return format(new Date(date), 'MMM dd, yyyy');
        } catch (error) {
            return 'Invalid date';
        }
    };

    const getCategories = () => {
        if (!post.categories) return [];
        if (typeof post.categories === 'string') {
            return post.categories.split(',').map(cat => cat.trim()).filter(Boolean);
        }
        if (Array.isArray(post.categories)) {
            return post.categories;
        }
        return [];
    };

    return (
        <StyledCard>
            <StyledCardMedia
                image={url}
                title={post.title}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {getCategories().map((category, index) => (
                        <CategoryChip
                            key={index}
                            label={category}
                            size="small"
                        />
                    ))}
                </Box>
                
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                        mb: 1,
                    }}
                >
                    {addEllipsis(post.title, 50)}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        flexGrow: 1,
                    }}
                >
                    {addEllipsis(post.description, 120)}
                </Typography>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 'auto',
                    pt: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Typography variant="caption" color="text.secondary">
                        {post.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {formatDate(post.createdDate)}
                    </Typography>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default Post;