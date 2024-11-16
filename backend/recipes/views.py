from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth.models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


def home(request):
    return render(request, 'recipes/home.html')

def logout_view(request):
    logout(request)
    return redirect('/')

def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'All field required.'}, status = status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password= password, email=email)
    token = Token.objects.create(user=user)

    return Response({'token': token.key}, status=status.HTTP_201_CREATED)

# Recipe Endpoints

@api_view(['GET'])
@permission_classes([AllowAny])  # This will bypass the permission check
def get_recipe_list(request): #Get recipe list
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many= True)
    return Response({'recipes': serializer.data})

class RecipeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets recipe
        try:
            recipe = Recipe.objects.get(pk = pk)
        except Recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RecipeSerializer(recipe)
        return Response({recipe.title : serializer.data})
    
    def post(self, request): #Creates recipe
        serializer = RecipeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk): #Updates recipe
        try:
            recipe = Recipe.objects.get(pk = pk)
        except Recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
    

        serializer = RecipeSerializer(recipe, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk): #Deletes recipe
        try:
            recipe = Recipe.objects.get(pk = pk)
        except Recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        recipe.delete()
        return Response({'message': 'Recipe deleted successfully'}, status = status.HTTP_204_NO_CONTENT)
    
class IngredientRecipe(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets ingredient
        try:
            ingredient = Ingredient.objects.get(pk = pk)
        except Ingredient.DoesNotExist:
            return Response({'error':'ingredient could not be found'}, status= status.HTTP_404_NOT_FOUND)
        serializer = IngredientSerializer(ingredient)
        return Response({ingredient.name : serializer.data})
    
    def post(self, request): #Create ingredient
        serializer = IngredientSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk): #Updates ingredient
        try:
            ingredient = Ingredient.objects.get(pk = pk)
        except Ingredient.DoesNotExist:
            return Response({'error':'Ingredient not found'}, status=status.HTTP_404_NOT_FOUND)
    

        serializer = RecipeSerializer(ingredient, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            ingredient = Ingredient.objects.get(pk = pk)
        except Ingredient.DoesNotExist:
            return Response({'error':'Ingredient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        ingredient.delete
        return Response({'message': 'Ingredient deleted successfully'}, status = status.HTTP_204_NO_CONTENT)
    
class CategoryRecipe(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets category
        try:
            category = Category.objects.get(pk = pk)
        except Category.DoesNotExist:
            return Response({'error':'Category could not be found'}, status= status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(category)
        return Response({category.name : serializer.data})
    
    def post(self, request): #Create category
        serializer = CategorySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk): #Updates ingredient
        try:
            category = Category.objects.get(pk = pk)
        except Category.DoesNotExist:
            return Response({'error':'Category not found'}, status=status.HTTP_404_NOT_FOUND)
    

        serializer = RecipeSerializer(category, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            category = Category.objects.get(pk = pk)
        except Category.DoesNotExist:
            return Response({'error':'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        category.delete
        return Response({'message': 'Category deleted successfully'}, status = status.HTTP_204_NO_CONTENT)






