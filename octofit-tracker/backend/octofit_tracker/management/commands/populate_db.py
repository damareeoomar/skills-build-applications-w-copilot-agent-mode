from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team=marvel.name),
            User(name='Iron Man', email='ironman@marvel.com', team=marvel.name),
            User(name='Batman', email='batman@dc.com', team=dc.name),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc.name),
        ]
        for user in users:
            user.save()

        # Create activities
        Activity.objects.create(user=users[0], activity_type='run', duration_minutes=30, distance_km=5.0, timestamp=timezone.now())
        Activity.objects.create(user=users[1], activity_type='cycle', duration_minutes=45, distance_km=15.0, timestamp=timezone.now())
        Activity.objects.create(user=users[2], activity_type='swim', duration_minutes=60, distance_km=2.0, timestamp=timezone.now())
        Activity.objects.create(user=users[3], activity_type='walk', duration_minutes=20, distance_km=2.5, timestamp=timezone.now())

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        # Create workouts
        Workout.objects.create(name='Morning Run', description='A quick morning run for Marvel team', suggested_for_team=marvel)
        Workout.objects.create(name='Strength Training', description='Strength workout for DC team', suggested_for_team=dc)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
