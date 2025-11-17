// === Toggle Category Dropdown ===
function toggleCategories() {
    const dropdown = document.getElementById("category-dropdown");
    const exploreButton = document.getElementById("explore-button");

    dropdown.classList.toggle("hidden");

    // Rotate arrow when toggled
    const arrow = exploreButton.querySelector("svg");
    arrow.classList.toggle("rotate-180");
}

let currentTopic = "Anxiety"; // Keep track of the selected topic

// === Show Resource Details ===
function showResourceDetails(topic) {
    const categorySection = document.getElementById("category-dropdown");
    const detailSection = document.getElementById("resource-details");

    categorySection.classList.add("hidden");
    detailSection.classList.remove("hidden");

    currentTopic = topic;

    // Set topic title
    document.getElementById("detail-topic").textContent = topic;

    // Set description for each category
    const descriptions = {
        "Anxiety": "Learn how to manage anxiety through mindfulness, breathing techniques, and self-help strategies. These resources guide you toward calm and control.",
        "Mindfulness & Meditation": "Discover meditation guides, breathing exercises, and mindfulness routines to cultivate inner peace and mental clarity.",
        "Bullying & Cyberbullying": "Find help and resources for coping with bullying, reporting abuse, and building resilience in digital and real-world spaces.",
        "Inspiring Stories & Research": "Explore true stories of courage and the latest research insights on improving mental well-being."
    };

    document.getElementById("detail-description").textContent = descriptions[topic] || "Explore resources and tools related to this topic.";

    // Load the default tab
    switchTab("videos");
}

// === Go Back to Category Section ===
function goBackToCategories() {
    document.getElementById("resource-details").classList.add("hidden");
    document.getElementById("category-dropdown").classList.remove("hidden");
}

// === Switch Between Tabs (Videos, Articles, Quotes, Upload) ===
function switchTab(tabName) {
    const tabs = ["videos", "articles", "quotes", "upload"];
    tabs.forEach(tab => {
        const button = document.getElementById(`tab-${tab}`);
        button.classList.remove("border-pink-500", "text-pink-600");
        button.classList.add("border-transparent", "text-gray-500");
    });

    const activeTab = document.getElementById(`tab-${tabName}`);
    activeTab.classList.add("border-pink-500", "text-pink-600");
    activeTab.classList.remove("border-transparent", "text-gray-500");

    const tabContent = document.getElementById("tab-content");
    tabContent.innerHTML = getTabContent(tabName, currentTopic);
}

// === Dynamic Tab Content ===
function getTabContent(tab, topic) {
    const resources = {
        "Anxiety": {
            videos: [
                { title: "Coping with Anxiety", url: "https://www.youtube.com/embed/WWloIAQpMcQ", desc: "A short guide on calming your mind and overcoming panic." },
                { title: "5-Minute Breathing Exercise", url: "https://www.youtube.com/embed/ZToicYcHIOU", desc: "Simple breathing routine to reduce anxiety quickly." }
            ],
            articles: [
                { title: "Understanding Anxiety", link: "https://www.healthline.com/health/anxiety", desc: "Learn the science and psychology behind anxiety and how to cope." },
                { title: "How to Calm Your Mind", link: "https://psychcentral.com/anxiety/how-to-calm-anxiety", desc: "Step-by-step methods to ground yourself during anxious moments." }
            ],
            quotes: [
                { text: "You are bigger than what makes you anxious.", author: "Unknown", img: "https://i.ibb.co/3mrSkWb/anxiety1.jpg" },
                { text: "Feelings are just visitors. Let them come and go.", author: "Mooji", img: "https://i.ibb.co/bRZ9Kxv/anxiety2.jpg" }
            ]
        },

        "Mindfulness & Meditation": {
            videos: [
                { title: "Daily Mindfulness Routine", url: "https://www.youtube.com/embed/inpok4MKVLM", desc: "Learn a simple daily meditation habit for peace and clarity." },
                { title: "10-Minute Guided Meditation", url: "https://www.youtube.com/embed/O-6f5wQXSu8", desc: "Perfect for beginners — calm your mind and body." }
            ],
            articles: [
                { title: "Benefits of Mindfulness", link: "https://www.psychologytoday.com/us/basics/mindfulness", desc: "Understand why mindfulness is key to mental balance." },
                { title: "Simple Ways to Meditate", link: "https://www.headspace.com/meditation/meditation-for-beginners", desc: "Practical tips for new meditators." }
            ],
            quotes: [
                { text: "Be where you are, not where you think you should be.", author: "Unknown", img: "https://i.ibb.co/Zh9dRzT/mind1.jpg" },
                { text: "Quiet the mind and the soul will speak.", author: "Buddha", img: "https://i.ibb.co/5RVnD3R/mind2.jpg" }
            ]
        },

        "Bullying & Cyberbullying": {
            videos: [
                { title: "Stand Up Against Bullying", url: "https://www.youtube.com/embed/Ft1R9XWQ5XU", desc: "Hear stories of courage and kindness from students." },
                { title: "Cyberbullying Awareness", url: "https://www.youtube.com/embed/Mh1hzxBepxI", desc: "Learn how to protect yourself online and stay positive." }
            ],
            articles: [
                { title: "How to Deal with Bullying", link: "https://kidshealth.org/en/teens/bullies.html", desc: "Advice for students facing bullying or peer pressure." },
                { title: "Digital Safety Tips", link: "https://www.stopbullying.gov/cyberbullying/how-to-prevent", desc: "Protect your online presence from harassment." }
            ],
            quotes: [
                { text: "It takes courage to be kind.", author: "Unknown", img: "https://i.ibb.co/BVnpdXk/bully1.jpg" },
                { text: "Strong people stand up for others and themselves.", author: "Unknown", img: "https://i.ibb.co/F7vfv7H/bully2.jpg" }
            ]
        },

        "Inspiring Stories & Research": {
            videos: [
                { title: "Real Life Mental Health Journey", url: "https://www.youtube.com/embed/MEa1X5YB4rk", desc: "An inspiring story of recovery and resilience." },
                { title: "The Science of Happiness", url: "https://www.youtube.com/embed/92tuvRkY8wk", desc: "Learn research-backed ways to build happiness." }
            ],
            articles: [
                { title: "Hope in Healing", link: "https://greatergood.berkeley.edu/topic/happiness/definition", desc: "Explore research on what truly makes people happy." },
                { title: "Stories That Inspire Change", link: "https://time.com/collection/guide-to-happiness/", desc: "Powerful real-life stories of mental strength." }
            ],
            quotes: [
                { text: "Every storm runs out of rain.", author: "Maya Angelou", img: "https://i.ibb.co/CmLM1Wv/story1.jpg" },
                { text: "Your story isn’t over yet.", author: "Unknown", img: "https://i.ibb.co/9pvDkRL/story2.jpg" }
            ]
        }
    };

    const category = resources[topic];

    if (!category) return `<p class="text-gray-600">No resources available for this category.</p>`;

    // Build video section
    if (tab === "videos") {
        return `
            <div class="grid md:grid-cols-2 gap-6">
                ${category.videos.map(v => `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <iframe class="w-full h-64" src="${v.url}" frameborder="0" allowfullscreen></iframe>
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-800">${v.title}</h3>
                            <p class="text-gray-600 text-sm mt-1">${v.desc}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    // Build article section
    if (tab === "articles") {
        return `
            <div class="space-y-6">
                ${category.articles.map(a => `
                    <article class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${a.title}</h3>
                        <p class="text-gray-600 mb-2">${a.desc}</p>
                        <a href="${a.link}" target="_blank" class="text-pink-500 font-semibold hover:text-pink-700">Read More →</a>
                    </article>
                `).join("")}
            </div>
        `;
    }

    // Build quotes section (with images)
    if (tab === "quotes") {
        return `
            <div class="grid md:grid-cols-2 gap-6">
                ${category.quotes.map(q => `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="${q.img}" class="w-full h-48 object-cover" alt="quote image">
                        <div class="p-4 text-center">
                            <p class="text-gray-700 italic mb-2">"${q.text}"</p>
                            <p class="text-pink-500 font-semibold">— ${q.author}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    // Upload tab stays same
    if (tab === "upload") {
        return `
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Share Your Resource</h3>
                <p class="text-gray-600 mb-6">Submit a video, article, or quote that has helped you — let’s build a supportive community together!</p>
                <form class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Title</label>
                        <input type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea rows="4" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 focus:outline-none"></textarea>
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Upload File</label>
                        <input type="file" class="w-full border border-gray-300 rounded-lg px-4 py-2">
                    </div>
                    <button type="button" class="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-200">
                        Submit Resource
                    </button>
                </form>
            </div>
        `;
    }
}

// === Search Functionality ===
function handleSearch() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const topics = ["anxiety", "mindfulness", "meditation", "bullying", "cyberbullying", "stories", "research"];
    const matchedTopic = topics.find(topic => query.includes(topic));

    if (matchedTopic) {
        showResourceDetails(matchedTopic.charAt(0).toUpperCase() + matchedTopic.slice(1));
    } else {
        alert("No matching resources found. Try searching for 'anxiety', 'meditation', or 'bullying'.");
    }
}
