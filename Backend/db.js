const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        console.log('Connected db success.');
    } catch (err) {
        console.error('Error connecting to db:', err.message);
    }
}

main();
