document.addEventListener("DOMContentLoaded", function () {
  const likeButton = document.querySelector(".like-btn");
  if (likeButton) {
    likeButton.addEventListener("click", async function () {
      const attractionId = this.getAttribute("data-attraction-id");
      try {
        const response = await fetch("/toggleLike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attractionId }),
        });

        if (response.ok) {
          const data = await response.json();
          document.getElementById("like-count").innerText = data.likeCount;

          // Toggle the heart class
          this.querySelector(".heart").classList.toggle("red-heart");
        } else if (response.status === 401) {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    });
  }
});

// l'aredirection vers la page reservasion et s'inscrire

document
  .getElementById("reserve-button")
  .addEventListener("click", function () {
    window.location.href = "/reservation";
  });

document.getElementById("signup-button").addEventListener("click", function () {
  window.location.href = "/register";
});
