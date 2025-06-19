import './App.css';
import { useState, useEffect, useRef } from 'react';

// Message component remains the same
function Message({ name, content, timestamp }) {
    return (
        <div className="message">
            <div className="message-header">
                <span className="message-name">{name}</span>
                <span className="message-time">{timestamp}</span>
            </div>
            <div className="message-content">{content}</div>
        </div>
    );
}

export default function WriteMessage() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('ws://localhost:8080/ws');
        setSocket(ws);

        // Load saved messages
        const savedMessages = sessionStorage.getItem("chatMessages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        // WebSocket event handlers
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            const newMessage = {
                name: "Server",
                content: event.data,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prev => [...prev, newMessage]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        // Clean up on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (!formJson.messageContent?.trim()) return;

        if (formJson.chatterName && formJson.chatterName !== "Anonymous") {
            sessionStorage.setItem("chatterName", formJson.chatterName);
        }

        const newMessage = {
            name: formJson.chatterName || "Anonymous",
            content: formJson.messageContent,
            timestamp: new Date().toLocaleTimeString(),
        };

        // Send message via WebSocket
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(newMessage.content);
        }

        // Update local state
        setMessages(prev => [...prev, newMessage]);
        sessionStorage.setItem("chatMessages", JSON.stringify([...messages, newMessage]));

        form.reset();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.target.form;
            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const getValueFromSession = () => {
        return sessionStorage.getItem("chatterName") || "Anonymous";
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <Message
                            key={index}
                            name={message.name}
                            content={message.content}
                            timestamp={message.timestamp}
                        />
                    ))
                ) : (
                    <div className="no-messages">No messages yet. Start the conversation!</div>
                )}
            </div>

            <form method="post" onSubmit={handleSubmit} className="message-form">
                <label className="name-label">
                    Name: <input name="chatterName" defaultValue={getValueFromSession()} />
                </label>
                <div className="textarea-container">
                    <label className="message-label">Write message</label>
                    <textarea
                        ref={textareaRef}
                        name="messageContent"
                        rows={4}
                        cols={40}
                        required
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}