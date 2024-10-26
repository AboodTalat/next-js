 "use client"
// import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// let socket;

// export default function Chat() {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isJoined, setIsJoined] = useState(false);

//   useEffect(() => {
//     // Connect to the WebSocket server
//     socket = io('http://localhost:4000');

//     // Listen for messages from the server
//     socket.on('chatMessage', (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the socket connection when the component is unmounted
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const joinChat = () => {
//     if (username.trim()) {
//       socket.emit('joinChat', username);
//       setIsJoined(true);
//     }
//   };

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit('chatMessage', message);
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Application</h1>

//       {!isJoined ? (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <button onClick={joinChat}>Join Chat</button>
//         </div>
//       ) : (
//         <div>
//           <div>
//             {messages.map((msg, index) =>
//               typeof msg === 'string' ? (
//                 <p key={index} className="system-message">
//                   {msg}
//                 </p>
//               ) : (
//                 <p key={index}>
//                   <strong>{msg.username}</strong>: {msg.message}
//                 </p>
//               )
//             )}
//           </div>

//           <input
//             type="text"
//             placeholder="Type a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }
