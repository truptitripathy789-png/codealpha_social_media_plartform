// =============================
// API URL
// =============================

const API_URL = "http://localhost:5000/api";

// =============================
// Register User
// =============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {

                alert("Registration Successful");

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);
            alert("Server Error");

        }
    });
}

// =============================
// Login User
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${API_URL}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user._id);
                localStorage.setItem("username", data.user.username);

                alert("Login Successful");

                window.location.href = "feed.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);
            alert("Login Failed");

        }

    });

}

// =============================
// Logout
// =============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.clear();

        window.location.href = "login.html";

    });

}

// =============================
// Create Post
// =============================

const postBtn = document.getElementById("postBtn");

if (postBtn) {

    postBtn.addEventListener("click", async () => {

        const content = document
            .getElementById("postContent")
            .value;

        const token = localStorage.getItem("token");

        if (!content) {
            alert("Write something first");
            return;
        }

        try {

            const response = await fetch(`${API_URL}/posts`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    content
                })

            });

            if (response.ok) {

                document.getElementById("postContent").value = "";

                loadPosts();

            }

        } catch (error) {

            console.log(error);

        }

    });

}

// =============================
// Load Posts
// =============================

async function loadPosts() {

    const postsContainer =
        document.getElementById("postsContainer");

    if (!postsContainer) return;

    try {

        const response =
            await fetch(`${API_URL}/posts`);

        const posts =
            await response.json();

        postsContainer.innerHTML = "";

        posts.reverse().forEach(post => {

            postsContainer.innerHTML += `

            <div class="post-card">

                <div class="post-header">

                    <img
                    src="https://i.pravatar.cc/100"
                    class="post-avatar">

                    <div>
                        <div class="post-user">
                            ${post.user?.username || "User"}
                        </div>
                    </div>

                </div>

                <div class="post-content">
                    ${post.content}
                </div>

                <div class="post-actions">

                    <button
                    class="action-btn"
                    onclick="likePost('${post._id}')">

                    ❤️ ${post.likes.length}

                    </button>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// =============================
// Like Post
// =============================

async function likePost(postId) {

    const token =
        localStorage.getItem("token");

    try {

        await fetch(
            `${API_URL}/posts/like/${postId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        loadPosts();

    } catch (error) {

        console.log(error);

    }

}

// =============================
// Profile Page
// =============================

async function loadProfile() {

    const profileName =
        document.getElementById("profileName");

    if (!profileName) return;

    const userId =
        localStorage.getItem("userId");

    try {

        const response =
            await fetch(
                `${API_URL}/users/profile/${userId}`
            );

        const user =
            await response.json();

        profileName.textContent =
            user.username;

        document.getElementById(
            "profileBio"
        ).textContent =
            user.bio || "No bio added";

        document.getElementById(
            "followersCount"
        ).textContent =
            user.followers.length;

        document.getElementById(
            "followingCount"
        ).textContent =
            user.following.length;

    } catch (error) {

        console.log(error);

    }

}

// =============================
// Page Load
// =============================

window.addEventListener("DOMContentLoaded", () => {

    loadPosts();

    loadProfile();

});