chrome.runtime.onInstalled.addListener(() => {
    console.log("Web Page Annotations extension installed.");
  });
  
  // Sync to MongoDB when annotations are made
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "syncAnnotations") {
      syncAnnotationsToMongoDB(message.annotations, message.url);
    }
  });
  
  async function syncAnnotationsToMongoDB(annotations, url) {
    const response = await fetch("http://localhost:5000/annotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ annotations, url }),
    });
  
    const result = await response.json();
    console.log(result.message);
  }
  