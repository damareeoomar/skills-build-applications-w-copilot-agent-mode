from rest_framework import generics, permissions
from .models import Activity
from .serializers import ActivitySerializer


class ActivityListCreateView(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.AllowAny]


class ActivityRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.AllowAny]
