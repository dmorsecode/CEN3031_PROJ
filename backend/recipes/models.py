from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    carbon_emission = models.DecimalField(max_digits=5, decimal_places=2)  # Carbon emision measures in kg

    def __str__(self):
        return self.name
    
class Recipe(models.Model):
    title = models.CharField(max_length=100)
    ingredients = models.ManyToManyField(Ingredient, related_name='recipe')
    total_emission = models.DecimalField(max_digits=8, decimal_places=2)  #Total emission of a recipe

    def __str__(self):
        return self.title
    
