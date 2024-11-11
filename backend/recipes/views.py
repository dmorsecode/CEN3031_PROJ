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

@api_view(['POST'])
@permission_classes([AllowAny])  # This will bypass the permission check
def create_recipe(request):
    serializer = RecipeSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])  # This will bypass the permission check
def get_recipe_list(request): #Get recipe list
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many= True)
    return Response({'recipe': serializer.data})

@api_view(['PUT'])
@permission_classes([AllowAny])  # This will bypass the permission check
def update_recipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk = pk)
    except Recipe.DoesNotExist:
        return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
    

    serializer = RecipeSerializer(recipe, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status= status.HTTP_200_OK)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([AllowAny])  # This will bypass the permission check
def delete_recipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk = pk)
    except Recipe.DoesNotExist:
        return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
    recipe.delete()
    return Response({'message': 'Recipe deleted successfully'}, status = status.HTTP_204_NO_CONTENT)




