function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Pad single digit seconds with a leading zero
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }

    return `${minutes}:${remainingSeconds}`;
}

// Example usage:
let timeInSeconds = 125;
let formattedTime = formatTime(timeInSeconds);
console.log(formattedTime);  // Output: "2:05"
