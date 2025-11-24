from django.test import TestCase
from django.utils import timezone
from .models import Activity


class ActivityModelTest(TestCase):
    def test_create_activity(self):
        a = Activity.objects.create(
            activity_type='run', duration_minutes=30, distance_km=5.0, timestamp=timezone.now()
        )
        self.assertEqual(Activity.objects.count(), 1)
        self.assertEqual(a.activity_type, 'run')
