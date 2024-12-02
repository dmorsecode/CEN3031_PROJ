from rest_framework import serializers
from .models import Recipe, Ingredient, Category
from .validators import *

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'carbon_emission', 'category']
    
    name = serializers.CharField(validators=[validate_name])
    carbon_emission = serializers.CharField(validators=[validate_carbon_emission])


class RecipeSerializer(serializers.ModelSerializer):
    total_emission = serializers.SerializerMethodField()
    recipe_category = serializers.StringRelatedField(many=True)
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients','instructions', 'prep_time', 'cook_time', 'recipe_category', 'total_emission', 'created_at', 'updated_at']

    def get_total_emission(self, obj):
        return obj.calculate_total_emissions

    title = serializers.CharField(validators=[validate_name])
    ingredients = serializers.CharField(validators=[validate_ingredients])
    prep_time = serializers.CharField(validators=[validate_time])
    cook_time = serializers.CharField(validators=[validate_time])
    recipe_category = serializers.CharField(validators=[validate_categories])
    # total_emission = serializers.CharField(validators=[validate_carbon_emission])
    created_at = serializers.CharField(validators=[validate_date])
    updated_at = serializers.CharField(validators=[validate_date])

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
    
    name = serializers.CharField(validators=[validate_name])
    description = serializers.CharField(validators=[validate_description])