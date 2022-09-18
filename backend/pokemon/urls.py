from django.urls import path

from . import views

urlpatterns = [
    path('unownedpokemon/', views.pokemon_unowned_view),
    path('mypokemon/', views.my_pokemon_list_view),
    path('allpokemon/', views.pokemon_list_view),
    path('addpokemon/<int:pk>', views.pokemon_add_view),
    path('releasepokemon/<int:pk>', views.pokemont_release_view),
]
