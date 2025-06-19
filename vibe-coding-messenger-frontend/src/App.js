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
    const textareaRef = useRef(null);

    useEffect(() => {
        const savedMessages = sessionStorage.getItem("chatMessages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (!formJson.messageContent?.trim()) return; // Don't submit empty messages

        if (formJson.chatterName && formJson.chatterName !== "Anonymous") {
            sessionStorage.setItem("chatterName", formJson.chatterName);
        }

        const newMessage = {
            name: formJson.chatterName || "Anonymous",
            content: formJson.messageContent,
            timestamp: new Date().toLocaleTimeString(),
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

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