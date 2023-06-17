const shredder = document.querySelector(".shredder");
const shredderBtn = document.querySelector(".shredder__btn");
const shredderText = document.querySelector(".shredder__text");
const shredderPaperOutput = document.querySelector(
    ".shredder__paper--output .shredder__paper-inner");

const shredDuration = 5100;

shredderBtn.addEventListener("click", () => {
    if (!shredder.classList.contains("shred")) {
        // Copy text from input paper to output paper
        const outputText = document.createElement("p");

        shredderText.removeAttribute("contenteditable");

        outputText.textContent = shredderText.textContent;

        shredderPaperOutput.appendChild(outputText);

        // Add class for shred transition
        shredder.classList.add("shred");

        // Add class to reset shredder button style
        setTimeout(() => shredder.classList.add("complete"), shredDuration);
    }
});

