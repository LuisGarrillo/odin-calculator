# Odin calculator
Final project for Odin's Foundation course! Functional calculator capable of adding, subtracting, multiplying and dividing numbers.

# Check it out!

You can test the Odin Calculator yourself here: 
https://luisgarrillo.github.io/odin-calculator/

## Features

- Calculator font!
- Functional DEL and AC buttons
- Long mathematical expressions support
- Error handling

## Implementation

The input is created by pressing the numbers and operator buttons, use the del button to delete one character and the AC button to clear the screen.

Once the user hits the equals button, the input is taken as a string.

Then the string goes under a syntax analysis made for evaluating mathematical expressions with the supported operators, creating a binary tree to evaluate each operation.

At this point, the Binary tree is then evaluated from top to bottom, where the operations at the bottom (the ones with higher priority) are performed first.

Finally, the result of the tree evaluation is shown in the output field.





