import axios from "axios";

const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

function fetchWikipediaPage(name, setDebugInfo) {
    setDebugInfo(`Fetching Wikipedia page for "${name}"...`);

    const apiUrl = `${WIKIPEDIA_API_URL}?action=query&format=json&origin=*&prop=extracts&explaintext=true&titles=${name}`;

    return axios
        .get(apiUrl)
        .then((response) => {
            const pages = response.data?.query?.pages;

            if (!pages || Object.keys(pages).length === 0) {
                setDebugInfo(`Error: Wikipedia API returned no pages for "${name}".`);
                throw new Error(`No pages found for "${name}".`);
            }

            const firstPage = Object.values(pages)[0];

            if (!firstPage || firstPage.pageid === "-1") {
                setDebugInfo(`Error: Wikipedia page for "${name}" not found.`);
                throw new Error(`Wikipedia page for "${name}" not found.`);
            }

            // Extract full content from the page
            let content = firstPage.extract || "No content available.";
            content = content.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
            if (content.length > 6000) content = content.substring(0, 6000);

            // Return content
            return { content };
        })
        .catch((error) => {
            console.error("Wikipedia API Error:", error.message);
            setDebugInfo(`Error fetching Wikipedia page for "${name}": ${error.message}`);
            return { content: null };
        });
}

function processWithOpenAI(content, name, apiKey, setDebugInfo) {
    setDebugInfo(`Sending request to OpenAI for processing "${name}"...`);

    return axios
        .post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "Analyze the following Wikipedia content." },
                    {
                        role: "user",
                        content: `Analyze the following Wikipedia content about ${name} and extract the following information in the exact format:
                        {
                            "name": "<Name of the person, using only first and last common names>",
                            "imageUrl": "<URL of the person's profile image>",
                            "contribution": "<Contributions to the field of Computer Science>",
                            "importance": "<Description of the importance of their work>",
                            "politicalInfluence": "<Political influence in the field>"
                        }

                        \n\n${content}`,
                    },
                ],
                max_tokens: 6000,
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
            const message = choices?.[0]?.message;
            const extractedContent = message?.content?.trim() || null;

            // Check the type of extractedContent before parsing it
            console.log("Raw response from OpenAI:", extractedContent);
            console.log("Type of extractedContent:", typeof extractedContent);

            // If extractedContent is already an object, no need to parse it
            if (typeof extractedContent === 'object') {
                return extractedContent;  // Return directly if it's already an object
            }

            // Attempt to parse the returned JSON content into the structure
            try {
                // const parsedContent = JSON.parse(extractedContent);
                // console.log("Parsed Content:", parsedContent);
                return extractedContent;
            } catch (error) {
                console.error("Error parsing OpenAI response:", error);
                setDebugInfo("Error: Unable to parse the response from OpenAI.");
                return null;
            }
        })
        .catch((error) => {
            console.error("OpenAI API Error Details:", error.response?.data || error.message);
            setDebugInfo(`OpenAI API error for "${name}": ${error.message}`);
            return null;
        });
}

export default function processNames(names, apiKey, setDebugInfo) {
    if (!names || names.length === 0) {
        setDebugInfo("No names provided for processing.");
        throw new Error("No names provided");
    }

    if (!apiKey) {
        setDebugInfo("API key is missing.");
        throw new Error("API key is missing");
    }

    let results = [];

    return names
        .reduce((promiseChain, name) => {
            return promiseChain.then(() =>
                fetchWikipediaPage(name, setDebugInfo)
                    .then(({ content }) => {
                        if (!content) return null;

                        return processWithOpenAI(content, name, apiKey, setDebugInfo).then((processedData) => {
                            if (processedData) {
                                results.push(JSON.parse(processedData)); // Add processed data to results
                            }
                        });
                    })
                    .catch((error) => {
                        setDebugInfo(`Error processing "${name}": ${error.message}`);
                    })
            );
        }, Promise.resolve())
        .then(() => results);
}