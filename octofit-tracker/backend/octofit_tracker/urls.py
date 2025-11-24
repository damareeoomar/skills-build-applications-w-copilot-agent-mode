from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.http import JsonResponse
import os

# Import viewsets from project views (do not modify views.py)
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')


def codespace_api_root(request):
    """
    Return API root URLs built from $CODESPACE_NAME when available.
    Falls back to request-based absolute URIs when $CODESPACE_NAME is not set.
    """
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev"
    else:
        # build a local absolute base (scheme + host)
        # request.build_absolute_uri('/') returns a trailing slash
        base = request.build_absolute_uri('/')[:-1]

    data = {
        'users': f"{base}/api/users/",
        'teams': f"{base}/api/teams/",
        'activities': f"{base}/api/activities/",
        'leaderboard': f"{base}/api/leaderboard/",
        'workouts': f"{base}/api/workouts/",
    }
    return JsonResponse(data)


urlpatterns = [
    path('admin/', admin.site.urls),
    # codespace-aware API root at '/'
    path('', codespace_api_root, name='api-root'),
    path('api/', include(router.urls)),
]
