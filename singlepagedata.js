// Shows given section
const url = "http://localhost:3001";
const quantity = 20;
const sectionEndpoints = {
    1: 'notes',
    2: 'notes_html',
    3: 'notes_css',
    4: 'notes_js'
};
let activeSection = 'notes';
let page = 0;
let loading = false;
let hasMore = true;
let requestId = 0;

// When back arrow is clicked, show previous section
window.onpopstate = function(event) {
    showSection(event.state?.section ?? 'notes');
}

function showSection(section) {
    activeSection = sectionEndpoints[section] ?? section;
    page = 0;
    loading = false;
    hasMore = true;
    requestId++;
    document.querySelector('#content').replaceChildren();
    load();
}

document.addEventListener('DOMContentLoaded', function() {
    // Add button functionality
    document.querySelectorAll('button').forEach(button => {
        button.onclick = function() {
            const section = sectionEndpoints[this.dataset.section];
            if (!section) return;
            history.pushState({section: section}, "", `?section=${section}`);
            showSection(section);
        };
    });

    const initialSection = new URLSearchParams(location.search).get('section') ?? 'notes';
    showSection(initialSection);
});


// Load more from the active section when reaching the page bottom.
window.onscroll = () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    document.body.style.background = atBottom ? 'green' : 'white';
    if (atBottom) load();
};

function add_content(content) {
    // Create new content element
    console.log("add_content: ",content);
    const element = document.createElement('div');
    element.className = 'content';
    element.innerHTML = content.id + ": " + content.content;
    // Add content to DOM
    document.querySelector('#content').append(element);
};    

// Load the next set of wisdoms from the active section
async function load() {
    if (loading || !hasMore) return;
    loading = true;
    const requestedSection = activeSection;
    const requestedPage = page + 1;
    const currentRequestId = requestId;
    try {
        const response = await fetch(`${url}/${requestedSection}?_page=${requestedPage}&_per_page=${quantity}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        if (currentRequestId !== requestId) return;

        result.data.forEach(add_content);
        page = requestedPage;
        hasMore = result.next !== null;
        } 
    catch (error) {
        if (currentRequestId === requestId) {
            console.error(`Could not load ${requestedSection}:`, error);
        }
        } 
    finally {
        if (currentRequestId === requestId) loading = false;
    }
    }
