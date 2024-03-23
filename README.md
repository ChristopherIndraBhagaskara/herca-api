# A Full-stack web application in React and Laravel REST API.

This repository built using Laravel as the backend and React as the frontend.

## Installation

1. Clone this repository to your local system:

    ```bash
    git clone https://github.com/ChristopherIndraBhagaskara/herca-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd herca-api
    ```

3. Install dependencies using Composer for the backend and npm (or yarn) for the frontend:

    ```bash
    composer install
    npm install
    ```

4. Copy the `.env.example` file to `.env` and configure the database and other settings:

    ```bash
    cp .env.example .env
    ```

5. Copy the `react/.env.example` file to `react/.env` and configure VITE_API_BASE_URL settings:

    ```bash
    VITE_API_BASE_URL=http://localhost:8000
    ```

6. Generate the application key and run migrations:

    ```bash
    php artisan key:generate
    php artisan migrate
    ```

7. Run the Laravel and React servers:

    ```bash
    php artisan serve
    npm run dev
    ```

    The application can be accessed at [http://localhost:3000](http://localhost:3000).

## Project Structure

-   `/`: Directory containing Laravel backend code.
-   `/react`: Directory containing React frontend code.

## Technologies Used

-   **Backend**: Laravel version 10.10
-   **Frontend**: React version 18.2.0
-   **Database**: MySQL
