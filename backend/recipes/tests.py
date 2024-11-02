from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Recipe, Ingredient, Category
from .serializers import RecipeSerializer, IngredientSerializer, CategorySerializer
from rest_framework import status
from django.urls import reverse

# Create your tests here.
class APITests(APITestCase):
    def setUp(self):
        self.ingredient_1 = Ingredient.objects.create(name='apple', carbon_emission=35, category='fruit')
        self.ingredient_2 = Ingredient.objects.create(name='banana', carbon_emission=70, category='fruit')
        self.category_1 = Category.objects.create(name='breakfast', description='first meal!')
        self.recipe = Recipe.objects.create(title='apple dish',
                                            description='APPLES!!!',
                                            instructions='something to do!',
                                            prep_time=1,
                                            cook_time=0)
        self.recipe.ingredients.add(self.ingredient_1)
        self.recipe.ingredients.add(self.ingredient_2)
        self.recipe.recipe.add(self.category_1)
        self.url = reverse('recipe-view', args=[self.recipe.id])

    def test_get_recipe(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Calculate expected emissions
        expected_emissions = self.ingredient_1.carbon_emission + self.ingredient_2.carbon_emission

        # Assert the response data
        self.assertEqual(response.data['id'], self.recipe.id)
        self.assertEqual(response.data['title'], self.recipe.title)
        self.assertEqual(response.data['total_emission'], float(expected_emissions))  # Convert to float for comparison
        self.assertEqual(len(response.data['ingredients']), 2)  # Ensure two ingredients are returned
