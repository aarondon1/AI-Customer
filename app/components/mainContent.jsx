import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ChatBox from './ChatBox';

const MainContent = ({ initialShowChatBox }) => {
  const [showChatBox, setShowChatBox] = useState(initialShowChatBox);
  const [hydrated, setHydrated] = useState(false); // New state to track hydration

  useEffect(() => {
    setHydrated(true); // Mark the component as hydrated once the client-side JavaScript has loaded
  }, []);

  const handleButtonClick = () => {
    setShowChatBox(!showChatBox);
  };

  if (!hydrated) {
    return null; // Prevent rendering until hydration is complete
  }

  return (
    <Box
    display = "flex"
    flexDirection = "column"
    justifyContent = "center"
    >

    </Box>
  )
};

export default MainContent;

