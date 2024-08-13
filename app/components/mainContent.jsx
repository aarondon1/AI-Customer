import React from 'react';
import { Container, Box, Typography } from "@mui/material";
import { Typewriter } from 'react-simple-typewriter';

const PercentageTypewriter = ({ start, end }) => {
    const [percentage, setPercentage] = React.useState(start);

    React.useEffect(() => {
        if (percentage < end) {
            const timeout = setTimeout(() => setPercentage(percentage + 1), 50);
            return () => clearTimeout(timeout);
        }
    }, [percentage, end]);

    return (
        <span style={{ transition: 'all 0.5s ease-in-out', fontWeight: 'bold' }}>
            {percentage}%
        </span>
    );
};

const MainContent = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                bgcolor: '#121212',
                color: 'white',
                minHeight: '100vh',
                py: 4,
                background: 'linear-gradient(135deg, #121212, #1d1d1d)', // Gradient background
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                textAlign="center"
                px={2}
            >
                <Box mb={6} sx={{ borderBottom: '1px solid #333', pb: 3 }}>
                    <Typography
                        variant="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', mb: 2, letterSpacing: 1.5, fontSize: { xs: '2rem', md: '3rem' } }} // Increased font size
                    >
                        Want an AI chatbot for your business? Look no further!
                    </Typography>
                    <Typography variant="h5" align="center" color="grey.400" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                        <Typewriter
                            words={['Our AI chatbot solutions can help you automate customer support and increase satisfaction.']}
                            loop={1}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </Typography>
                </Box>
                <Box mb={1} sx={{ borderBottom: '1px solid #333', pb: 3 }}> {/* Decreased margin-bottom */}
                    {/* Add any additional content or images here if needed */}
                </Box>
                <Box>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 500, mt: 1, fontSize: { xs: '1.5rem', md: '2rem' } }} // Decreased margin-top
                    >
                        Virtual assistants reduce inquiries across calls, chats, and emails by <PercentageTypewriter start={0} end={70}/>
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 500, mt: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}
                    >
                        Individuals utilized bots for client support in the preceding year, with a usage rate of <PercentageTypewriter start={0} end={67}/>
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 500, mt: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}
                    >
                        Support satisfaction scores saw an increase due to digital assistants, rising by <PercentageTypewriter start={0} end={24}/>
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center"
                        marginTop={4}
                        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 500 }}
                    >
                        Try it out for yourself by clicking the icon in the bottom right!
                    </Typography>
                </Box>
                <Box mt={4}>
                    {/* Add any additional content or buttons here if needed */}
                </Box>
            </Box>
        </Container>
    );
};

export default MainContent;
