from rest_framework import serializers
from .models import Recipe, Ingredient, Category

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'carbon_emission', 'category']

class RecipeSerializer(serializers.ModelSerializer):
    total_emission = serializers.SerializerMethodField()
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients','instructions', 'prep_time', 'cook_time', 'recipe', 'total_emission', 'created_at', 'updated_at']

    def get_total_emission(self, obj):
        return obj.calculate_total_emissions

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
