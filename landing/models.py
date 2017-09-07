from django.db import models

# Create your models here.

class Hello(models.Model):
    name = models.CharField(max_length=70)
    email = models.EmailField()
    message = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
