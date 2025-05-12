/*navbar*/
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    alert("Searching for: " + query);
  } else {
    alert("Please enter a search term.");
  }
}

function toggleDropdown() {
  const dropdown = document.querySelector('.icon-item.dropdown');
  dropdown.classList.toggle('open');
}

// Close dropdown if clicked outside
document.addEventListener('click', function (e) {
  const dropdown = document.querySelector('.icon-item.dropdown');
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

/*siler*/
const slider = document.getElementById('slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const slideWidth = 310; // slide width + gap

nextBtn.addEventListener('click', () => {
  slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
});
/*college*/
const newsItems = [
  { type: 'news', text: 'Poster competition result', url: '#', icon: 'bi-newspaper', date: 'May 5, 2025' },
  { type: 'news', text: 'Tarangini auditions done', url: '#', icon: 'bi-megaphone', date: 'May 4, 2025' },
  { type: 'tender', text: 'Hostel maintenance tender', url: '#', icon: 'bi-file-earmark-text', date: 'May 2, 2025' },
  { type: 'tender', text: 'IT upgrade tender out', url: '#', icon: 'bi-hdd-network', date: 'Apr 30, 2025' },
  { type: 'notice', text: 'Campus closed on Holi', url: '#', icon: 'bi-exclamation-triangle', date: 'Mar 24, 2025' },
  { type: 'notice', text: 'Assessment schedule out', url: '#', icon: 'bi-calendar-event', date: 'Mar 20, 2025' }
];

let currentFilter = 'all';
let isHidden = false;

function populateNews() {
  const list = document.getElementById('news-list');
  list.innerHTML = '';

  const filtered = newsItems.filter(item => currentFilter === 'all' || item.type === currentFilter);

  // Duplicate items for smooth infinite scroll
  const doubled = [...filtered, ...filtered];

  doubled.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <i class="bi ${item.icon}"></i>
      <a href="${item.url}" target="_blank">${item.text}</a>
      <span class="date">${item.date}</span>
    `;
    list.appendChild(li);
  });
}

function filterNews(type) {
  currentFilter = type;
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  const targetTab = document.querySelector(`.tab[onclick="filterNews('${type}')"]`);
  if (targetTab) targetTab.classList.add('active');
  populateNews();
}

function toggleVisibility() {
  const list = document.getElementById('news-list');
  const btn = document.getElementById('toggleBtn');
  isHidden = !isHidden;
  list.classList.toggle('hidden', isHidden);
  btn.textContent = isHidden ? 'Show All' : 'Hide';
}

document.addEventListener('DOMContentLoaded', populateNews);
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