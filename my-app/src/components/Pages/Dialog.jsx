import React from 'react';
import './Dialog.css';

export default function Dialog({ text, setText, outputText, setOutputText }) {
    const handleButtonClick = () => {
        setOutputText("your words are brilliant: " + text);
    };

    // Function to handle OpenAI API request
    const handleChatBotResponse = async () => {
        if (!text) return;

        const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: text }],
                    max_tokens: 100,
                    temperature: 0.7,
                }),
            });

            const data = await response.json();
            const botReply = data.choices[0]?.message?.content || "No response from AI";
            setOutputText(botReply);
        } catch (error) {
            console.error("Error fetching response from OpenAI:", error);
            setOutputText("Error fetching response. Please try again.");
        }
    };

    function Prompt() {
        return (
            <div>
                <h1>React ChatBot</h1>
            </div>
        );
    }

    function UserInput({ text, setText }) {
        const handleChange = (event) => {
            setText(event.target.value);
        };

        return (
            <div>
                <h2>Enter Text</h2>
                <textarea
                    value={text}
                    onChange={handleChange}
                    rows="5"
                    cols="50"
                    placeholder="Enter your text here..."
                />
            </div>
        );
    }

    function SubmitButton({ handleClick, label }) {
        return (
            <div>
                <button className="dialog-btn" onClick={handleClick}>
                    {label}
                </button>
            </div>
        );
    }

    function ReplyArea({ text }) {
        return (
            <div>
                <div className="reply-area">{text}</div>
            </div>
        );
    }

    return (
        <div className="dialog-container">
            <Prompt />
            <UserInput text={text} setText={setText} />
            <SubmitButton handleClick={handleButtonClick} label="Echo Response" />
            <SubmitButton handleClick={handleChatBotResponse} label="Ask AI" />
            <ReplyArea text={outputText} />
        </div>
    );
}