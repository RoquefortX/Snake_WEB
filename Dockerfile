FROM python:3.12-slim

RUN useradd -m appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

USER appuser

CMD ["python", "app.py"]
