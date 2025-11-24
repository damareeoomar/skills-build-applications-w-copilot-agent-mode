OctoFit Tracker — Backend README

Quick start (from repository root):

1. Create & activate virtualenv (if you haven't already):

```bash
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
```

2. Install requirements:

```bash
pip install --upgrade pip setuptools wheel
pip install -r octofit-tracker/backend/requirements.txt
```

3. Run migrations and start development server:

```bash
python octofit-tracker/backend/manage.py migrate
python octofit-tracker/backend/manage.py createsuperuser
python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000
```

Notes:
- This project uses SQLite by default for local development. If you prefer MongoDB/djongo, update `DATABASES` in `octofit-tracker/backend/octofit_tracker/settings.py`.
- Never change directories when following agent-run commands; point to paths from the repository root.
