import React, { useState, useEffect, useContext } from 'react';
import { 
    Box, 
    styled, 
    TextField, 
    Button, 
    Typography, 
    Container, 
    Paper,
    CircularProgress,
    Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(2)
    }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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

const initialPost = {
    title: '',
    description: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { account } = useContext(DataContext);

    const [post, setPost] = useState(initialPost);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setPost(prev => ({
            ...prev,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [location.search, account.username]);

    const handleChange = (e) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const savePost = async () => {
        if (!post.title.trim()) {
            setError('Please enter a title');
            return;
        }
        if (!post.description.trim()) {
            setError('Please enter a description');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await API.createPost(post);
            if (response.isSuccess) {
                navigate('/');
            } else {
                setError('Failed to create post. Please try again.');
            }
        } catch (err) {
            setError('Error creating post. Please try again.');
            console.error('Create post error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledContainer maxWidth="md">
            <StyledPaper elevation={3}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Create New Post
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <StyledTextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />

                <StyledTextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={6}
                    required
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={savePost}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Publishing...' : 'Publish Post'}
                </Button>
            </StyledPaper>
        </StyledContainer>
    );
};

export default CreatePost;