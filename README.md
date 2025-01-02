# Humans_of_Technology

## How to run
1. Download code from GitHub
2. Run 'npm install' to install dependencies
3. Add your own OpenAI API Key to App.js, replacing the "demo" key existing currrently.
4. Similarly, one must add a Google Firebase key in LoginForm.js to make the user login section work properly.
5. Run 'npm start' to view the project

Watch this video on how to install properly: https://drive.google.com/file/d/1c9aAoKPr6I-pZa-LwHQfeTI1lkDY_0a7/view?usp=sharing

Due to limitations with uploading video and image files to Google Cloud, the complete project can be viewed from one's localhost in their brower. However, a version without the local images and videos can be viewed at this link (https://cs-514-project-5-frontend.wl.r.appspot.com), which still features the search and person muesaem display functionality.

## Project overview

Title: Humans of Technology - an exploration of the Politics and History of Computer Science
Central Idea: an interactive History Museum of important figures in the field of computer science. The site allows users to connect with historical figures through a brief history of their contributions to Computer Science, the importance of their work in the field, and their political influence in the world more broadly. Allow the user to chat with these historical figures via an OpenAI API-based chatbot.

## Data Description:

A front page of the functionalities of the museum, the central focus being a list of “cards” with names, pictures, and descriptions of historically important people.
A JSON file of names, pictures, and descriptions of several historically-important people in the field of Computer Science, with information taken mostly from Wikipedia, and partially from ChatGPT.
Database exits in Google Cloud storage in a separate project from the frontend.

## AI Description:
Parts:
Used OpenAI API to parse Wikipedia API responses to create the JSON file described above. 
Used OpenAI API to create AI chatbots of each person with independent chat histories.

## Video Description:
Watch this video describing our project: https://drive.google.com/file/d/15N5qx4jVFbSSP5Epp280pP0AkqPs4BDC/view?usp=sharing
