const axios = require('axios');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const URL = "https://jsonplaceholder.typicode.com";

const generateCSV = async () => {
    const outputFolder = path.join(__dirname, '../../output');
    const filePath = path.join(outputFolder, 'data.csv');

    try {
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        const usersData = await axios.get(`${URL}/users`);
        const postsData = await axios.get(`${URL}/posts`);
        const commentsData = await axios.get(`${URL}/comments`);

        const users = usersData.data;
        const posts = postsData.data;
        const comments = commentsData.data;

        const postsArray = [];
        const commentsArray = [];

        posts.forEach(post => {
            postsArray[post.id] = post.title;
        });

        comments.forEach(comment => {
           
            commentsArray[comment.id] = comment.body;
        });



        const data = users.map(user => {
            const title = postsArray[user.id] ;
            const body = commentsArray[user.id] ;

            return {
                name: user.name,
                title,
                body,
            };
        });


        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                { id: 'name', title: 'Name' },
                { id: 'title', title: 'Title' },
                { id: 'body', title: 'Body' },
            ],
        });

        await csvWriter.writeRecords(data);

        return filePath;
    } catch (error) {
        console.error('Error generating CSV:', error.message);
        throw new Error(error.message);
    }
};

module.exports = { generateCSV };
