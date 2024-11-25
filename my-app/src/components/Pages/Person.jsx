import React, { useState } from "react";
import axios from "axios";
import './Person.css';

const Person = ({ name, imageUrl, contribution, importance, politicalInfluence, apiKey }) => {
    // const name_string = name.toString();
    // const contribution_string = contribution.toString();
    // const importance_string = importance.toString();
    // const politicalInfluence_string = politicalInfluence.toString();
    const prompt_from_descriptors = `Respond as if you are ${name}. Your contribution to the field of computer science is ${contribution}. Your importance is ${importance}. Your political influence is ${politicalInfluence}Answer as if you are ${name} using your historical knowledge and expertise. Please respond in 250 charters or less.`;
    const [text, setText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    const [personName, setPersonName] = useState(name);
    const [personaDescription, setPersonaDescription] = useState(
        prompt_from_descriptors
    );
    const [showChatBot, setShowChatBot] = useState(false);

    const handleToggleInfo = () => {
        setShowExtraInfo(!showExtraInfo);
    };

    const handleToggleChatBot = () => {
        setShowChatBot(!showChatBot);
    };

    const handleToggle = () => {
        setShowExtraInfo(!showExtraInfo);
    };

    // Function to handle OpenAI API request
    const handleChatBotResponse = async () => {
        if (!text) return;

        const apiUrl = "https://api.openai.com/v1/chat/completions";

        // Prompt engineering for Alan Turing persona
        const messages = [
            {
                role: "system",
                content: prompt_from_descriptors,
            },
            {
                role: "user",
                content: text,
            },
        ];

        try {
            const response = await axios.post(
                apiUrl,
                {
                    model: "gpt-4o-mini",
                    messages: messages,
                    max_tokens: 150,
                    temperature: 0.7,
                    top_p: 1,
                    n: 1,
                    stop: ['\n'],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const botReply = response.data.choices[0]?.message?.content || "No response from AI";
            setOutputText(botReply);
        } catch (error) {
            console.error("Error fetching response from OpenAI:", error);
            setOutputText("Error fetching response. Please try again.");
        }
    };

    return (
        <div className="person-container">
            <div className="person-picture">
                <img src={imageUrl} alt={`${name} Picture`}/>
            </div>
            <h1>{name}</h1>

            {/* Show More Info / Less Info Toggle */}
            <button className="toggle-btn" onClick={handleToggleInfo}>
                {showExtraInfo ? 'Hide Info' : 'Show More Info'}
            </button>

            {showExtraInfo && (
                <div className="extra-info">
                    <h3>Contribution</h3>
                    <textarea className="readonly-textarea" value={contribution} readOnly/>
                    <h3>Importance</h3>
                    <textarea className="readonly-textarea" value={importance} readOnly/>
                    <h3>Political Influence</h3>
                    <textarea className="readonly-textarea" value={politicalInfluence} readOnly/>
                </div>
            )}

            <div className="chat-toggle-container">
                <button className="chat-toggle-btn" onClick={handleToggleChatBot}>
                    Chat with {name}
                </button>
            </div>

            {showChatBot && (
                <div className="chatbot-container">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="5"
                        className="input-textarea"
                        placeholder={`Ask ${name} a question...`}
                    />
                    <button className="dialog-btn" onClick={handleChatBotResponse}>
                        Ask {name}
                    </button>
                    <h3>Response:</h3>
                    <div className="reply-area">
                        <p>{outputText}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Person;