from rest_framework import generics
from pokemon.serializers import PokemonSerializer
from pokemon.models import Pokemon

# Create your views here.


class PokemonUnownedListView(generics.ListAPIView):
    """
    A GET request here should return a serialised list of
    all the pokemon that the user does not currently own
    """
    queryset = Pokemon.objects.all().filter(user__isnull=True)
    serializer_class = PokemonSerializer


pokemon_unowned_view = PokemonUnownedListView.as_view()


class MyPokemonListView(generics.ListAPIView):
    """
    A GGET request here should return a serialised list of the
    pokemon owned by the user
    """
    serializer_class = PokemonSerializer

    def get_queryset(self):
        queryset = Pokemon.objects.all()
        return queryset.filter(user=self.request.user)


my_pokemon_list_view = MyPokemonListView.as_view()


class PokemonListView(generics.ListAPIView):
    """
    A GET request here should return a serialised list of all
    pokemon in the dataset
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer


pokemon_list_view = PokemonListView.as_view()


class PokemonAddView(generics.UpdateAPIView):
    """
    A POST request here should add a pokemon to the user’s
    collection
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        level = serializer.validated_data.get('level') or None
        if level is None:
            serializer.save(user=self.request.user)
        else:
            serializer.save(user=self.request.user, level=level)


pokemon_add_view = PokemonAddView.as_view()


class PokemonReleaseView(generics.UpdateAPIView):
    """
    A POST request here should allow a user to discard
    one of his pokemons in his collection
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save(user=None)


pokemont_release_view = PokemonReleaseView.as_view()
