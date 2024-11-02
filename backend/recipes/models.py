from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    carbon_emission = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Carbon emision measures in kg
    category = models.CharField(max_length=50) # Meat, Fruit, etc

    def __str__(self):
        return self.name
    
class Recipe(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    ingredients = models.ManyToManyField(Ingredient, related_name='recipe_ingredients')
    instructions = models.TextField(max_length=3000)
    prep_time = models.IntegerField() # In minutes
    cook_time = models.IntegerField() # In minutes
    recipe = models.ManyToManyField('Category', related_name='recipe_category')

    total_emission = models.DecimalField(max_digits=8, decimal_places=2, default=0)  # Total emission of a recipe

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)


    def __str__(self):
        return self.title

    @property
    def calculate_total_emissions(self):
        total = 0
        for ingredient in self.ingredients.all():
            total += ingredient.carbon_emission
        return total
    
class Category(models.Model): # Recipe Categories
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.name

    
