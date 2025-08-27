

const inputCount = {}

// Helper functions
function updateSeenStrings(input) {
    inputCount[input] = (inputCount[input] || 0) + 1;
}

function getStringinateResponse(input) {
    return {
        input: input,
        length: input.length,
    };
}

function getStatsResponse() {
      return {
        inputs: inputCount
    };
}

module.exports = {
    updateSeenStrings,
    getStatsResponse,
    getStringinateResponse
}