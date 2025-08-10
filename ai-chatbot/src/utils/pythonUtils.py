"""
This file contains utility functions for Python programming tasks.
The AI chatbot can use these as examples or reference when answering Python-related questions.
"""

import os
import json
import re
import datetime
from typing import List, Dict, Any, Optional, Union, Tuple


def file_operations(file_path: str, mode: str = 'r', content: Optional[str] = None) -> Optional[str]:
    """
    Perform file operations (read, write, append) based on the mode.
    
    Args:
        file_path: Path to the file
        mode: File operation mode ('r' for read, 'w' for write, 'a' for append)
        content: Content to write or append (required for 'w' and 'a' modes)
        
    Returns:
        File content if mode is 'r', None otherwise
    """
    try:
        with open(file_path, mode) as file:
            if mode == 'r':
                return file.read()
            elif mode in ('w', 'a') and content is not None:
                file.write(content)
                return None
    except Exception as e:
        print(f"Error performing file operation: {e}")
        return None


def parse_json_data(json_str: str) -> Dict[str, Any]:
    """
    Parse JSON string into a Python dictionary.
    
    Args:
        json_str: JSON string to parse
        
    Returns:
        Parsed JSON as a dictionary
    """
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return {}


def extract_data_with_regex(text: str, pattern: str) -> List[str]:
    """
    Extract data from text using regex pattern.
    
    Args:
        text: Text to search in
        pattern: Regex pattern to match
        
    Returns:
        List of matched strings
    """
    try:
        matches = re.findall(pattern, text)
        return matches
    except re.error as e:
        print(f"Error in regex pattern: {e}")
        return []


def calculate_statistics(numbers: List[float]) -> Dict[str, float]:
    """
    Calculate basic statistics for a list of numbers.
    
    Args:
        numbers: List of numbers
        
    Returns:
        Dictionary with calculated statistics
    """
    if not numbers:
        return {"error": "Empty list provided"}
    
    try:
        n = len(numbers)
        total = sum(numbers)
        mean = total / n
        
        # Sort for median and percentiles
        sorted_nums = sorted(numbers)
        
        # Calculate median
        if n % 2 == 0:
            median = (sorted_nums[n//2 - 1] + sorted_nums[n//2]) / 2
        else:
            median = sorted_nums[n//2]
        
        # Calculate variance and standard deviation
        variance = sum((x - mean) ** 2 for x in numbers) / n
        std_dev = variance ** 0.5
        
        # Calculate min, max, range
        min_val = min(numbers)
        max_val = max(numbers)
        data_range = max_val - min_val
        
        return {
            "count": n,
            "mean": mean,
            "median": median,
            "min": min_val,
            "max": max_val,
            "range": data_range,
            "variance": variance,
            "std_dev": std_dev
        }
    except Exception as e:
        return {"error": f"Error calculating statistics: {e}"}


def format_datetime(dt: Optional[datetime.datetime] = None, 
                   format_str: str = "%Y-%m-%d %H:%M:%S") -> str:
    """
    Format a datetime object or current time using the specified format.
    
    Args:
        dt: Datetime object to format (default: current time)
        format_str: Format string
        
    Returns:
        Formatted datetime string
    """
    if dt is None:
        dt = datetime.datetime.now()
    
    try:
        return dt.strftime(format_str)
    except Exception as e:
        print(f"Error formatting datetime: {e}")
        return str(dt)


def validate_email(email: str) -> bool:
    """
    Validate an email address using regex.
    
    Args:
        email: Email address to validate
        
    Returns:
        True if valid, False otherwise
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def generate_password(length: int = 12, 
                     include_uppercase: bool = True,
                     include_digits: bool = True,
                     include_special: bool = True) -> str:
    """
    Generate a random password with specified characteristics.
    
    Args:
        length: Password length
        include_uppercase: Include uppercase letters
        include_digits: Include digits
        include_special: Include special characters
        
    Returns:
        Generated password
    """
    import random
    import string
    
    chars = string.ascii_lowercase
    if include_uppercase:
        chars += string.ascii_uppercase
    if include_digits:
        chars += string.digits
    if include_special:
        chars += string.punctuation
    
    # Ensure at least one character from each included category
    password = []
    if include_uppercase:
        password.append(random.choice(string.ascii_uppercase))
    if include_digits:
        password.append(random.choice(string.digits))
    if include_special:
        password.append(random.choice(string.punctuation))
    
    # Fill the rest of the password
    remaining_length = length - len(password)
    password.extend(random.choice(chars) for _ in range(remaining_length))
    
    # Shuffle the password characters
    random.shuffle(password)
    
    return ''.join(password)


def convert_units(value: float, from_unit: str, to_unit: str) -> Optional[float]:
    """
    Convert between different units of measurement.
    
    Supported conversions:
    - Length: meters (m), kilometers (km), miles (mi), feet (ft), inches (in)
    - Weight: grams (g), kilograms (kg), pounds (lb), ounces (oz)
    - Temperature: Celsius (C), Fahrenheit (F), Kelvin (K)
    
    Args:
        value: Value to convert
        from_unit: Source unit
        to_unit: Target unit
        
    Returns:
        Converted value or None if conversion not supported
    """
    # Conversion factors to base units (meters, grams, Celsius)
    length_to_meters = {
        "m": 1.0,
        "km": 1000.0,
        "mi": 1609.34,
        "ft": 0.3048,
        "in": 0.0254
    }
    
    weight_to_grams = {
        "g": 1.0,
        "kg": 1000.0,
        "lb": 453.592,
        "oz": 28.3495
    }
    
    # Check if units are in the same category
    if from_unit in length_to_meters and to_unit in length_to_meters:
        # Convert to meters, then to target unit
        meters = value * length_to_meters[from_unit]
        return meters / length_to_meters[to_unit]
    
    elif from_unit in weight_to_grams and to_unit in weight_to_grams:
        # Convert to grams, then to target unit
        grams = value * weight_to_grams[from_unit]
        return grams / weight_to_grams[to_unit]
    
    elif from_unit in ("C", "F", "K") and to_unit in ("C", "F", "K"):
        # Temperature conversions
        # First convert to Celsius
        if from_unit == "F":
            celsius = (value - 32) * 5/9
        elif from_unit == "K":
            celsius = value - 273.15
        else:  # from_unit == "C"
            celsius = value
        
        # Then convert from Celsius to target unit
        if to_unit == "F":
            return celsius * 9/5 + 32
        elif to_unit == "K":
            return celsius + 273.15
        else:  # to_unit == "C"
            return celsius
    
    else:
        # Conversion not supported
        return None


def analyze_text(text: str) -> Dict[str, Any]:
    """
    Analyze text and return various statistics.
    
    Args:
        text: Text to analyze
        
    Returns:
        Dictionary with text statistics
    """
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    # Count characters
    char_count = len(text)
    
    # Count letters, digits, and special characters
    letter_count = sum(c.isalpha() for c in text)
    digit_count = sum(c.isdigit() for c in text)
    special_count = char_count - letter_count - digit_count - text.count(' ')
    
    # Count words
    words = text.split()
    word_count = len(words)
    
    # Count sentences (simple approximation)
    sentence_count = text.count('.') + text.count('!') + text.count('?')
    if sentence_count == 0 and word_count > 0:
        sentence_count = 1
    
    # Calculate average word length
    avg_word_length = sum(len(word) for word in words) / word_count if word_count > 0 else 0
    
    # Calculate average sentence length
    avg_sentence_length = word_count / sentence_count if sentence_count > 0 else 0
    
    # Find most common words (top 5)
    word_freq = {}
    for word in words:
        word_lower = word.lower().strip('.,!?;:"\'()[]{}')
        if word_lower:
            word_freq[word_lower] = word_freq.get(word_lower, 0) + 1
    
    common_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:5]
    
    return {
        "char_count": char_count,
        "letter_count": letter_count,
        "digit_count": digit_count,
        "special_count": special_count,
        "word_count": word_count,
        "sentence_count": sentence_count,
        "avg_word_length": avg_word_length,
        "avg_sentence_length": avg_sentence_length,
        "common_words": common_words
    }


def fibonacci(n: int) -> List[int]:
    """
    Generate Fibonacci sequence up to n terms.
    
    Args:
        n: Number of terms to generate
        
    Returns:
        List of Fibonacci numbers
    """
    if n <= 0:
        return []
    
    if n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib


def is_prime(n: int) -> bool:
    """
    Check if a number is prime.
    
    Args:
        n: Number to check
        
    Returns:
        True if prime, False otherwise
    """
    if n <= 1:
        return False
    
    if n <= 3:
        return True
    
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    
    return True


def find_primes(start: int, end: int) -> List[int]:
    """
    Find all prime numbers in a given range.
    
    Args:
        start: Start of range (inclusive)
        end: End of range (inclusive)
        
    Returns:
        List of prime numbers in the range
    """
    return [n for n in range(max(2, start), end + 1) if is_prime(n)]


if __name__ == "__main__":
    # Example usage
    print(f"Current time: {format_datetime()}")
    print(f"Is 'test@example.com' a valid email? {validate_email('test@example.com')}")
    print(f"Random password: {generate_password()}")
    print(f"10 kilometers in miles: {convert_units(10, 'km', 'mi')}")
    print(f"Text analysis: {analyze_text('Hello world! This is a sample text with 123 numbers.')}")
    print(f"First 10 Fibonacci numbers: {fibonacci(10)}")
    print(f"Prime numbers between 10 and 30: {find_primes(10, 30)}")