from rest_framework import serializers
from datetime import datetime

def validate_name(value): #Validates name field
        if len(value) < 1:
            raise serializers.ValidationError('Name must be at least 1 character long.')
        
        if len(value) > 50:
            raise serializers.ValidationError('Name cannot be more than 50 characters long.')
    
        return value

def validate_title(value): #Validates name field
        if len(value) < 1:
            raise serializers.ValidationError('Name must be at least 1 character long.')
        
        if len(value) > 200:
            raise serializers.ValidationError('Name cannot be more than 200 characters long.')
    
        return value

def validate_ingredients(value): #Validates ingredients array
    # if not isinstance(value, list):
    #     raise serializers.ValidationError('Ingredients must be a list.')
    
    if len(value) < 1:
         raise serializers.ValidationError('Recipe must have atleast 1 ingredient.')
    
    if len(value) != len(set(value)):
         raise serializers.ValidationError('There cannot be any duplicate ingredients.')
    
    return value

def validate_time(value):
    try:
          time = float(value)
          if time < 0:
               raise serializers.ValidationError('Time must be a non negative number.')
          
    except ValueError:
        raise serializers.ValidationError('Time field must have a valid entry.')
    
def validate_categories(value): #Validates ingredients array
    # if not isinstance(value, list):
    #     raise serializers.ValidationError('Categories must be a list.')
    
    if len(value) < 1:
         raise serializers.ValidationError('Recipe must have atleast 1 category.')
    
    if len(value) != len(set(value)):
         raise serializers.ValidationError('There cannot be any duplicate category.')
    
    return value
    
def validate_carbon_emission(value): #Validates carbon emission
    try:
        emission = float(value)
        if emission < 0:
            raise serializers.ValidationError('Carbon emission must be a non-negative number.')
        
    except ValueError:
        raise serializers.ValidationError('Carbon emission field must have a valid entry.')
    
    return value

def validate_date(value): #Validates date
    try:
        date = datetime.strptime(value, '%Y-%m-%d').date()

    except ValueError:
        raise serializers.ValidationError('Date must be in the format YYYY-MM-DD.')
    
    if date < datetime.now().date():
        raise serializers.ValidationError('The date cannot be in the past')
    
def validate_description(value):
    if len(value) < 1:
            raise serializers.ValidationError('Name must be at least 1 character long.')
        
    if len(value) > 3000:
            raise serializers.ValidationError('Name cannot be more than 3000 characters long.')
    
    return value
    