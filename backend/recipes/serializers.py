from rest_framework import serializers
from .models import Recipe, Ingredient, Category, User, RecipeIngredient
from .validators import *

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'carbon_emission', 'category']
    
    name = serializers.CharField(validators=[validate_name])
    carbon_emission = serializers.DecimalField(max_digits=8, decimal_places= 2, validators=[validate_carbon_emission])

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
    
    name = serializers.CharField(validators=[validate_name])
    description = serializers.CharField(validators=[validate_description])

class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.SlugRelatedField(
        queryset=Ingredient.objects.all(),
        slug_field='name' 
    )
    recipe = serializers.SlugRelatedField(
        queryset=Recipe.objects.all(),
        slug_field='title'  # The field used for lookups
    )
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'recipe', 'ingredient', 'amount']


class RecipeSerializer(serializers.ModelSerializer):
    total_emission = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'ingredients','instructions', 'prep_time', 'cook_time', 'recipe_category', 'total_emission', 'created_at', 'updated_at']

    def get_total_emission(self, obj):
        return obj.calculate_total_emissions
    
    title = serializers.CharField(validators=[validate_name])
    ingredients = IngredientSerializer(many=True, validators=[validate_ingredients])
    prep_time = serializers.IntegerField(validators=[validate_time])
    cook_time = serializers.IntegerField(validators=[validate_time])
    recipe_category = CategorySerializer(many=True, validators=[validate_categories])
    # total_emission = serializers.DecimalField(max_digits= 8, decimal_places=2, validators=[validate_carbon_emission])
    created_at = serializers.CharField(validators=[validate_date])
    updated_at = serializers.CharField(validators=[validate_date])

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'google_id', 'email', 'name', 'created_at']