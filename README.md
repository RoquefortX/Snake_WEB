# Snake_WEB

A classic Snake game built with Flask, HTML5 Canvas, and JavaScript.

## Features

- Classic snake gameplay
- Score tracking with high score persistence
- Pause/Resume functionality
- Responsive design
- Keyboard controls (arrow keys)
- Visual snake head with eyes
- Game over detection

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/RoquefortX/Snake_WEB.git
cd Snake_WEB
```

### 2. Create and activate virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

The game will be available at `http://127.0.0.1:5000`

## How to Play

- Use arrow keys (↑ ↓ ← →) to control the snake
- Eat the red food to grow and earn points
- Don't hit the walls or yourself!
- Press Space to pause/resume
- Click "Start Game" to begin
- Click "Reset" to restart the game

## Project Structure

```
Snake_WEB/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Game HTML template
└── static/
    ├── css/
    │   └── style.css     # Game styling
    └── js/
        └── game.js       # Game logic
```

## Technologies Used

- **Backend**: Flask 3.0.0
- **Frontend**: HTML5 Canvas, CSS3, Vanilla JavaScript
- **Testing**: pytest 7.4.3