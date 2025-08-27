const logger = require('../utils/logger');

function isPalindrome(str) {
    logger.debug(`Checking if string is palindrome: "${str}"`);
    const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

function reverseString(str) {
    logger.debug(`Reversing string: "${str}"`);
    return str.split('').reverse().join('');
}

function getWordCount(str) {
    logger.debug(`Counting words in string: "${str}"`);
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function getVowelCount(str) {
    logger.debug(`Counting vowels in string: "${str}"`);
    return (str.match(/[aeiou]/gi) || []).length;
}

function getUniqueCharacters(str) {
    logger.debug(`Getting unique characters in string: "${str}"`);
    return [...new Set(str.replace(/\s+/g, ''))].join('');
}

module.exports = {
    isPalindrome,   
    reverseString,
    getWordCount,
    getVowelCount,
    getUniqueCharacters
};