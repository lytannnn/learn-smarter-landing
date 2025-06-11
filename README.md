# WordWise – Learn English Smarter

WordWise is a pre-launch landing page and contact management system designed to gather user interest and feedback for a vocabulary-learning platform. It features a modern, animated frontend and a secure backend that processes form submissions via AJAX.

## 🚀 Features

- Preloader animation
- Responsive design
- Modal and main contact forms
- AJAX form submission (via `fetch`)
- Input validation (frontend and backend)
- Email notifications using PHPMailer (if configured)
- Backend routing via PHP

## 📁 Project Structure

WordWise/\
│\
├── index.html # Frontend landing page\
├── style.css # Main styles\
├── script.js # Frontend interactivity and form logic\
├── mail.php # PHP backend for handling form submissions\
├── README.md # This documentation\
└── (optional) vendor/ # PHPMailer (if SMTP setup is enabled)


## 🧑‍💻 Setup Instructions

1. **Clone or download the project.**

2. **Serve with a local PHP server** (e.g., using VS Code Live Server with PHP or XAMPP):
   ```bash
   php -S localhost:8000
3.  **Open in browser**:\
    Navigate to `http://localhost:8000` to view the landing page.

4.  **Configure email** (optional, for SMTP):

    -   Rename `mail.php`'s SMTP section and install [PHPMailer](https://github.com/PHPMailer/PHPMailer).

    -   Fill in your SMTP credentials for production use.

📬 Backend -- `mail.php`
-----------------------

-   Accepts `POST` requests with JSON body.

-   Validates name, email, and optionally a message.

-   Saves data to `submissions.csv` or sends an email via SMTP (if enabled).

-   Returns JSON responses with success or error messages.

✨ Frontend
----------

-   Built using HTML5, CSS3 (custom styling), and vanilla JavaScript.

-   Forms:

    -   Main contact form

    -   Modal waitlist form

-   Alerts for success/failure shown dynamically.

-   Animations on scroll and page load.

🔐 Security Notes
-----------------

-   All inputs are validated server-side.

-   You should ensure file permissions are properly set for `submissions.csv`.

-   If deploying, protect backend against abuse (e.g., rate limiting, CAPTCHA).

✅ To-Do (Suggestions)
---------------------

-   Add reCAPTCHA to prevent spam

-   Store submissions in a database instead of CSV

-   Integrate Mailchimp or ConvertKit for email list management

-   Build out the full app post-launch

📄 License
----------

MIT -- free to use and modify. Attribution appreciated.

yaml
