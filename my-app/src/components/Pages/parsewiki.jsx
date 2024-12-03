import axios from "axios";

const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

function fetchWikipediaPage(name) {
    console.log(`Fetching Wikipedia page for "${name}"...`);

    const apiUrl = `${WIKIPEDIA_API_URL}?action=query&format=json&origin=*&prop=extracts&explaintext=true&titles=${name}`;

    return axios
        .get(apiUrl)
        .then((response) => {
            const pages = response.data?.query?.pages;

            if (!pages || Object.keys(pages).length === 0) {
                console.log(`Error: Wikipedia API returned no pages for "${name}".`);
                throw new Error(`No pages found for "${name}".`);
            }

            const firstPage = Object.values(pages)[0];

            if (!firstPage || firstPage.pageid === "-1") {
                console.log(`Error: Wikipedia page for "${name}" not found.`);
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
            console.log(`Error fetching Wikipedia page for "${name}": ${error.message}`);
            return { content: null };
        });
}

function processWithOpenAI(content, name, apiKey) {
    console.log(`Sending request to OpenAI for processing "${name}"...`);

    return axios
        .post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Analyze the following Wikipedia content." },
                    {
                        role: "user",
                        content: `Analyze the following Wikipedia content about ${name} and extract the following information in the exact format, presenting plain text only when complete:
                        {
                            "name": "<Name of the person, using only first and last common names>",
                            "imageUrl": "<URL of the person's profile image, unless the image cannot be found, in which case use this URL instead: https://cdn.arstechnica.net/wp-content/uploads/archive/bill-gates-outlook/outlook-default-person.png>",
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
                    Authorization: `Bearer ${apiKey.toString()}`,
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
                return extractedContent;
            } catch (error) {
                console.error("Error parsing OpenAI response:", error);
                console.log("Error: Unable to parse the response from OpenAI.");
                return null;
            }
        })
        .catch((error) => {
            console.error("OpenAI API Error Details:", error.response?.data || error.message);
            console.log(`OpenAI API error for "${name}": ${error.message}`);
            return null;
        });
}

export default function processNames(names, apiKey) {
    if (!names || names.length === 0) {
        console.log("No names provided for processing.");
        throw new Error("No names provided");
    }

    if (!apiKey) {
        console.log("API key is missing.");
        throw new Error("API key is missing");
    }

    let results = [];

    return names
        .reduce((promiseChain, name) => {
            return promiseChain.then(() =>
                fetchWikipediaPage(name)
                    .then(({ content }) => {
                        if (!content) return null;

                        return processWithOpenAI(content, name, apiKey).then((processedData) => {
                            if (processedData) {
                                results.push(JSON.parse(processedData)); // Add processed data to results
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(`Error processing "${name}": ${error.message}`);
                    })
            );
        }, Promise.resolve())
        .then(() => results);
}