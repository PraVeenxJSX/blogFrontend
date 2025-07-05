import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../../../service/api';


//components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            try {
                setLoading(true);
                setError(null);
                const response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    setError('Failed to fetch posts');
                }
            } catch (err) {
                setError('An error occurred while fetching posts');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!posts?.length) {
        return (
            <Box sx={{ 
                p: 4, 
                textAlign: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1
            }}>
                <Typography variant="h6" color="text.secondary">
                    No posts available for the selected category
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {posts.map(post => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                    <Link 
                        to={`details/${post._id}`}
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                            display: 'block',
                            height: '100%'
                        }}
                    >
                        <Post post={post} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;