# review/admin.py

from django.contrib import admin

# Register your models here.
# from .models import CyclingRoad, Review
from .models import Review

# admin.site.register(CyclingRoad)

# admin.site.register(Review)
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'user',
        'rating',
        'is_deleted',
        'created_at',
        'updated_at',
    )
    list_filter = ('is_deleted', 'rating', 'created_at')
    search_fields = ('title', 'body', 'user__username')