function translateText() {
    const openModalButton = document.getElementById("openModalButton");
    const closeModalButton = document.getElementById("closeModalButton");
    const myModal = document.getElementById("myModal");
    const translatedText = document.getElementById("translatedText");
  
    openModalButton.addEventListener("click", function(event) {
      event.preventDefault();
      const textInput = document.getElementById("text-input").value;
      const sliderValue = document.querySelector("input[type=range]").value;
  
      fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput, style: sliderValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          translatedText.innerHTML = data.result; // Replace this with the actual translated text
          myModal.classList.remove("hidden");
        });
    });
  
    closeModalButton.addEventListener("click", function() {
      myModal.classList.add("hidden");
    });
  
    myModal.addEventListener("click", function(event) {
      if (event.target === myModal) {
        myModal.classList.add("hidden");
      }
    });
  
    const copyToClipboardButton = document.getElementById("copyToClipboardButton");
    copyToClipboardButton.addEventListener("click", function() {
      const textToCopy = document.getElementById("translatedText").innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // You can add a tooltip or message saying "Copied!"
          alert("Nå hev du ein kopi på minnetavla di");
        })
        .catch((err) => {
          // Handle errors here
          console.error("Could not copy text: ", err);
        });
    });
  }
  
  // Call the translateText function when needed
  translateText();
  