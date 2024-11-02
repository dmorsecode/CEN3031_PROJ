from django.shortcuts import render
from django.urls import reverse
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
    permission_classes = [AllowAny]



class UpdateEmissions(generics.RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]




