
// @ts-nocheck

document.addEventListener("DOMContentLoaded", () => {
    const puzzlePage = document.getElementById("puzzle-page");
    const birthdayPage = document.getElementById("birthday-page");
    const puzzleContainer = document.getElementById("puzzle-container");

    // Puzzle images setup
    const imageURL = "sanrio.png"; // URL of the Sanrio image to split
    let pieces = [];

    // Create and shuffle puzzle pieces
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = `url(${imageURL})`;
        piece.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
        piece.dataset.index = i;
        pieces.push(piece);
    }
    pieces = pieces.sort(() => Math.random() - 0.5); // Shuffle pieces

    // Add pieces to puzzle container
    pieces.forEach(piece => puzzleContainer.appendChild(piece));

    // Drag and drop functionality
    let draggedElement = null;

    puzzleContainer.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("puzzle-piece")) {
            draggedElement = e.target;
        }
    });

    puzzleContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    puzzleContainer.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("puzzle-piece")) {
            const draggedIndex = [...puzzleContainer.children].indexOf(draggedElement);
            const targetIndex = [...puzzleContainer.children].indexOf(e.target);

            puzzleContainer.insertBefore(draggedElement, e.target);
            puzzleContainer.insertBefore(e.target, puzzleContainer.children[draggedIndex]);
            
            checkPuzzleSolved();
        }
    });

    // Check if puzzle is solved
    function checkPuzzleSolved() {
        const currentOrder = [...puzzleContainer.children].map(child => child.dataset.index);
        const isSolved = currentOrder.every((value, index) => value == index);

        if (isSolved) {
            setTimeout(() => showBirthdayPage(), 500); // Show next page with delay
        }
    }

    // Show Birthday Page
    function showBirthdayPage() {
        puzzlePage.classList.remove("active");
        birthdayPage.classList.add("active");
    }

    // Initialize first page
    puzzlePage.classList.add("active");
});
