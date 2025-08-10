// This file contains Python code examples that the AI can use to demonstrate its capabilities

export const pythonExamples = {
  dataAnalysis: `
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load data
df = pd.read_csv('data.csv')

# Basic exploration
print(df.head())
print(df.describe())

# Check for missing values
print(df.isnull().sum())

# Data visualization
plt.figure(figsize=(12, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('Correlation Matrix')
plt.show()

# Feature engineering
df['new_feature'] = df['feature1'] / df['feature2']

# Split data for machine learning
from sklearn.model_selection import train_test_split
X = df.drop('target', axis=1)
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
`,

  machineLearning: `
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Create a pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train the model
pipeline.fit(X_train, y_train)

# Make predictions
y_pred = pipeline.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.4f}')
print('\\nClassification Report:')
print(classification_report(y_test, y_pred))
print('\\nConfusion Matrix:')
print(confusion_matrix(y_test, y_pred))
`,

  webScraping: `
import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL to scrape
url = 'https://example.com/products'

# Send a request to the website
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Extract data
products = []
for product in soup.select('.product-item'):
    name = product.select_one('.product-name').text.strip()
    price = product.select_one('.product-price').text.strip()
    rating = product.select_one('.product-rating').text.strip()
    
    products.append({
        'name': name,
        'price': price,
        'rating': rating
    })

# Create a DataFrame
df = pd.DataFrame(products)
print(df.head())

# Save to CSV
df.to_csv('products.csv', index=False)
`,

  webApp: `
from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from request
    data = request.json
    
    # Convert to DataFrame
    input_df = pd.DataFrame([data])
    
    # Make prediction
    prediction = model.predict(input_df)[0]
    
    # Return prediction
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
`,

  deepLearning: `
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define model
model = Sequential([
    Conv2D(16, 3, padding='same', activation='relu', input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)),
    MaxPooling2D(),
    Conv2D(32, 3, padding='same', activation='relu'),
    MaxPooling2D(),
    Conv2D(64, 3, padding='same', activation='relu'),
    MaxPooling2D(),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Compile model
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=45,
    width_shift_range=.15,
    height_shift_range=.15,
    horizontal_flip=True,
    zoom_range=0.5
)

# Load data
train_generator = train_datagen.flow_from_directory(
    batch_size=BATCH_SIZE,
    directory=train_dir,
    shuffle=True,
    target_size=(IMG_HEIGHT, IMG_WIDTH),
    class_mode='binary'
)

# Train model
history = model.fit(
    train_generator,
    steps_per_epoch=total_train // BATCH_SIZE,
    epochs=EPOCHS,
    validation_data=validation_generator,
    validation_steps=total_val // BATCH_SIZE
)
`
};