import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesChanged = new Subject<Recipe []>();
  constructor(private shoppingService : ShoppingListService) { }
 private recipes: Recipe[] = [
    new Recipe ('A Test Recipe', 
    'This is simply a test', 
    'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=80',
    [new Ingredient('fruit',3), new Ingredient('honey',1)])
   , new Recipe ('A Test v2 Recipe', 
   'This is simply a test v2', 
   'https://images.unsplash.com/photo-1673912402587-57ac40f1b4a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
   [new Ingredient('chocolate',1),new Ingredient('cup-cake',3)]), new Recipe(
    'Tasty Schnitzel',
    'A super-tasty Schnitzel - just awesome!',
    'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
  new Recipe('Big Fat Burger',
    'What else you need to say?',
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ])
    ];

    getRecipes(){
      return this.recipes.slice()
    }
    getRecipe(index:number){
      return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
      this.shoppingService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice());
      }
      setRecipes(recipes:Recipe[]) { 
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
       updateRecipe (index: number, newRecipe: Recipe) { 
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}
