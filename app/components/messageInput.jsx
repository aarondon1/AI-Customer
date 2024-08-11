import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

const MessageInput = ({ message, setMessage, sendMessage }) => (
  <Stack direction="row" spacing={2}>
    <TextField
      label="Message"
      fullWidth
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <Button variant="contained" onClick={sendMessage}>Send</Button>
  </Stack>
);

export default MessageInput;