# Mon Siège à Rêve - Cinema Booking App

Mon Siège à Rêve is a cinema booking application that allows users to reserve seats for movie sessions. The app provides a seamless experience for booking seats, viewing available sessions, and managing bookings.

## Features

- User Authentication: Users can create accounts, log in, and purchase cinema tickets.
- Movie Sessions: Display a list of available movie sessions with dates, times, and prices.
- Session Details: View detailed information about a specific movie session.
- Booking Seats: Select and reserve seats for a specific session.
- Special Screenings: Administrators can add special screenings with unique prices.
- Purchase History: Users can view their booking history and the total amount spent.

## Technologies Used

- Django: The backend framework used to create the API for managing movie sessions and user bookings.
- Django Rest Framework: An extension for Django to simplify building APIs.
- React: The frontend framework used to create a dynamic user interface for the cinema app.
- Axios: A library used for making API calls from React components.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/mon-siege-a-reve.git
cd mon-siege-a-reve
```

2. Backend (Django - API):


- Apply the database migrations:

```bash
python manage.py migrate
```

- Create a superuser for accessing the Django admin:

```bash
python manage.py createsuperuser
```

- Run the development server:

```bash
python manage.py runserver
```

3. Frontend (React - Frontend):

- Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

- Install the required Node.js packages:

```bash
npm install
```

- Run the React development server:

```bash
npm start
```

4. Access the app:

- The Django API is running at: `http://localhost:8000/`
- The React frontend is running at: `http://localhost:3000/`

## Contributors

- Arnaud Lagarde <https://github.com/arnaudlagarde>
- Nadim Hamimid <https://github.com/NadimHipssi>
- Pierre-Antoine Samuel <https://github.com/SamuelPa09>
