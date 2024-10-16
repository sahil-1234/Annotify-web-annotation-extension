// Handle when the user clicks the "Highlight" button
document.getElementById("highlight-btn").addEventListener("click", () => {
  const selectedText = document.getElementById("selected-text").value;

  // Send a message to the content script to highlight the selected text
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "highlightText",
      text: selectedText
    });
  });
});

// Handle when the user clicks the "Add Comment" button
document.getElementById("comment-btn").addEventListener("click", () => {
  const comment = document.getElementById("comment-text").value;
  const color = document.getElementById("comment-color").value || "#FFFFE0";
  const imageFile = document.getElementById("image-upload").files[0];

  if (comment.length === 0) return;

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      sendComment(comment, color, reader.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    sendComment(comment, color);
  }
});

function sendComment(comment, color, image = null) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "addComment",
      comment: comment,
      color: color,
      image: image
    });
  });
}
