import './App.css';
import {useState, useEffect} from 'react';

// Message component to display individual messages
function Message({name, content, timestamp}) {
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

    // Load messages from sessionStorage on component mount
    useEffect(() => {
        const savedMessages = sessionStorage.getItem("chatMessages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // Save the name to sessionStorage if provided
        if (formJson.chatterName && formJson.chatterName !== "Anonymous") {
            sessionStorage.setItem("chatterName", formJson.chatterName);
        }

        // Create a new message object
        const newMessage = {
            name: formJson.chatterName || "Anonymous",
            content: formJson.messageContent,
            timestamp: new Date().toLocaleTimeString(),
        };

        // Update messages state and save to sessionStorage
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

        // Reset the message content field
        form.reset();
    }

    function getValueFromSession() {
        return sessionStorage.getItem("chatterName") || "Anonymous";
    }

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
                <label>
                    Name: <input name="chatterName" defaultValue={getValueFromSession()}/>
                </label>
                <label>
                    Write message >
                    <textarea
                        name="messageContent"
                        rows={4}
                        cols={40}
                        required
                    />
                </label>
                <hr/>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}