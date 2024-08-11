'use client'
import { useState } from "react";
import { Stack, Box, TextField, Button } from "@mui/material";
import { marked } from 'marked';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi, I'm the Headstarter Support Agent, how can I assist you today?`,
    },
  ]);

  const [message, setMessage] = useState('');

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
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
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
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}