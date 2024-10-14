const searchButton = document.getElementById('search-button');
const recipeResults = document.getElementById('recipe-results');

// Event listener to trigger the search when the button is clicked
searchButton.addEventListener('click', () => {
    const ingredientInput = document.getElementById('ingredient-input').value.trim();
    
    // Check if the input is valid
    if (ingredientInput) {
        getRecipes(ingredientInput);
    } else {
        alert('Please enter some ingredients.');
    }
});

// Function to fetch recipes from Edamam API
async function getRecipes(ingredients) {
    const apiKey = '2dac8a39ede9a5b607f1ec4279fe7704';  // Replace with your Edamam API key
    const appId = 'e1b2dcc8';    // Replace with your Edamam App ID
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${apiKey}&from=0&to=10`;

    try {
        const response = await fetch(apiUrl);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Display recipes if data is available
        if (data.hits.length > 0) {
            displayRecipes(data.hits);
        } else {
            alert('No recipes found. Please try with different ingredients.');
        }
    } catch (error) {
        console.error('Error fetching the recipes:', error);
        alert('Failed to fetch recipes. Please check your API credentials or try again later.');
    }
}

// Function to display the recipes on the webpage
function displayRecipes(recipes) {
    // Clear previous results
    recipeResults.innerHTML = '';

    // Loop through each recipe and create a card for it
    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        // Create a recipe card
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;

        // Append the recipe card to the results section
        recipeResults.appendChild(recipeCard);
    });
}
