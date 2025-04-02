document.getElementById("scroll-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.getElementById("qualification-id").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
