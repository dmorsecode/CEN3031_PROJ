from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Recipe, Ingredient, Category
from .serializers import RecipeSerializer, IngredientSerializer, CategorySerializer

# Create your views here.

class RecipeCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

class IngredientCreate(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny]


class CategoryCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [AllowAny]


class ViewRecipe(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


def calculate_total_emissions(ingredients):
    total = 0
    for ingredient in ingredients:
        total += ingredient.carbon_emission
    return total


class UpdateEmissions(generics.RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    #permission_classes = [AllowAny]

    total = 0

    def update(self, request, *args, **kwargs):
        recipe = self.get_object()
        recipe_ingredients = recipe.ingredients.all() # gets all ingredients from the recipe object
        for ingredients in recipe_ingredients:
            print(ingredients)

    '''def retrieve(self, request, *args, **kwargs):
        recipe = self.get_object()
        recipe_ingredients = recipe.ingredients.all() # gets all ingredients from the recipe object

        serializer = self.get_serializer(recipe)
        print(f'data is {serializer.data}')
        return Response(serializer.data)
    '''
    '''
    def perform_update(self, serializer):
        serializer.save(total_emission=self.total)
        print("test")

    '''



