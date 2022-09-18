from pokemon.models import Pokemon
import csv


def run():
    with open('pokemon.csv') as file:
        reader = csv.reader(file)
        # next(reader)  # Advance past the header

        Pokemon.objects.all().delete()

        for row in reader:
            print(row)

            pokemon = Pokemon(name=row[0],
                              hp=row[1],
                              attack=row[2],
                              defense=row[3],
                              type=row[4])
            pokemon.save()
