from rest_framework import serializers
from pokemon.models import Pokemon


class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['user', 'pk', 'name', 'hp', 'attack', 'defense', 'type', 'level']
