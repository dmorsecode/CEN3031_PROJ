from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import logout
from django.contrib.auth.models import *
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import *
from .serializers import *
from django.http import JsonResponse

from django.core.exceptions import ValidationError

class RecipeCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    #permission_classes = [AllowAny]

class IngredientCreate(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    #permission_classes = [AllowAny]


class CategoryCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [AllowAny]


class ViewRecipe(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    #permission_classes = [AllowAny]



class UpdateEmissions(generics.RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]




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

@api_view(['GET'])
@permission_classes([AllowAny])  # This will bypass the permission check
def get_ingredient_list(request): #Get recipe list
    ingredients = Ingredient.objects.all()
    serializer = IngredientSerializer(ingredients, many= True)
    return Response({'ingredients': serializer.data})

class RecipeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets recipe
        try:
            recipe = Recipe.objects.get(pk = pk)
        except Recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except ValidationError:
            return Response({'error':'Invalid recipe ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serializer = RecipeSerializer(recipe)
        return Response({recipe.title : serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request): #Creates recipe
        try:
            serializer = RecipeSerializer(data = request.data) #Deserialize data
            serializer.is_valid(raise_exception=True) #Validate Data
            serializer.save() #Saves recipe
            permission_classes = [IsAuthenticated]

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as ve: #Handles validation errors
            return Response({
                'error':'Validation Error',
                'details': ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request, pk): #Updates recipe
        try:
            recipe = Recipe.objects.get(pk = pk)  

        except Recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = RecipeSerializer(recipe, data = request.data) #Deserializes data
            serializer.is_valid(raise_exception=True) #Validates data
            serializer.save() #Updates recipe
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except ValidationError as ve: #Handles validation errors
            return Response({
                'error':'Validation Error',
                'details': ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request, pk): #Deletes recipe
        try:
            recipe = Recipe.objects.get()

        except Recipe.DoesNotExist():
            raise serializers.ValidationError('Recipe not found')
        
        except ValidationError: 
            return Response({'error':'Invalid ingredient ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        recipe.delete()
        return Response({
            'message': 'Recipe deleted succesfully'}, status=status.HTTP_204_NO_CONTENT)

    
class IngredientRecipe(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets ingredient
        try:
            ingredient = Ingredient.objects.get(pk = pk)
        except Ingredient.DoesNotExist:
            return Response({'error':'ingredient could not be found'}, status= status.HTTP_404_NOT_FOUND)
        
        except ValidationError:
            return Response({'error':'Invalid ingredient ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serializer = IngredientSerializer(ingredient)
        return Response({ingredient.name : serializer.data}, status= status.HTTP_200_OK)
    
    def post(self, request): #Create ingredient
        try:
            serializer = IngredientSerializer(data = request.data) #Deserializes data
            serializer.is_valid(raise_exception=True) #Validate data
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as ve:
            return Response({
                'error': 'Validation Error',
                'message': ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({
                'message': 'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    def put(self, request, pk): #Updates ingredient
        try:
            ingredient = Ingredient.objects.get(pk = pk)
        except Ingredient.DoesNotExist:
            return Response({'error':'Ingredient not found'}, status=status.HTTP_404_NOT_FOUND)
    
        try:
            serializer = IngredientSerializer(ingredient, data = request.data) #Deserializes data
            serializer.is_valid(raise_exception=True) 
            serializer.save() #Updates recipe
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        except ValidationError as ve: #Handles validation errors
            return Response({
                'error':'Validation Error',
                'details': ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request, pk):
        try:
            ingredient = Ingredient.objects.get(pk = pk)
        except Ingredient.DoesNotExist:
            return Response({'error':'Ingredient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except ValidationError: 
            return Response({'error':'Invalid ingredient ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        ingredient.delete()
        return Response({'message': 'Ingredient deleted succesfully'}, status=status.HTTP_204_NO_CONTENT)
    
class CategoryRecipe(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets category
        try:
            category = Category.objects.get(pk = pk)
        except Category.DoesNotExist:
            return Response({'error':'Category could not be found'}, status= status.HTTP_404_NOT_FOUND)
        
        except ValidationError:
            return Response({'error':'Invalid category ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serializer = CategorySerializer(category)
        return Response({category.name : serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request): #Create category
        try:
            serializer = CategorySerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as ve:
            return Response({
                'error':'Validation Error',
                'message':ve.detail
            })
        
        except Exception as e:
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            })
    def put(self, request, pk):
        
        try:
            category = Category.objects.get(pk = pk)
        except Category.DoesNotExist:
            return Response({'error':'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = CategorySerializer(category, data = request.data) #Deserializes data
            serializer.is_valid(raise_exception=True) 
            serializer.save() #Updates recipe
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        except ValidationError as ve: #Handles validation errors
            return Response({
                'error':'Validation Error',
                'details': ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def delete(self, request, pk):
        try:
            category = Category.objects.get(pk = pk)
        except Category.DoesNotExist:
            return Response({'error':'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except ValidationError: 
            return Response({'error':'Invalid ingredient ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        category.delete()
        return Response({'message': 'Category deleted succesfully.'}, status=status.HTTP_204_NO_CONTENT)

class GoogleLoginView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, google_id):
        try:
            user = User.objects.get(google_id = google_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request): #Create user 
        token = request.data.get('token')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                "YOUR_GOOGLE_CLIENT_ID"
            )
            #Extracts user information from token
            google_id = idinfo['sub'] #Unique google user ID
            email = idinfo['email']
            name = idinfo.get('name', '')
            
            user, created = User.objects.get_or_create(
                google_id=google_id,
                defaults={
                    'email': email,
                    'name': name
                }
            )

            #If the user already exists, update name
            if not created:
                user.name = name
                user.save()
            
            return Response({
                'message': 'Login successful', 
                'user_id': user.id
            }, status=status.HTTP_200_OK)
        
        except ValueError:
            return Response({'error': 'Invalid token'})
        
        except Exception as e: #Catch unexpected errors
            return Response({
                'error': str(e),
                'message': 'Unexpected error occured'
                }, status = status.HTTP_200_OK)
    
    def delete(self, request, google_id):
        try:
            user = User.objects.get(google_id = google_id)
        except User.DoesNotExist:
            return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except ValidationError: 
            return Response({'error':'Invalid User ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        user.delete()
        return Response({'message': 'User deleted succesfully.'}, status=status.HTTP_204_NO_CONTENT)
    
class RecipeIngredientView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = RecipeIngredientSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except ValidationError as ve:
            return Response({
                'error':'Validation Error',
                'message':ve.detail
            })
    
        except Exception as e:
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            })
        
# The original recipe view stopped working so I made a backup
class BackupRecipeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk): #Gets recipe
        try:
            recipe = Recipe.objects.get(pk = pk)
        except Recipe.DoesNotExist:
            return Response({'error':'Category could not be found'}, status= status.HTTP_404_NOT_FOUND)
        
        except ValidationError:
            return Response({'error':'Invalid category ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serializer = RecipeSerializer(recipe)
        return Response({recipe.title : serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request): #Create recipe
        try:
            serializer = RecipeSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as ve:
            return Response({
                'error':'Validation Error',
                'message':ve.detail
            })
        
        except Exception as e:
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            })
    def put(self, request, pk):
        
        try:
            recipe = Recipe.objects.get(pk = pk)
        except Recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = RecipeSerializer(recipe, data = request.data) #Deserializes data
            serializer.is_valid(raise_exception=True) 
            serializer.save() #Updates recipe
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        except ValidationError as ve: #Handles validation errors
            return Response({
                'error':'Validation Error',
                'details': ve.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def delete(self, request, pk):
        try:
            recipe = Recipe.objects.get(pk = pk)
        except recipe.DoesNotExist:
            return Response({'error':'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except ValidationError: 
            return Response({'error':'Invalid ingredient ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e: #Generic error handling
            return Response({
                'error':'An unexpected error occured.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        recipe.delete()
        return Response({'message': 'Category deleted succesfully.'}, status=status.HTTP_204_NO_CONTENT)







