// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

//   variables

let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector("#search-btn");
let resultArea = document.querySelector(".results-area");
let recipeDetails = document.querySelector(".recipe-details");

// Event

searchBtn.addEventListener("click", getRecipes);
resultArea.addEventListener("click", getRecipeDetails);
recipeDetails.addEventListener("click", closeRecipeDetails);

function getRecipes() {
  let serchterm = searchInput.value.trim();
  let apiUrl = ` https://www.themealdb.com/api/json/v1/1/filter.php?i=${serchterm}`;
  fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displyRecipes(data);
    });
}
function displyRecipes(recipes) {
  resultArea.innerHTML = " ";
  if (recipes.meals == null) {
    resultArea.innerHTML = "no meals ";
    return;
  }
  recipes.meals.forEach((recipe) => {
    resultArea.innerHTML += `    <div class="card">
  <div class="card-img">
      <img src="${recipe.strMealThumb}"
          alt="">
  </div>
  <div class="card-info">
      <h2>${recipe.strMeal}</h2>
      <a href="#" class="recipe-btn" data-id= ${recipe.idMeal} >Get Recipe</a>
  </div>
</div>`;
  });
}
function getRecipeDetails(e) {
  if (e.target.classList.contains("recipe-btn")) {
    let id = e.target.getAttribute("data-id");
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        displayRecipeDetails(data);
      });
  }
}
function displayRecipeDetails(recipeItem) {
  let item = recipeItem.meals[0];
  recipeDetails.classList.remove("show-details");
  console.log(item);
  recipeDetails.innerHTML = "";
  recipeDetails.innerHTML = `
  <i class="fas fa-times"></i>
  <h2>${item.strMeal}</h2>
  <img class="details-img" src="${item.strMealThumb}"
  alt="">
  <h3>Integredients</h3>
  <div>  
  <p>${item.strIngredient1}</p>
  <p>${item.strIngredient2}</p>
  <p>${item.strIngredient3}</p>
  <p>${item.strIngredient4}</p>
  <p>${item.strIngredient5}</p>
  <p>${item.strIngredient6}</p>
  <p>${item.strIngredient7}</p>
  </div>
  <a class="details-btn" href="${item.strYoutube}">watch video</a>`;
}
function closeRecipeDetails(e) {
  console.log(e.target);
  if (e.target.classList.contains("fa-times")) {
    e.target.parentElement.classList.add("show-details");
  }
}
