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
        fields = ['id', 'title', 'description', 'ingredients', 'instructions','prep_time', 'cook_time', 
                    'recipe_category', 'total_emission', 'created_at', 'updated_at']
    title = serializers.CharField(validators=[validate_name])
    ingredients = IngredientSerializer(many=True) 
    recipe_category = CategorySerializer(many=True)    
    prep_time = serializers.IntegerField(validators=[validate_time])
    cook_time = serializers.IntegerField(validators=[validate_time])
    created_at = serializers.CharField(validators=[validate_date])
    updated_at = serializers.CharField(validators=[validate_date])

    def get_total_emission(self, obj):
        return obj.calculate_total_emissions

    #Creates instances of recipe_category and recipeingredient
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients', [])
        categories_data = validated_data.pop('recipe_category', [])

        recipe = Recipe.objects.create(**validated_data)

        for ingredient_data in ingredients_data:
            ingredient_details = ingredient_data.pop('ingredient')
            ingredient, _ = Ingredient.objects.get_or_create(**ingredient_details)
            RecipeIngredient.objects.create(recipe=recipe, ingredient=ingredient, **ingredient_data)

        for category_data in categories_data:
            category, _ = Category.objects.get_or_create(**category_data)
            recipe.recipe_category.add(category)

        return recipe


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'google_id', 'email', 'name', 'created_at']