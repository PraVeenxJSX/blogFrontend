import React, { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import API from '../../service/api';

import { DataContext } from '../../context/DataProvider';

// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 1),
    maxWidth: 900,
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4, 3),
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6, 8),
    },
}));

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 'auto',
    maxHeight: '350px',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        maxHeight: '50vh',
    },
}));

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center',
    margin: theme.spacing(3, 0, 2, 0),
    [theme.breakpoints.up('sm')]: {
        fontSize: '2.5rem',
        margin: theme.spacing(5, 0, 2, 0),
    },
}));

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: theme.spacing(3, 0),
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    const deleteBlog = async () => {  
        await API.deletePost(post._id);
        navigate('/')
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;