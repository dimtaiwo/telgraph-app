// VARIABLES SETUP
const publishButton = document.querySelector('#publish-btn');
const form = document.querySelector('#post-form');


// Event Listeners
// publishButton.addEventListener('click', renderPage());
form.addEventListener('submit', (e) => {
    addPost(e)
});

// Add Post to Database 
async function addPost(e) {
    e.preventDefault();

    const postData = {
        title: e.target.title.value,
        name: e.target.name.value,
        story: e.target.story.value
    }

    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { "Content-Type": "application/json" }
        };

        console.log(options.body);
        const response = await fetch('http://localhost:3000/post', options);
        console.log(response);
        const data = await response.json();
        console.log(data);
        let id = data["_id"];
        window.location.href = `post/${id}`;

    } catch (e) {
        console.log(e);
    }
}