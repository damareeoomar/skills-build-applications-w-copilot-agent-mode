from django.contrib import admin
from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'activity_type', 'user', 'timestamp')
    list_filter = ('activity_type', 'timestamp')
