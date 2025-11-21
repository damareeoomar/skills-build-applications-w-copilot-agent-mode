import os

from django.contrib import admin
from django.urls import path, include

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.routers import DefaultRouter

# Build a codespace-aware base URL per project instructions
codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = DefaultRouter()


@api_view(['GET'])
def api_root(request, format=None):
    """Simple API root that follows the instructions' example."""
    return Response({
        'admin': reverse('admin:index', request=request, format=format),
        'api_base': base_url + '/api/'
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
