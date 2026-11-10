// Shows given section
const url = "http://localhost:3001/notes"; 
const quantity = 20;
const start = 1;
let counter = 0; 

// When DOM loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', load);

// When back arrow is clicked, show previous section
window.onpopstate = function(event) {
    console.log(event.state.section);
    showSection(event.state.section);
}

function showSection(section) {
    // Find section text from server
    fetch(url + `/${section}`)
    .then(response => response.json())
    .then(data => {
        // Log text and display on page
        console.log("showSection: ",data);
        document.querySelector('#content').innerHTML = data['content'];
    });
}

document.addEventListener('DOMContentLoaded', function() {
    /*const content = document.querySelector('#content');
    for (let number = start; number <= start + quantity - 1; number++) {
        const paragraph = document.createElement('p');
        paragraph.textContent = number;
        content.appendChild(paragraph);
    }*/

    // Add button functionality
    document.querySelectorAll('button').forEach(button => {
        button.onclick = function() {
            const section = this.dataset.section;
            history.pushState({section: section}, "", `?section=${section}`);
            showSection(section);
        };
    });
});


// Event listener for scrolling
    window.onscroll = () => {
        const summa = window.innerHeight + window.scrollY;
        console.log(`window.innerHeight + window.scrollY: ${summa}`);
        //console.log(`window.scrollY: ${window.scrollY}`);
        //console.log(`window.innerHeight: ${window.innerHeight}`);
        console.log('document.body.offsetHeight:',document.body.offsetHeight);
        // Check if we're at the bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Change color to green
            load();
            /*document.querySelector('body').style.background = 'green';*/
        } /*else {
            // Change color to white
            document.querySelector('body').style.background = 'white';
        }*/

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

    // Load next set of posts
function load() {
    // Set start and end post numbers, and update counter
    counter++;
    // Get new posts and add posts
    fetch(`${url}?_page=${counter}&_per_page=${quantity}`)
    .then(response => response.json())
    .then(data => {
        console.log("load: ",data.data);
        data.data.forEach(add_content);
        });
    }
