# Admin User Setup Guide

## How to Create an Admin User

Only admin users can access the CMS dashboard. Regular users who register through the signup page will NOT have admin access.

### Method 1: Using Django Admin (Recommended)

1. Start the Django server:
   ```bash
   cd backend
   source venv/bin/activate
   python manage.py runserver
   ```

2. Go to `http://localhost:8000/admin`

3. If you don't have a superuser yet, create one:
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create your admin account.

4. Log in to the Django admin panel with your superuser credentials.

5. To make an existing user an admin:
   - Go to "Users" in the admin panel
   - Click on the user you want to make admin
   - Check the "Staff status" checkbox
   - Optionally check "Superuser status" for full admin rights
   - Click "Save"

### Method 2: Using Django Shell

1. Open Django shell:
   ```bash
   cd backend
   source venv/bin/activate
   python manage.py shell
   ```

2. Run these commands:
   ```python
   from django.contrib.auth.models import User
   
   # Find the user
   user = User.objects.get(username='your_username')
   
   # Make them staff/admin
   user.is_staff = True
   user.is_superuser = True  # Optional, for full admin rights
   user.save()
   
   # Verify
   print(f"User {user.username} is now admin: {user.is_staff}")
   ```

### Method 3: Using Django Management Command

Create a custom management command if you need to automate this process.

## Security Notes

- Regular users who register through `/register` will NOT have admin access
- Only users with `is_staff=True` or `is_superuser=True` can access `/cms`
- The CMS link in the navbar only appears for admin users
- Non-admin users trying to access `/cms` will be redirected to the home page

## Testing Admin Access

1. Create a regular user account through the signup page
2. Try to access `/cms` - you should be redirected
3. Create an admin user using one of the methods above
4. Log in with the admin account
5. You should now see the "CMS" link in the navbar
6. You should be able to access `/cms` without being redirected

