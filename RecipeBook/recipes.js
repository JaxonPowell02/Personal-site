// 1. Import recipes
import { recipes } from './recipestemplates.js';

// 2. Random number generator function
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// 3. Random recipe selector
function getRandomRecipe() {
    return recipes[getRandomNumber(recipes.length)];
}

// 4. Tags template function
function generateTagsTemplate(tags) {
    // Convert tags to lowercase and remove duplicates
    return [...new Set(tags.map(tag => tag.toLowerCase()))]
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');
}

// 5. Rating stars template function
function generateRatingTemplate(rating) {
    const fullStar = '⭐';
    const emptyStar = '☆';
    const stars = fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
    
    return `
        <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
            ${stars.split('').map(star => 
                `<span aria-hidden="true" class="icon-star${star === '☆' ? '-empty' : ''}">${star}</span>`
            ).join('')}
        </span>
    `;
}

// 6. Recipe card template function
function generateRecipeTemplate(recipe) {
    return `
        <article class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-content">
                <div class="recipe-tags">
                    ${generateTagsTemplate(recipe.tags)}
                </div>
                <h2>${recipe.name}</h2>
                ${generateRatingTemplate(recipe.rating)}
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span>Prep: ${recipe.prepTime}</span>
                    <span>Cook: ${recipe.cookTime}</span>
                    <span>Yield: ${recipe.recipeYield}</span>
                </div>
            </div>
        </article>
    `;
}

// 7. Filter recipes function - UPDATED
function filterRecipes(query) {
    console.log('Filtering with query:', query); // Debug log
    
    return recipes.filter(recipe => {
        const searchQuery = query.toLowerCase();
        
        // Check recipe name (if exists)
        const nameMatch = recipe.name ? 
            recipe.name.toLowerCase().includes(searchQuery) : false;
        
        // Check description (if exists)
        const descriptionMatch = recipe.description ? 
            recipe.description.toLowerCase().includes(searchQuery) : false;
        
        // Check tags (if exists)
        const tagMatch = recipe.tags ? 
            recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery)) : false;
        
        // Log what we're matching against
        console.log('Checking recipe:', recipe.name);
        console.log('Name match:', nameMatch);
        console.log('Description match:', descriptionMatch);
        console.log('Tag match:', tagMatch);
        
        return nameMatch || descriptionMatch || tagMatch;
    }).sort((a, b) => a.name.localeCompare(b.name));
}

// 8. Render recipes function
function renderRecipes(recipesToRender) {
    console.log('Rendering recipes:', recipesToRender); // Debug log
    const recipeGrid = document.querySelector('.recipe-grid');
    if (recipeGrid) {
        if (recipesToRender.length === 0) {
            recipeGrid.innerHTML = `
                <p class="no-results">No recipes found. Try another search term.</p>
            `;
        } else {
            recipeGrid.innerHTML = recipesToRender.map(recipe => 
                generateRecipeTemplate(recipe)
            ).join('');
        }
    }
}

// 9. Search handler function
function handleSearch(event) {
    event.preventDefault(); // Prevent form submission
    console.log('Search triggered'); // Debug log

    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }

    const query = searchInput.value.trim();
    console.log('Search query:', query); // Debug log

    if (query) {
        const filteredRecipes = filterRecipes(query);
        console.log('Filtered recipes:', filteredRecipes); // Debug log
        renderRecipes(filteredRecipes);
    } else {
        // If search is empty, show random recipe
        renderRecipes([getRandomRecipe()]);
    }
}

// 10. Initialize function
function init() {
    console.log('Initializing app...'); // Debug log
    console.log('Available recipes:', recipes); // Log recipes for debugging

    // Render initial random recipe
    const randomRecipe = getRandomRecipe();
    const recipeGrid = document.querySelector('.recipe-grid');
    if (recipeGrid) {
        recipeGrid.innerHTML = generateRecipeTemplate(randomRecipe);
    }

    // Set up search form handler
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
        console.log('Search form handler attached'); // Debug log
    } else {
        console.error('Search form not found');
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (recipes && recipes.length > 0) {
        init();
    } else {
        console.error('Recipes not loaded properly');
    }
});