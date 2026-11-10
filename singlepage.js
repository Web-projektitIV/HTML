// Shows one page and hides the other two
var apu = "Tämä on globaali apu-muuttuja";


const showPage = page => {

    // Hide all of the divs:
    document.querySelectorAll('div').forEach(div => {
        div.style.display = 'none';
    });

    // Show the div provided in the argument
    document.querySelector(`#${page}`).style.display = 'block';
}

// Wait for page to loaded:
document.addEventListener('DOMContentLoaded', () => {

    // Select all buttons
    document.querySelectorAll('button').forEach(button => {

        // When a button is clicked, switch to that page
        button.addEventListener('click', (event) => {
            console.log(`this button: ${event.target.dataset.page}`);
            showPage(event.target.dataset.page);
        })
    })
});


