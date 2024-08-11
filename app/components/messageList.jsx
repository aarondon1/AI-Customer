import React from 'react';
import { Box, Stack } from '@mui/material';
import { marked } from 'marked';

const renderContent = (content) => {
  return { __html: marked(content) };
};

const MessageList = ({ messages }) => (
  <Stack
    direction="column"
    spacing={2}
    flexGrow={1}
    overflow="auto"
    maxHeight="100%"
  >
    {messages.map((message, index) => (
      <Box
        key={index}
        display="flex"
        justifyContent={
          message.role === 'assistant' ? 'flex-start' : 'flex-end'
        }
      >
        <Box
          bgcolor={
            message.role === 'assistant' ? 'primary.main' : 'secondary.main'
          }
          color="white"
          borderRadius={16}
          p={3}
          dangerouslySetInnerHTML={renderContent(message.content)}
        />
      </Box>
    ))}
  </Stack>
);

export default MessageList;