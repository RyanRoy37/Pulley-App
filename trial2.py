from joblib import load
import random

# Load your model
model = load('random_forest_model1.joblib')

def generate_random_sensor_values():
    return [
        random.choice(['1', '2', '3', '4', '5']),
        random.choice([0, 1, 2, 3, 4, 5, 6]),
        random.uniform(2000, 20000),
        random.choice([1900, 1800, 1700, 1500, 1100]),
        random.choice(['1', '2', '3', '4']),
        random.uniform(30, 50),
        random.uniform(30, 70),
        random.uniform(1, 5),
        random.choice(['1', '2', '3', '4']),
        random.choice(['1', '2', '3', '4']),
        random.choice([0.5, 0.7, 0.8, 0.4]),
        random.choice([3000, 1500, 600, 5000, 8000]),
        random.uniform(1, 40),
        random.choice(['1', '2', '3', '4']),
        random.choice(['1', '2', '3', '4']),
        random.choice([8, 6, 10, 12]),
        
    ]

# Create a list to store sensor data
sensor_data_list = []

# Generate random sensor data and append it to the list
sensor_data = generate_random_sensor_values()
sensor_data_list.append(sensor_data)

# Add more sensors as needed
# ...

# Pass the generated sensor data to your model for prediction
prediction = model.predict(sensor_data_list)

# Print the prediction
print("Model Prediction:", prediction)
