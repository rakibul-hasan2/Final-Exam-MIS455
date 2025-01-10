document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results');
    const showAllButton = document.getElementById('show-all-button');

    let fullResults = [];
    const fetchMeals = async (query) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            return data.meals || []; 
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };
    const displayResults = (meals, limit = 5) => {
        resultsContainer.innerHTML = ''; 
        meals.slice(0, limit).forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('result');
            mealCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                <p>${meal.strInstructions.slice(0, 100)}...</p>
            `;
            resultsContainer.appendChild(mealCard);
        });
    };
        const handleSearch = async () => {
            const query = searchInput.value.trim();
            if (!query) return;
    
            fullResults = await fetchMeals(query);
            if (fullResults.length > 0) {
                displayResults(fullResults); 
                showAllButton.style.display = fullResults.length > 5 ? 'block' : 'none'; 
            } else {
                resultsContainer.innerHTML = '<p>No results found. Try a different search.</p>'; 
                showAllButton.style.display = 'none'; 
            }
        };

