import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Snackbar,
    Alert,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const ContactForm = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}));

const ContactInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateX(8px)',
    },
}));

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        setSnackbar({
            open: true,
            message: 'Thank you for your message! We will get back to you soon.',
            severity: 'success',
        });
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    sx={{
                        mb: 6,
                        textAlign: 'center',
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Get in Touch
                </Typography>

                <Grid container spacing={6}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={7}>
                        <ContactForm>
                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                                Send us a Message
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Your Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            endIcon={<SendIcon />}
                                            sx={{
                                                py: 1.5,
                                                px: 4,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </ContactForm>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} md={5}>
                        <Box>
                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                                Contact Information
                            </Typography>
                            
                            <ContactInfo>
                                <LocationOnIcon color="primary" sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Our Location
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        123 Blog Street, Digital City, 12345
                                    </Typography>
                                </Box>
                            </ContactInfo>

                            <ContactInfo>
                                <EmailIcon color="primary" sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Email Us
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        contact@blogspace.com
                                    </Typography>
                                </Box>
                            </ContactInfo>

                            <ContactInfo>
                                <PhoneIcon color="primary" sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Call Us
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        +1 (555) 123-4567
                                    </Typography>
                                </Box>
                            </ContactInfo>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Contact;