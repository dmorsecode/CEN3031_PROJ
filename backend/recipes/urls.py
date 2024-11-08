from django.urls import path
from . import views

urlpatterns = [
    #path('home/', views.home, name='home'),
    #path('logoout', views.logout_view),
    path('recipes/', views.RecipeCreate.as_view(), name='recipe-create-view'),
    path('ingredient/', views.IngredientCreate.as_view(), name='ingredient-create-view'),
    path('category/', views.CategoryCreate.as_view(), name='category-create-view'),
    path('recipes/edit/<int:pk>/', views.UpdateEmissions.as_view(), name='emission-calculate-view'),
    path('recipes/<int:pk>/', views.ViewRecipe.as_view(), name='recipe-view')
]