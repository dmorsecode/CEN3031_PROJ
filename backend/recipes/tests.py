from itertools import filterfalse

from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Recipe, Ingredient, Category, RecipeIngredient
from .serializers import RecipeSerializer, IngredientSerializer, CategorySerializer
from rest_framework import status
from django.urls import reverse

# Recipe Creation and Total Emission Test
class SimpleRecipeTest(APITestCase):
    def setUp(self):
        #create ingredients, category, recipe, and recipeingredients (for amounts)
        self.ingredient_1 = Ingredient.objects.create(name='apple', carbon_emission=35, category='fruit')
        self.ingredient_2 = Ingredient.objects.create(name='banana', carbon_emission=70, category='fruit')
        self.category_1 = Category.objects.create(name='breakfast', description='first meal!')
        self.recipe = Recipe.objects.create(title='apple dish',
                                            description='APPLES!!!',
                                            instructions='something to do!',
                                            prep_time=1,
                                            cook_time=0)
        #self.recipe.ingredients.add(self.ingredient_1)
        #self.recipe.ingredients.add(self.ingredient_2)
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_1, amount=1)
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_2, amount=2)
        self.recipe.recipe.add(self.category_1)
        self.url = reverse('recipe-view', args=[self.recipe.id])

    def test_recipe_amounts(self):
        self.assertEqual(RecipeIngredient.objects.count(), 2)

        recipe_ingredient_info_1 = RecipeIngredient.objects.get(recipe=self.recipe, ingredient=self.ingredient_1)
        self.assertEqual(recipe_ingredient_info_1.amount, 1)

    def test_get_recipe(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Calculate expected emissions through adding up the carbon emissions
        recipe_1_ingredient_1_info = RecipeIngredient.objects.get(recipe=self.recipe, ingredient=self.ingredient_1)
        recipe_1_ingredient_2_info = RecipeIngredient.objects.get(recipe=self.recipe, ingredient=self.ingredient_2)
        ingredient_1_expected = self.ingredient_1.carbon_emission * recipe_1_ingredient_1_info.amount
        ingredient_2_expected = self.ingredient_2.carbon_emission * recipe_1_ingredient_2_info.amount
        expected_emissions =  ingredient_1_expected + ingredient_2_expected

        # Check the responses to see if they match in the test
        self.assertEqual(response.data['id'], self.recipe.id)
        self.assertEqual(response.data['title'], self.recipe.title)
        self.assertEqual(response.data['total_emission'], float(expected_emissions))
        self.assertEqual(len(response.data['ingredients']), 2)

    # test to see what data rows look like
    '''
    def test_view_rows(self):
        recipes = Recipe.objects.all()
        for recipe in recipes:
            print(f'Recipe: {recipe.title}')
            ingredients = recipe.ingredients.all()
            for ingredient in ingredients:
                print(f'   - ingredient: {ingredient.name}')
        recipe_ingredients_info = RecipeIngredient.objects.all()
        for ingredient_info in recipe_ingredients_info:
            print(f'recipe: {ingredient_info.recipe}, ingredient: {ingredient_info.ingredient}, amount: {ingredient_info.amount}')

    '''
#tests with more ingredients, and ingredient amounts that are less than 1 and non-whole numbers
class ComplexRecipeTest(APITestCase):
    def setUp(self):
        self.ingredient_1 = Ingredient.objects.create(name='beef', carbon_emission=7700, category='meat')
        self.ingredient_2 = Ingredient.objects.create(name='rice', carbon_emission=330, category='grain')
        self.ingredient_3 = Ingredient.objects.create(name='tomato', carbon_emission=160, category='fruit')
        self.ingredient_4 = Ingredient.objects.create(name='beer', carbon_emission=665, category='liquid')
        self.ingredient_5 = Ingredient.objects.create(name='fish', carbon_emission=1800, category='meat')
        self.ingredient_6 = Ingredient.objects.create(name='wine', carbon_emission=300, category='liquid')
        self.category_1 = Category.objects.create(name='dinner', description='yum yum dinner!')
        self.recipe = Recipe.objects.create(title='surf and turf',
                                            description='A surf and turf dish with beef and beer-battered fish, and a side of rice with wine to drink.',
                                            instructions='Cook the beef and fish. Then cook the rice, and then get a glass of wine. Eat it all up!',
                                            prep_time=35,
                                            cook_time=45)
        self.recipe.recipe.add(self.category_1)
        self.ingredients_info = [
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_1, amount=200),
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_2, amount=50),
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_3, amount=125),
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_4, amount=0.5),
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_5, amount=121.5),
        RecipeIngredient.objects.create(recipe=self.recipe, ingredient=self.ingredient_6, amount=0.2) ]
        self.url = reverse('recipe-view', args=[self.recipe.id])

    def test_get_recipe(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        ingredients_expected = []
        ingredients_carbon = [self.ingredient_1.carbon_emission, self.ingredient_2.carbon_emission,
                              self.ingredient_3.carbon_emission, self.ingredient_4.carbon_emission,
                              self.ingredient_5.carbon_emission, self.ingredient_6.carbon_emission]

        for i in range(len(ingredients_carbon)):
            ingredients_expected.append(ingredients_carbon[i] * self.ingredients_info[i].amount)

        expected_emissions = sum(ingredients_expected)
        # Calculate expected emissions through adding up the carbon emissions

        self.assertEqual(response.data['id'], self.recipe.id)
        self.assertEqual(response.data['title'], self.recipe.title)
        self.assertEqual(response.data['total_emission'], float(expected_emissions))
        self.assertEqual(len(response.data['recipe']), 1)
        self.assertEqual(len(response.data['ingredients']), 6)  # Ensure the ingredients amount matches up


# Edge Case Testing

# Check if a single recipe can have multiple categories selected
class MultipleCategoriesTest(APITestCase):
    def setUp(self):
        self.ingredient_1 = Ingredient.objects.create(name='rice', carbon_emission=330, category='grain')
        self.ingredient_2 = Ingredient.objects.create(name='fish', carbon_emission=1800, category='meat')
        self.category_1 = Category.objects.create(name='dinner', description='yum yum dinner!')
        self.category_2 = Category.objects.create(name='lunch', description='The underrated meal time.')
        self.recipe = Recipe.objects.create(title='fish and rice',
                                            description='Its simply some fish and rice!',
                                            instructions='Cook that rice up and cook that fish up, and eat it!',
                                            prep_time=10,
                                            cook_time=30)
        #self.recipe.ingredients.add(self.ingredient_1)
        #self.recipe.ingredients.add(self.ingredient_2)
        self.recipe.recipe.add(self.category_1)
        self.recipe.recipe.add(self.category_2)
        self.url = reverse('recipe-view', args=[self.recipe.id])

    def test_get_recipe(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['id'], self.recipe.id)
        self.assertEqual(response.data['title'], self.recipe.title)
        self.assertEqual(len(response.data['recipe']), 2)  # Check if there is only 1 category on the recipe

# Check if negatives cause problems

class NegativeValuesTest(APITestCase):
    def setUp(self):
        self.ingredient_1 = Ingredient.objects.create(name='rice', carbon_emission=330, category='grain')
        self.ingredient_2 = Ingredient.objects.create(name='fish', carbon_emission=1800, category='meat')
        self.category_1 = Category.objects.create(name='dinner', description='yum yum dinner!')
        self.recipe = Recipe.objects.create(title='fish and rice',
                                            description='Its simply some fish and rice!',
                                            instructions='Cook that rice up and cook that fish up, and eat it!',
                                            prep_time=-10,
                                            cook_time=-50)
        self.recipe.ingredients.add(self.ingredient_1)
        self.recipe.ingredients.add(self.ingredient_2)
        self.recipe.recipe.add(self.category_1)
        self.url = reverse('recipe-view', args=[self.recipe.id])

    def is_negative(self, num):
        if num > 0:
            return False
        return True

    def test_get_recipe(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['id'], self.recipe.id)
        self.assertEqual(response.data['title'], self.recipe.title)
        self.assertEqual(self.is_negative(response.data['prep_time']), True)  # Ensure prep time is not negative
        self.assertEqual(self.is_negative(response.data['cook_time']), True)  # Ensure cook time is not negative







