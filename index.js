const axios = require('axios');
const consoleTable = require('console.table');

// Function to fetch all trading pairs and their prices
async function fetchTradingPairs() {
    try {
        // Get USDT pairs from the Gate.io API
        const response = await axios.get('https://api.gateio.ws/api/v4/futures/usdt/contracts');
        const pairs = response.data;

        console.log(`Total USDT Futures trading pairs: ${pairs.length}`);

        // Select 5 random pairs from the available pairs
        const randomPairs = getRandomItems(pairs, 5);
        console.log('Randomly selected pairs:', randomPairs.map(pair => pair.name));
        
        // Fetch prices for the selected random pairs
        const prices = randomPairs.map(pair => ({
            pair: pair.name,
            price: pair.last_price
        }));

        // Display the results in a table format
        console.table(prices);
    } catch (error) {
        console.error('Error fetching trading pairs or prices:', error);
    }
}

// Function to get random items from an array
function getRandomItems(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// Run the function to fetch trading pairs and prices
fetchTradingPairs();
