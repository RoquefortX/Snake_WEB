from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """Render the main game page."""
    return render_template('index.html')


@app.route('/health')
def health():
    """Health check endpoint."""
    return {'status': 'ok'}


if __name__ == '__main__':
    app.run(debug=True)
