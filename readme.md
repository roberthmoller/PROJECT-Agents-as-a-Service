# Agents-as-a-Service

Agents-as-a-Service is a web application that allows you to define agents with specific tasks and personalities. You can also equip these agents with custom-made tools in Python. Interact with the agents individually or in groups to achieve your desired outcomes.

## Features

- Define agents with tasks and personalities.
- Create custom tools in Python for your agents.
- Interact with agents individually or in groups.
- Web-based interface for easy interaction.

## Project Structure

The project consists of two main parts:
1. **Website**: The front-end built with SvelteKit.
2. **Functions**: The back-end built with Python and FastAPI, deployed as Firebase functions.

## Setup Instructions

### Functions Setup

1. **Navigate to the functions directory**:
   ```bash
   cd functions
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Set environment variables**:
    - `OPENAI_API_KEY`
    - `GROQ_API_KEY`

### Website Setup

1. **Navigate to the website directory**:
   ```bash
   cd website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set environment variables**:
    - `PUBLIC_ENVIRONMENT`
    - `PUBLIC_FORM_ACCESS_KEY`

## Running the Project

To run the entire project locally, use the Firebase emulator:

```bash
firebase emulators:start
```

This command will start the Firebase emulators for both the website and the functions, allowing you to test the full functionality of the application locally.

## CI/CD Pipeline

The project includes a GitHub Actions workflow for continuous integration and deployment. The workflow performs the following steps:

1. **Checkout the repository**.
2. **Set up Node.js and Python environments**.
3. **Install dependencies for the website and functions**.
4. **Build and deploy the SvelteKit website**.
5. **Deploy the Python FastAPI Firebase functions**.

The pipeline is triggered on pull requests and merges to the `main` branch.

## License

Agents-as-a-Service is licensed under the MIT License. See the [LICENSE](licence.md) file for more information.
