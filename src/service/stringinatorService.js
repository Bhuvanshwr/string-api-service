

const inputCount = new Map();

// Helper functions
function updateSeenStrings(input) {
    inputCount.set(input, (inputCount.get(input) || 0) + 1);
}

function getStringinateResponse(input) {
    updateSeenStrings(input)
    const { char, count } = findMostFrequentChar(input);
    return {
        input: input,
        length: input.length,
        mostFrequentCharacter: {
            char: char,
            count: count
        }
    };
}

function getStatsResponse() {
    let mostPopularString = '';
    let mostPopularCount = 0;
    let longestString = '';

    if (inputCount.size === 0) {
        return { status: 'no stats found' };
    }
    // Find most popular and longest strings
    for (const [str, count] of inputCount.entries()) {
        // Track most popular
        if (count > mostPopularCount) {
            mostPopularString = str;
            mostPopularCount = count;
        }
        
        // Track longest
        if (str.length > (longestString?.length || 0)) {
            longestString = str;
        }
    }

    // Convert Map to plain object for JSON response
    const inputsObject = Object.fromEntries(inputCount);

    return {
        inputs: inputsObject,
        most_popular: mostPopularString,
        longest_input_received: longestString
    };
}



function findMostFrequentChar(str) {
    if (!str) return { char: '', count: 0 };

    const cleanStr = str.replace(/[\s\p{P}]/gu, '');
    if (!cleanStr) return { char: '', count: 0 };

    const charCount = {};
    for (const char of cleanStr) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    let maxChar = '';
    let maxCount = 0;
    for (const [char, count] of Object.entries(charCount)) {
        if (count > maxCount) {
            maxChar = char;
            maxCount = count;
        }
    }

    return { char: maxChar, count: maxCount };
}




module.exports = {
    updateSeenStrings,
    getStatsResponse,
    getStringinateResponse
}