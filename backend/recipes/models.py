from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    carbon_emission = models.DecimalField(max_digits=6, decimal_places=2, default=0)  # Carbon emission in kg
    category = models.CharField(max_length=50)  # Meat, Fruit, etc.

    def __str__(self):
        return self.name


class Recipe(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    ingredients = models.ManyToManyField(Ingredient, through= 'RecipeIngredient', related_name='recipes')
    instructions = models.TextField(max_length=3000, default='')
    prep_time = models.IntegerField()  # In minutes
    cook_time = models.IntegerField()  # In minutes
    recipe_category = models.ManyToManyField('Category', related_name='recipe_category')

    total_emission = models.DecimalField(max_digits=8, decimal_places=2, default=0)  # Total emission of a recipe

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def calculate_total_emissions(self):
        total = 0
        for ingredient in self.ingredients.all():  # You can keep this if you need the simple M2M emissions
            total += ingredient.carbon_emission * RecipeIngredient.objects.get(recipe=self, ingredient=ingredient).amount
        return total


class Category(models.Model):  # Recipe Categories
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)  # Amount in grams or liters of the specific ingredient in a recipe