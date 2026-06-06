# React Fraud-Proof Signup Form 🛡️

A modern, glassmorphic React signup form that blocks disposable and temporary email addresses in real-time. Built to protect SaaS platforms from free trial abuse and fake accounts.

![Hero Banner](https://img.shields.io/badge/Security-Anti--Fraud-blue?style=for-the-badge&logo=shield)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## The Problem
Fake signups using temporary email services (like Mailinator, Yopmail, 10MinuteMail) pollute your lead database, distort your analytics, and consume valuable server resources.

## The Solution
This template integrates a beautiful, responsive React component with the [Disposable-Shield Email Validator API](https://rapidapi.com/) to block **6,776+ known disposable domains** in milliseconds before the user can even click submit.

### Features ✨
- 🎨 **Premium UI**: Glassmorphism design, vibrant gradients, and micro-animations.
- ⚡ **Real-time Validation**: Validates the email domain instantly on blur.
- 🔒 **Fraud Protection**: Blocks over 6,700 disposable email providers.
- 📱 **Fully Responsive**: Looks great on desktop and mobile.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/tu-usuario/react-fraud-signup-form.git
   cd react-fraud-signup-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your Free API Key**
   - Go to [Disposable-Shield on RapidAPI](https://rapidapi.com/)
   - Subscribe to the **Free Basic Plan** (200 requests/month).
   - Copy your `X-RapidAPI-Key`.

4. **Add your API Key**
   Open `src/App.jsx` and replace `"TU_RAPIDAPI_KEY"` with your actual key.

5. **Run the app**
   ```bash
   npm run dev
   ```

## How it works under the hood
The form uses an `onBlur` event handler on the email input. When the user finishes typing their email, it sends a lightning-fast request to the Disposable-Shield Edge API. If the API returns `es_desechable: true`, the form disables the submit button and shows a friendly error message, preventing the fraudulent signup.

---
**License**: MIT - Feel free to use this in your commercial SaaS applications!
