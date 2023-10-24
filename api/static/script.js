


// Get the tab elements
const translationTab = document.getElementById('translation_tab');
const aboutTab = document.getElementById('about_tab')


// Get the content elements
const translationContent = document.getElementById('translation');
const aboutContent = document.getElementById('about');


// Get the button element
const openModalButton = document.getElementById("openModalButton");

// Add click event listeners to the tabs
translationTab.addEventListener('click', function(event) {
  event.preventDefault();

  translationContent.style.display = 'block';
  aboutContent.style.display = 'none';
  openModalButton.style.display = 'block'; 

});

aboutTab.addEventListener('click', function(event) {
  event.preventDefault();

  translationContent.style.display = 'none';
  aboutContent.style.display = 'block'
  openModalButton.style.display = 'none'
})

// Show the translation content by default
translationContent.style.display = 'block';
aboutContent.style.display = 'none';
openModalButton.style.display = 'block';

function translateText() {
    const openModalButton = document.getElementById("openModalButton");
    const closeModalButton = document.getElementById("closeModalButton");
    const myModal = document.getElementById("myModal");
    const translatedText = document.getElementById("translatedText");
  
    openModalButton.addEventListener("click", function(event) {
      event.preventDefault();
      const textInput = document.getElementById("text-input").value;
  
      fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),

      })
        .then((response) => response.json())
        .then((data) => {
          translatedText.innerHTML = data.result; 
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
          alert("Nå hev du ein kopi på minnetavla di");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    });
  }
  
  // Call the translateText function when needed
  translateText();
  