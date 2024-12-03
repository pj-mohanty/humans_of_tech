import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Person.css';
import '../../App.css'

function Person({ name, imageUrl, contribution, importance, politicalInfluence, apiKey }){
    const prompt_from_descriptors = `Respond as if you are ${name}. Your contribution to the field of computer science is ${contribution}. Your importance is ${importance}. Your political influence is ${politicalInfluence}Answer as if you are ${name} using your historical knowledge and expertise. Please respond in 250 charters or less.`;
    const [text, setText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    const [showChatBot, setShowChatBot] = useState(false);
    const [bgColor, setBgColor] = useState('#ffffff'); // Default background color
    const containerRef = useRef(null);

    // Function to adjust a color to a pastel shade
    const adjustToPastel = (r, g, b) => {
        // Lighten the color by blending it with white
        function consistentColorChange(color) {
            const colorAsProportion = Math.pow(10.0, color / 255.0);
            const colorMod = 255 * Math.exp(-1.0 / colorAsProportion);
            const threshold = 154;
            const transitionSmooth = 160; // Increase (10) for more transition smoothness

            // Smooth transition factor (sigmoid-like transition)
            const transitionFactor = 1 / (1 + Math.exp((color - threshold) / transitionSmooth));

            // Blend the two outputs using the transition factor
            const blendedColor = (1 - transitionFactor) * (255 - colorMod) + transitionFactor * colorMod;

            return Math.min(Math.max(0, blendedColor), 255);
        }

        const lightenedR = consistentColorChange(r);
        const lightenedG = consistentColorChange(g);
        const lightenedB = consistentColorChange(b);
        return `rgb(${lightenedR}, ${lightenedG}, ${lightenedB})`;
    };

// Function to extract the dominant color efficiently
    const extractDominantColor = (image, sampleRate = 10) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;

        try {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const { data } = imageData;

            const colorCounts = new Map();
            let maxColor = [0, 0, 0];
            let maxCount = 0;

            // Sample every nth pixel to reduce processing time
            for (let i = 0; i < data.length; i += 4 * sampleRate) {
                const rgb = [data[i], data[i + 1], data[i + 2]];
                const rgbKey = rgb.join(',');

                colorCounts.set(rgbKey, (colorCounts.get(rgbKey) || 0) + 1);

                if (colorCounts.get(rgbKey) > maxCount) {
                    maxCount = colorCounts.get(rgbKey);
                    maxColor = rgb;
                }
            }

            return adjustToPastel(...maxColor);
        } catch (error) {
            console.error("Failed to extract color due to a tainted canvas:", error);
            return "#ffffff"; // Fallback to white if there's an error
        }
    };

// React useEffect hook for setting background color
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Attempt a CORS request
        img.src = imageUrl;

        img.onload = () => {
            const dominantColor = extractDominantColor(img);
            setBgColor(dominantColor);

            if (containerRef.current) {
                containerRef.current.style.backgroundColor = dominantColor;
            }
        };

        img.onerror = () => {
            console.error("Failed to load image or cross-origin issue.");
        };
    }, [imageUrl]);

    const handleToggleInfo = () => {
        setShowExtraInfo(!showExtraInfo);
    };

    const handleToggleChatBot = () => {
        setShowChatBot(!showChatBot);
    };

    // Simplified ChatBot response function
    const handleChatBotResponse = () => {
        if (!text) return;

        const apiUrl = "https://api.openai.com/v1/chat/completions";
        const messages = [
            { role: "system", content: prompt_from_descriptors },
            { role: "user", content: text },
        ];

        axios
            .post(
                apiUrl,
                {
                    model: "gpt-4o-mini",
                    messages,
                    max_tokens: 256,
                    temperature: 0.7,
                    top_p: 1,
                    n: 1,
                    stop: ["\n"],
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { choices } = response.data;
                const message = choices?.[0]?.message?.content?.trim() || "";
                setOutputText(message);
            })
            .catch((error) => {
                console.error("Error fetching response from OpenAI:", error);
                setOutputText("Error fetching response. Please try again.");
            });
    };

    return (
        <div className="person-container" ref={containerRef}>
            <div className="person-picture">
                <img src={imageUrl} alt={`${name} Picture`} />
            </div>
            <div className="person-name">
                <h1>{name}</h1>
            </div>

            {/* Show More Info / Less Info Toggle */}
            <button className="toggle-btn" onClick={handleToggleInfo}>
                {showExtraInfo ? "Hide Info" : "Show More Info"}
            </button>

            {showExtraInfo && (
                <div className="extra-info">
                    <h3>Contribution</h3>
                    <textarea className="readonly-textarea" value={contribution} readOnly />
                    <h3>Importance</h3>
                    <textarea className="readonly-textarea" value={importance} readOnly />
                    <h3>Political Influence</h3>
                    <textarea className="readonly-textarea" value={politicalInfluence} readOnly />
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