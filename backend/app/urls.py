from django.contrib.auth.models import User
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers, serializers, viewsets
from recipes import views


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
 
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('account/', include('allauth.urls')),
    path('', include('recipes.urls')),
    path('get_recipe_list/', views.get_recipe_list),
    path('recipes/', views.RecipeView.as_view(), name='create_recipe'),
    path('recipes/<int:pk>/', views.RecipeView.as_view(), name='get_update_delete_recipe'),
    path('ingredients/', views.IngredientRecipe.as_view(), name='create_recipe'),
    path('ingredients/<int:pk>/', views.IngredientRecipe.as_view(), name='get_create_delete_recipe'),
    path('categorys/', views.CategoryRecipe.as_view(), name='create_category'),
    path('category/<int:pk>/', views.CategoryRecipe.as_view(), name='get_create_delete_category')
]