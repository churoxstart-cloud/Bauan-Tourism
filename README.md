# Bauan Tourism

A feature-rich, fully responsive tourism guide web application for Bauan, Batangas, Philippines. Designed to help travelers discover local culture, attractions, and marine sanctuaries, this project provides an engaging and informative experience through a modern web interface powered by Python-based functionality.

## Features

- Interactive tourism landing page
- Responsive design for desktop, tablet, and mobile
- Local attraction information and travel highlights
- Marine sanctuary and cultural content
- Django-based admin and portal structure
- Email-based account workflows and dashboard features
- MySQL-backed data model for system records

## Tech Stack

- Python
- Django 4.x
- MySQL
- HTML5
- CSS3
- JavaScript
- PyMySQL
- OpenPyXL

## Project Structure

```text
Bauan-Tourism/
├── bauan_portal/        # Django project configuration
├── core/                # Main application logic, models, views, templates, static assets
├── manage.py            # Django management entry point
├── requirements.txt     # Python dependencies
├── .vscode/             # Editor configuration
├── venv/                # Local virtual environment (if present)
└── README.md            # Project documentation
```

## Local Setup

### Prerequisites

- Python 3.10+
- MySQL Server
- Virtual environment tool (`venv` or `virtualenv`)

### Installation

1. Clone the repository

```bash
git clone https://github.com/churoxstart-cloud/Bauan-Tourism.git
cd Bauan-Tourism
```

2. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Configure environment variables for Django and database connection

```bash
export DJANGO_SECRET_KEY=your-secret-key
export DJANGO_DEBUG=True
export DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
export DB_NAME=bauan_tourism
export DB_USER=root
export DB_PASSWORD=
export DB_HOST=127.0.0.1
export DB_PORT=3306
```

5. Apply migrations

```bash
python manage.py migrate
```

6. Run the development server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` to access the application.

## Production Deployment Notes

This repository is a Django application, not a static HTML site. It requires a Python runtime and a database. Because of this, standard static hosting platforms such as Vercel are not the best deployment target for this project.

Recommended hosting approaches:

- Render (good for Django apps)
- Railway (good for Python + database apps)
- VPS / cloud hosting (for full custom deployment)
- Hostinger VPS (possible, but requires Django + MySQL + Gunicorn + Nginx setup)

After migrating the database, seed the initial data and accounts:

```bash
python manage.py load_resorts
python manage.py load_rooms
python manage.py create_resort_accounts
python manage.py createsuperuser
```

`create_resort_accounts` creates one approved resort-staff account per Resort (default password: `Bauan@2026`, username = slug of the resort name). `createsuperuser` creates the MTO/admin account.

## Database

The project is configured to use MySQL with Django via PyMySQL. The default settings in `bauan_portal/settings.py` expect database environment variables such as:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

## Admin and User Features

The project includes Django admin integration, system users, dashboard flows, and content management functionality. If you are making changes to the app logic or database models, run migrations and test the admin workflow after updates.

## Recent Updates

- UI refresh across landing, login, register, get-started, public home, bot questions, and recycle bin pages.
- Removed emoji decorations from recycle bin UI.
- Simplified monthly report room-count label.
- Added deployment seed commands documentation.
- User/account management and form updates in `core/forms.py` and `core/views.py`.

This project is intended for educational and tourism-related use. Please check the repository status or project owner for explicit licensing terms before commercial deployment.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

Repository: https://github.com/churoxstart-cloud/Bauan-Tourism
