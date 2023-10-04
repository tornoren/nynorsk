
// Get the tab elements
const translationTab = document.getElementById('translation_tab');
const styleTab = document.getElementById('style_tab');
const imitationTab = document.getElementById('imitation_tab');

// Get the content elements
const translationContent = document.getElementById('translation');
const styleContent = document.getElementById('style');
const imitationContent = document.getElementById('imitation');


// Add click event listeners to the tabs
translationTab.addEventListener('click', function(event) {
  event.preventDefault();

  translationContent.style.display = 'block';
  styleContent.style.display = 'none';
  imitationContent.style.display = 'none'

});

styleTab.addEventListener('click', function(event) {
  // Prevent the default behavior of the link
  event.preventDefault();

  // Show/hide the corresponding content
  translationContent.style.display = 'block';
  styleContent.style.display = 'block';
  imitationContent.style.display = 'none';

});

imitationTab.addEventListener('click', function(event) {
  // Prevent the default behavior of the link
  event.preventDefault();

  // Show/hide the corresponding content
  translationContent.style.display = 'block';
  styleContent.style.display = 'none';
  imitationContent.style.display = 'block';

});

// Show the translation content by default
styleContent.style.display = 'none';
imitationContent.style.display = 'none';
translationContent.style.display = 'block';


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
  