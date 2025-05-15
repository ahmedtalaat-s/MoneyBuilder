# Money Builder

**Money Builder** is an interactive educational web application designed to teach children financial literacy through structured lessons, quizzes, animations, and sound effects. It uses a gamified learning flow to keep kids engaged while ensuring they learn lessons in the correct order.

> This project was developed as a **freelance job**. All educational content and API endpoints were provided by a backend developer on the same team.

## Features

- **Home Page**:
  - Publicly accessible to both guests and logged-in users.
  - Provides an overview of the platform and its goals.
  - Users cannot access learning content unless logged in.

- **Authentication (Login / Sign Up)**:
  - Users must log in or register to access lessons.
  - Authentication is handled through API integration with the backend.
    
### User Role (Kids / Learners)
- **Lessons Flow**:
  - Lessons are **locked** until the user finishes the previous one.
  - Clicking on a locked lesson triggers:
    - A **lock animation**

- **Quizzes**:
  - Each lesson ends with a quiz fetched from the backend.
  - Only after answering the quiz correctly, the next lesson becomes unlocked.

- **Progression Animation**:
  - After passing a quiz:
    - A "Next Lesson" button appears
    - User is redirected to the lessons list
    - The next lesson's lock animates **open**
    - A **unlock sound effect** plays
    - User is then navigated into the next lesson

### Admin Role
- **Admin Dashboard**:
  - Admin users have access to additional features:
    - View all existing lessons
    - **Add new lessons**
    - **Edit lesson content**
    - **Update quiz questions**
  - Admin actions are protected and accessible only by authenticated users with the `admin` role.


## Technologies Used

- **Angular** – Frontend framework
- **Backend REST APIs** – All content (lessons, quizzes, auth) is retrieved from backend services
- **CSS / HTML** – Layout and styles
