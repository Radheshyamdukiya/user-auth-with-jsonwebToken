 // script.js

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").textContent = "16 hours ago";

  const stored = localStorage.getItem("comments");
  if (stored) {
    JSON.parse(stored).forEach(c => addComment(c.username, c.message, false, c.id));
  }

  const likeIcon = document.getElementById("likeIcon");
  likeIcon.addEventListener("click", () => {
    likeIcon.classList.toggle("bi-heart-fill");
    likeIcon.classList.toggle("bi-heart");
    likeIcon.style.color = likeIcon.classList.contains("bi-heart-fill") ? "#e74c3c" : "#333";
  });

  const saveIcon = document.querySelector(".save-icon");
  saveIcon.addEventListener("click", () => {
    saveIcon.classList.toggle("bi-bookmark-fill");
    saveIcon.classList.toggle("bi-bookmark");
    saveIcon.title = saveIcon.classList.contains("bi-bookmark-fill") ? "Saved" : "Save";
    alert(saveIcon.classList.contains("bi-bookmark-fill") ? "Post saved!" : "Removed from saved.");
  });

  const menuIcon = document.querySelector(".menu-icon");
  menuIcon.addEventListener("click", () => {
    showPostOptions();
  });
});

function submitComment() {
  const input = document.getElementById("commentInput");
  const message = input.value.trim();
  if (message) {
    const id = Date.now();
    addComment("you", message, true, id);
    saveComment("you", message, id);
    input.value = "";
  }
}

function addComment(username, message, save = true, id) {
  const commentList = document.getElementById("commentList");
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  commentDiv.setAttribute("data-id", id);

  commentDiv.innerHTML = `
    <span><strong>${username}</strong> ${message}</span>
    <button class="delete-btn" onclick="deleteComment(${id}, this)">Delete</button>
  `;

  commentList.appendChild(commentDiv);
}

function saveComment(username, message, id) {
  const existing = JSON.parse(localStorage.getItem("comments")) || [];
  existing.push({ id, username, message });
  localStorage.setItem("comments", JSON.stringify(existing));
}

function deleteComment(id, btn) {
  btn.closest(".comment").remove();
  const existing = JSON.parse(localStorage.getItem("comments")) || [];
  const updated = existing.filter(c => c.id !== id);
  localStorage.setItem("comments", JSON.stringify(updated));
}

function showPostOptions() {
  const menu = document.createElement("div");
  menu.className = "post-options";
  menu.innerHTML = `
    <div class="option">Report</div>
    <div class="option">Unfollow</div>
    <div class="option" onclick="copyPostLink()">Copy Link</div>
    <div class="option" onclick="this.parentElement.remove()">Cancel</div>
  `;
  Object.assign(menu.style, {
    position: 'absolute',
    top: '60px',
    right: '30px',
    background: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '10px',
    zIndex: 999
  });
  document.body.appendChild(menu);
}

function copyPostLink() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert("Post link copied!"))
    .catch(() => alert("Failed to copy link."));
}
