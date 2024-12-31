def extract_positive_numbers(param1, param2):
    result = []
    result = []

    # Check if param1 is a positive number
    if isinstance(param1, (int, float)) and param1 > 0:
        result.append(param1)

    # Check if param2 is a positive number
    if isinstance(param2, (int, float)) and param2 > 0:
        result.append(param2)

    return result

# Example usage:
param1 = input("Enter the first parameter: ")
param2 = input("Enter the second parameter: ")

try:
    param1 = float(param1)
    param2 = float(param2)
    positive_numbers = extract_positive_numbers(param1, param2)
    if not positive_numbers:
        print("No positive numbers found.")
    else:
        print("Positive numbers:", positive_numbers)
except ValueError:
    print("Invalid input. Please enter numeric values.")