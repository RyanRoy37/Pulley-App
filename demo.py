import os
os.chdir("C:/sih/Datasets")
from keras.models import model_from_json
import numpy as np
import tkinter as tk
from tkinter import filedialog
from keras.preprocessing import image

json_file = open('modelcrack.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
model.load_weights("modecrackl.h5")
print("Loaded model from disk")

def classify(img_file):
    img_name = img_file
    test_image = image.load_img(img_name, target_size = (64, 64))

    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis=0)
    result = model.predict(test_image)

    if result[0][0] == 1:
        prediction = 'cracks'
    else:
        prediction = 'normal'
    print(prediction,img_name)
    
def select_image():
    file_path = filedialog.askopenfilename()
    
    if file_path:
        prediction = classify(file_path)
        

# Create a tkinter window
root = tk.Tk()
root.title("Image Classification")

# Button to select an image file
select_button = tk.Button(root, text="Select Image", command=select_image)
select_button.pack()

# Run the tkinter main loop
root.mainloop()

