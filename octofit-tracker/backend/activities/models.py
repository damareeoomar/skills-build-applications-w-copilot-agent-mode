from django.db import models
from django.conf import settings


class Activity(models.Model):
    ACTIVITY_CHOICES = [
        ('run', 'Run'),
        ('walk', 'Walk'),
        ('cycle', 'Cycle'),
        ('swim', 'Swim'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )
    activity_type = models.CharField(max_length=32, choices=ACTIVITY_CHOICES)
    duration_minutes = models.PositiveIntegerField(default=0)
    distance_km = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.activity_type} @ {self.timestamp} ({self.user})"
