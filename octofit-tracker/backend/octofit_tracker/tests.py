from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import User, Team
from django.utils import timezone


class APIRootTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        url = reverse('api-root')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn('users', resp.data)


class ModelAndListTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='TestTeam')
        self.user = User.objects.create(name='Tester', email='tester@example.com', team=self.team.name)

    def test_user_list(self):
        url = reverse('user-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(resp.data), 1)
