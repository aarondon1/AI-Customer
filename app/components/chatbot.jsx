'use client'
import { useState } from "react";
import { Stack, Box, TextField, Button, IconButton, Typography, Avatar } from "@mui/material";
import { marked } from 'marked';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi, I'm the Headstarter Support Agent, this is a demo of what can be on your website. How can I assist you today?`,
    },
  ]);

  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === '') {
      console.log("Message is empty");
      return;
    }

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" }
    ]);

    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", response.status, errorText);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      const processText = async ({ done, value }) => {
        if (done) return result;

        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);

          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            }
          ];
        });
        return reader.read().then(processText);
      };

      await reader.read().then(processText);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderContent = (content) => {
    return { __html: marked(content) };
  };

  return (
    <Box>
      {/* Chatbot Toggle Button */}
      <IconButton
        onClick={toggleChatbot}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          width: '85px',
          height: '85px',
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' }
        }}
      >
        {isOpen ? <CloseIcon fontSize="large" /> : <ChatIcon fontSize="large" />}
      </IconButton>

      {/* Chatbot UI */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 120,
            right: 16,
            width: '600px',
            height: '600px',
            border: '1px solid black',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          {}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 1,
              border: '1px solid #ccc', 
              borderRadius: '8px',
              bgcolor: 'background.default',
            }}
          >
            <Avatar
              src="/images/avatar.png" 
              alt="HeadstarterAI"
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Typography variant="h6">
              HeadstarterAI Conversation
            </Typography>
          </Box>

          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
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
                  p={2}
                  sx={{ fontSize: '1.1rem' }}
                  dangerouslySetInnerHTML={renderContent(message.content)}
                />
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ fontSize: '1.0rem' }}
              InputProps={{ style: { fontSize: '1.0rem' } }} 
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{ fontSize: '1.1rem', borderRadius:"16px"}} 
            >
              Send
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Chatbot;