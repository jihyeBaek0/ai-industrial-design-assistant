# Deployment Guide

This guide explains how to deploy AI Industrial Design Assistant as a public web application.

The app is built with Flask and can be deployed on platforms that support Python web services.

## Current Deployment Preparation

The project includes:

- `requirements.txt`

- `Procfile`

- `gunicorn`

- Flask app entry point in `app.py`

The production start command is:

```bash

gunicorn app:app

```

## Recommended Platform

Render is a beginner-friendly option for deploying this Flask application.

## Render Deployment Settings

Recommended settings:

```text

Service Type: Web Service

Runtime: Python

Build Command: pip install -r requirements.txt

Start Command: gunicorn app:app

Branch: main

```

## Step-by-Step Render Deployment

1. Create or log in to a Render account.

2. Click **New**.

3. Choose **Web Service**.

4. Connect the GitHub repository.

5. Select:

```text

jihyeBaek0/ai-industrial-design-assistant

```

6. Use the following settings:

```text

Build Command:

pip install -r requirements.txt

```

```text

Start Command:

gunicorn app:app

```

7. Choose a free or starter instance.

8. Click **Create Web Service**.

9. Wait for the first deployment to finish.

10. Open the generated Render URL.

## Environment Variables

The current version does not require an OpenAI API key because it uses placeholder data.

Future OpenAI API integration will require:

```env

OPENAI_API_KEY=your_openai_api_key_here

```

The real `.env` file should never be committed to GitHub.

## Local vs Public URL

Local development URL:

```text

[http://127.0.0.1:5000/](http://127.0.0.1:5000/)

```

Public deployment URL example:

```text

[https://ai-industrial-design-assistant.onrender.com](https://ai-industrial-design-assistant.onrender.com)

```

## Deployment Checklist

Before deploying:

- The app runs locally

- `python -m pytest` passes

- GitHub Actions CI passes

- `requirements.txt` is updated

- `Procfile` exists

- No secret keys are committed

- README is up to date

## Future Improvements

Planned deployment improvements:

- Add deployed app link to README

- Add deployment status to documentation

- Add environment variable setup for OpenAI API

- Add production error handling

- Add v1.0 release after public deployment