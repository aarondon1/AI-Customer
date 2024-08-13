import React from 'react';
import { Box, Typography, Button, TextField, Container } from "@mui/material";

const Footer = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        alert('Form submitted!');
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#1d1d1d',
                color: 'white',
                py: 4,
                px: { xs: 2, md: 4 },
                borderTop: '1px solid #333',
                mt: 4,
                position: 'relative', // Ensure z-index works
                paddingBottom: '100px', // Add padding to the bottom to create space for the chatbot
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h5" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mx: 'auto',
                        maxWidth: '600px',
                    }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ bgcolor: 'white', borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: 'transparent' } } }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ bgcolor: 'white', borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: 'transparent' } } }}
                    />
                    <TextField
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ bgcolor: 'white', borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: 'transparent' } } }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 2,
                            fontSize: '1.2rem',
                            mt: 2,
                            boxShadow: 3,
                            '&:hover': { bgcolor: '#a41b6e' },
                        }}
                    >
                        Send Message
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;