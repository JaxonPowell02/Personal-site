// main.js
import { recipes } from './recipes.mjs';

function createRecipeCard(recipe) {
    const article = document.createElement('article');
    article.className = 'recipe-card';

    const stars = '★'.repeat(recipe.rating) + '☆'.repeat(5 - recipe.rating);

    article.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-content">
            <div class="recipe-tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <h2>${recipe.name}</h2>
            <span
                class="rating"
                role="img"
                aria-label="Rating: ${recipe.rating} out of 5 stars"
            >
                ${stars.split('').map(star => 
                    `<span aria-hidden="true" class="icon-star${star === '☆' ? '-empty' : ''}">${star}</span>`
                ).join('')}
            </span>
            <p class="recipe-description">${recipe.description}</p>
        </div>
    `;

    return article;
}

function displayRecipes(recipesToShow = recipes) {
    const recipeGrid = document.querySelector('.recipe-grid');
    recipeGrid.innerHTML = '';
    
    if (recipesToShow.length === 0) {
        recipeGrid.innerHTML = '<p class="no-results">No recipes found. Try another search term.</p>';
        return;
    }

    recipesToShow.forEach(recipe => {
        recipeGrid.appendChild(createRecipeCard(recipe));
    });
}

function initializeSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
}

function performSearch(searchTerm) {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    if (!normalizedSearch) {
        displayRecipes();
        return;
    }

    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(normalizedSearch) ||
            recipe.description.toLowerCase().includes(normalizedSearch) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(normalizedSearch))
        );
    });

    displayRecipes(filteredRecipes);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();
    initializeSearch();
});