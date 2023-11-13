const proposalList = document.getElementById("proposal-list");
const selectedList = document.getElementById("selected-list");
const counter = document.getElementById("counter");

// Initialize the count of selected proposals
let selectedCount = 0;

// Add event listeners for drag-and-drop
proposalList.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
});

selectedList.addEventListener("dragover", (event) => {
    event.preventDefault();
});

selectedList.addEventListener("drop", (event) => {
    event.preventDefault();
    const proposalId = event.dataTransfer.getData("text/plain");

    // Check if the user hasn't exceeded the limit of 10 selected proposals
    if (selectedCount < 10) {
        const selectedProposal = document.querySelector(`[data-id="${proposalId}"]`);
        
        // Clone the proposal and add it to the right panel
        const clonedProposal = selectedProposal.cloneNode(true);
        selectedList.appendChild(clonedProposal);
        selectedCount++;

        // Update the counter
        counter.textContent = `Selected Proposals: ${selectedCount}/10`;

        // Hide the original proposal on the left
        selectedProposal.style.display = "none";

        // Add a click event listener to the selected proposal for removal
        clonedProposal.addEventListener("click", () => {
            selectedList.removeChild(clonedProposal);
            selectedCount--;

            // Update the counter after removal
            counter.textContent = `Selected Proposals: ${selectedCount}/10`;

            // Show the original proposal on the left
            selectedProposal.style.display = "inline-block";
        });
    }
});

// Add click event listeners to the selected proposals for removal
selectedList.addEventListener("click", (event) => {
    const selectedProposal = event.target;
    if (selectedProposal.tagName === "LI") {
        selectedList.removeChild(selectedProposal);
        selectedCount--;

        // Update the counter after removal
        counter.textContent = `Selected Proposals: ${selectedCount}/10`;

        // Find and show the corresponding original proposal on the left
        const originalProposal = proposalList.querySelector(`[data-id="${selectedProposal.dataset.id}"]`);
        originalProposal.style.display = "inline-block";
    }
});
