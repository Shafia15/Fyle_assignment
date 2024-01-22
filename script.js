// Add the following code to the existing script.js

let currentPage = 1;

function fetchRepositories() {
    const username = document.getElementById('username').value;
    const perPage = document.getElementById('perPage').value;
    const search = document.getElementById('search').value;
    const repositoriesContainer = document.getElementById('repositories');
    const loader = document.getElementById('loader');

    // Show loader
    loader.style.display = 'block';

    // Clear previous results
    repositoriesContainer.innerHTML = '';

    // Fetch user repositories from GitHub API
    fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}&q=${search}`)
        .then(response => response.json())
        .then(repositories => {
            repositories.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                repositoriesContainer.appendChild(repoElement);
            });
            loader.style.display = 'none'; // Hide loader after fetching data
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repositoriesContainer.innerHTML = '<p>Error fetching repositories. Please check the username and try again.</p>';
            loader.style.display = 'none'; // Hide loader in case of an error
        });
}

// You can implement pagination controls based on your design.
// Handle next and previous page, update currentPage accordingly.
