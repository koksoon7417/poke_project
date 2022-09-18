from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL  # auth.User

# Create your models here.


class Pokemon(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=200)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=200)
    level = models.IntegerField(null=True)

    def __str__(self):
        return self.name
