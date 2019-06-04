from django.db import models


class Meeting(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tilWhen = models.DateTimeField()
    sinceWhen = models.DateTimeField()
    owner = models.ForeignKey('auth.User', related_name='meetings', on_delete=models.CASCADE)

    class Meta:
        ordering = ('id', 'created', 'sinceWhen', 'tilWhen', 'owner')
