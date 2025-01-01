const resolutionInput = document.getElementById("resolutionInput");
const addResolutionButton = document.getElementById("addResolutionButton");
const resolutionsContainer = document.getElementById("resolutionsContainer");
const quoteElement = document.getElementById("quote");
const quotes = [
    "Dream big, work hard, stay focused, and surround yourself with good people.",
    "The best way to predict the future is to create it.",
    "Every new beginning comes from some other beginning's end.",
    "Do something today that your future self will thank you for.",
    "This year, be unstoppable!"
];
// Load resolutions from local storage
let resolutions = JSON.parse(localStorage.getItem("resolutions")) || [];
// Display resolutions on page load
displayResolutions();
// Add resolution functionality
addResolutionButton.addEventListener("click", () => {
    const resolution = resolutionInput.value.trim();
    if (resolution) {
        const newResolution = { text: resolution, completed: false };
        resolutions.push(newResolution);
        saveToLocalStorage();
        displayResolutions();
        resolutionInput.value = "";
        // Show a random motivational quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = `💡 ${randomQuote}`;
    }
});
// Save resolutions to local storage
function saveToLocalStorage() {
    localStorage.setItem("resolutions", JSON.stringify(resolutions));
}
// Display resolutions
function displayResolutions() {
    resolutionsContainer.innerHTML = "";
    resolutions.forEach((res, index) => {
        const div = document.createElement("div");
        div.className = "resolution";
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = res.completed;
        // Toggle resolution completion
        checkbox.addEventListener("change", () => {
            res.completed = checkbox.checked;
            if (res.completed) {
                div.classList.add("completed");
            } else {
                div.classList.remove("completed");
            }
            saveToLocalStorage();
        });
        // Resolution text
        const text = document.createElement("span");
        text.textContent = `${res.text}`;
        // Add completed style if already checked
        if (res.completed) {
            div.classList.add("completed");
        }
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            resolutions.splice(index, 1); // Remove the resolution
            saveToLocalStorage();
            displayResolutions();
        });
        // Append checkbox, text, and delete button to div
        div.appendChild(checkbox);
        div.appendChild(text);
        div.appendChild(deleteButton);
        // Add resolution to container
        resolutionsContainer.appendChild(div);
    });
}
