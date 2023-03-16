import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { RecipesService } from '../recipes/recipes.service';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-6a7db-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
      recipes)
      .subscribe((res) => {
        console.log(res)
      })

  }

fetchRecipes(){
  this.http.get<Recipe[]>('https://recipe-book-6a7db-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
  .pipe(map((recipes)=>{
    return recipes.map(recipes=>{
      return {...recipes,ingredients:recipes.ingredients ? recipes.ingredients :[]}
    })
  }))
  .subscribe((recipes)=>{
    console.log(recipes);
    this.recipeService.setRecipes(recipes);
  })
}

}
