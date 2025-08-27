
const logger = require('../utils/logger');
const { isPalindrome, reverseString, getWordCount, getVowelCount, getUniqueCharacters } = require('./stringManupulation');
const inputCount = new Map();

// Helper functions
function updateSeenStrings(input) {
    logger.info(`Updating seen strings with input: "${input}"`);
    inputCount.set(input, (inputCount.get(input) || 0) + 1);
}


function getStringinateResponse(input) {
    updateSeenStrings(input);
    logger.debug(`Generating stringinate response for input: "${input}"`);
    const { char, count } = findMostFrequentChar(input);

    return {
        input: input,
        length: input.length,
        mostFrequentCharacter: {
            char: char,
            count: count
        },

        isPalindrome: isPalindrome(input),
        reversed: reverseString(input),
        wordCount: getWordCount(input),
        vowelCount: getVowelCount(input),
        uniqueCharacters: getUniqueCharacters(input)

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
    logger.debug(`Stats computed: mostPopularString="${mostPopularString}", longestString="${longestString}"`);
    return {
        inputs: inputsObject,
        most_popular: mostPopularString,
        longest_input_received: longestString
    };
}



function findMostFrequentChar(str) {
    if (!str) return { char: '', count: 0 };
    logger.debug(`Finding most frequent character in string: "${str}"`);
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
    logger.debug(`Most frequent character: "${maxChar}" with count: ${maxCount}`);

    return { char: maxChar, count: maxCount };
}




module.exports = {
    updateSeenStrings,
    getStatsResponse,
    getStringinateResponse,
    // Export individual string manipulation functions for reuse
    isPalindrome,
    reverseString,
    getWordCount,
    getVowelCount,
    getUniqueCharacters
}