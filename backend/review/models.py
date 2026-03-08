from django.db import models

# Create your models here.
from django.conf import settings
from django.utils import timezone

# class CyclingRoad(models.Model):
#     name = models.CharField(max_length=255)
#     location = models.CharField(max_length=255, blank=True)
#     length_km = models.FloatField()
#     difficulty_level = models.CharField(max_length=50)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name
    
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    # cycling_road = models.ForeignKey(CyclingRoad, on_delete=models.CASCADE, related_name='reviews')
    title = models.CharField(max_length=255, default="")
    body = models.TextField(default="")
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def delete(self, using=None, keep_parents=False):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.title} ({self.user.username})"
        # return f"Review by {self.user} (rating: {self.rating})"