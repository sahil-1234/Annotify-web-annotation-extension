// Function to highlight selected text manually
function highlightSelectedText(selectedText) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow"; // Set the highlight color
    span.textContent = selectedText;
    range.deleteContents();
    range.insertNode(span);
  }
}

// Function to add a comment to the page manually
function addCommentToPage(commentText, color, image) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const commentDiv = document.createElement("div");
    commentDiv.style.backgroundColor = color;
    commentDiv.style.border = "1px solid black";
    commentDiv.style.padding = "5px";
    commentDiv.textContent = commentText;

    // If there is an image, attach it to the comment
    if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.style.maxWidth = "100px";
      commentDiv.appendChild(img);
    }

    range.insertNode(commentDiv);
  }
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "highlightText") {
    highlightSelectedText(message.text); // Highlight selected text
  }

  if (message.action === "addComment") {
    const commentText = message.comment;
    const color = message.color || "#FFFFE0"; // Default comment color
    addCommentToPage(commentText, color, message.image);
  }
});
