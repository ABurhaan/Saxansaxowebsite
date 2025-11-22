# Saxansaxo Technology Website ✨

A **magical, one-of-a-kind** website for Saxansaxo Technology built with Next.js and Django. This is not just a website—it's a digital experience that will leave visitors in awe.

## 🌟 Magical Features

- ✨ **Advanced Particle System** - Interactive particle network with dynamic connections
- 🎭 **3D Animations** - Parallax effects and 3D card transforms that respond to mouse movement
- 🎨 **Morphing Blobs** - Animated background elements that continuously transform
- 💎 **Glassmorphism** - Modern glass-effect components with backdrop blur
- 🌈 **Animated Gradients** - Dynamic color-shifting gradients throughout
- 🎯 **Custom Typography** - Unique fonts (Orbitron, Space Grotesk, JetBrains Mono)
- ⚡ **Neon Effects** - Glowing neon text and borders with custom CSS animations
- 🎪 **Scroll Animations** - Elements that reveal and animate as you scroll
- 🎨 **Magical Color Palette** - Custom neon colors (cyan, purple, pink, yellow, green)
- 📱 **Fully Responsive** - Beautiful on all devices
- 🚀 **Performance Optimized** - Fast loading with optimized animations

## Project Structure

```
saxansaxo_website/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── package.json  # Frontend dependencies
└── backend/          # Django backend application
    ├── saxansaxo/    # Django project settings
    └── api/          # REST API application
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- pip

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## API Endpoints

- `GET /api/health/` - Health check endpoint
- `GET /api/services/` - List all services
- `POST /api/contact/` - Submit a contact message
- `GET /api/contact/` - List all contact messages (admin)

## Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **React Intersection Observer** - Scroll-triggered animations
- **Lucide React** - Beautiful icon library
- **Custom CSS Animations** - Unique keyframe animations

### Backend
- Django 4.2
- Django REST Framework
- Django CORS Headers

## Development

### Frontend Development
The frontend uses Next.js with the App Router. Components are located in the `components/` directory and pages in the `app/` directory.

### Backend Development
The backend uses Django REST Framework. API endpoints are defined in `api/urls.py` and views in `api/views.py`.

## Production Deployment

Before deploying to production:

1. Update `SECRET_KEY` in `backend/saxansaxo/settings.py`
2. Set `DEBUG = False` in production
3. Configure proper `ALLOWED_HOSTS`
4. Set up a production database (PostgreSQL recommended)
5. Configure environment variables
6. Set up static file serving
7. Configure CORS settings for your domain

## License

Copyright © 2024 Saxansaxo Technology. All rights reserved.

