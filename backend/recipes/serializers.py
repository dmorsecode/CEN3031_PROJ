from rest_framework import serializers
from .models import Recipe, Ingredient, Category
from .validators import *

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'carbon_emission', 'category']
    
    name = serializers.CharField(validators=[validate_name])
    carbon_emission = serializers.CharField(validators=[validate_carbon_emission])

        
        
        # for ingredient in value:
        #     required_keys = {'id', 'name', 'carbon_emission', 'category'}
        #     missing_keys = required_keys - ingredient.keys()

        #     if missing_keys:
        #         raise serializers.ValidationError(f'Ingredient is missing required keys:{','.join(missing_keys)}')



class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients','instructions', 'prep_time', 'cook_time', 'recipe_category', 'total_emission', 'created_at', 'updated_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
