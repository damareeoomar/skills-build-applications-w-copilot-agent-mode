#!/usr/bin/env python3
"""
Wrapper to ensure Django settings are configured before importing models or
running management commands. Use this instead of calling management commands
directly when you encounter "settings are not configured" errors.

Usage examples (run from repository root):
  python octofit-tracker/backend/run_with_settings.py migrate
  python octofit-tracker/backend/run_with_settings.py makemigrations
  python octofit-tracker/backend/run_with_settings.py test
  python octofit-tracker/backend/run_with_settings.py runserver 0.0.0.0:8000
"""
import os
import sys

# Respect existing environment value if set; otherwise default to project settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')

try:
    import django
    from django.core.management import execute_from_command_line
except Exception:
    sys.stderr.write(
        "Error importing Django. Make sure the virtualenv is activated and requirements are installed.\n"
    )
    raise

# Configure Django
django.setup()

# If no args given, show help
if len(sys.argv) == 1:
    sys.argv.append('help')

execute_from_command_line(sys.argv)
