<script>
      document.addEventListener("DOMContentLoaded", function () {
        const openModalButton = document.getElementById("openModalButton");
        const closeModalButton = document.getElementById("closeModalButton");
        const myModal = document.getElementById("myModal");
        const translatedText = document.getElementById("translatedText");

        openModalButton.addEventListener("click", function (event) {
          event.preventDefault();
          const textInput = document.getElementById("text-input").value;
          //const sliderValue = document.querySelector("input[type=range]").value;

          fetch("/api/translate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: textInput }),
            //body: JSON.stringify({ text: textInput, style: sliderValue }),
          })
            .then((response) => response.json())
            .then((data) => {
              translatedText.innerHTML = data.result; // Replace this with the actual translated text
              myModal.classList.remove("hidden");
            });
        });

        closeModalButton.addEventListener("click", function () {
          myModal.classList.add("hidden");
        });
      });

      document.addEventListener("DOMContentLoaded", function () {

        const copyToClipboardButton = document.getElementById(
          "copyToClipboardButton"
        );

        copyToClipboardButton.addEventListener("click", function () {
          const textToCopy =
            document.getElementById("translatedText").innerText;
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              alert("Nå hev du ein kopi på minnetavla di som du kan sende til nokon som kan nynorsk");
            })
            .catch((err) => {
              // Handle errors here
              console.error("Could not copy text: ", err);
            });
        });
      });
    </script>