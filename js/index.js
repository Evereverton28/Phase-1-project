document.getElementById('getJokeBtn').addEventListener('click', generateJoke);

// Load comments from local storage when the page loads
window.addEventListener('load', loadComments);

// Event listener for "Post Comment" button
document.getElementById('postCommentBtn').addEventListener('click', addComment);

function generateJoke() {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.innerHTML = 'Loading...'; // Show loading message
    jokeContainer.style.backgroundColor="black"
    jokeContainer.style.color="white"
    jokeContainer.style.width="500px"
    jokeContainer.style.height="100px"
    jokeContainer.style.textAlign="center"
    jokeContainer.style.borderRadius="30px"

    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        jokeContainer.innerHTML = `<p>${data.joke}</p>`;
    })
    .catch(error => {
        console.error('Error fetching joke:', error);
        jokeContainer.innerHTML = 'Failed to fetch joke. Please try again.'; // Show error message
    });
}

function loadComments() {
    const commentList = document.getElementById('commentList');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Clear existing comments
    commentList.innerHTML = '';

    // Add comments from local storage to the comment list
    comments.forEach((comment, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = comment;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button'); // Add class for styling
        deleteButton.style.display = 'none'; // Initially hide the delete button

        // Add event listener to delete button
        deleteButton.addEventListener('click', () => {
            deleteComment(index);
            loadComments(); // Reload comments after deleting
        });

        // Append delete button to the comment item
        listItem.appendChild(deleteButton);

        // Show delete button when mouse hovers over the comment
        listItem.addEventListener('mouseover', () => {
            deleteButton.style.display = 'inline-block';
        });

        // Hide delete button when mouse leaves the comment
        listItem.addEventListener('mouseout', () => {
            deleteButton.style.display = 'none';
        });

        // Append comment item to the comment list
        commentList.appendChild(listItem);
    });
}

function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentList = document.getElementById('commentList');
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = commentText;
        commentList.appendChild(listItem);
        saveComment(commentText); // Save the comment to local storage
        commentInput.value = ''; // Clear input field after adding comment
    } else {
        alert('Please enter a comment before adding.');
    }
}

function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1); // Remove comment from array
    localStorage.setItem('comments', JSON.stringify(comments)); // Save updated array to local storage
}

