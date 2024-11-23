from rest_framework import serializers

def validate_name(value): #Validates name field
        if len(value) < 1:
            raise serializers.ValidationError('Name must be at least 1 character long.')
        
        if len(value) > 100:
            raise serializers.ValidationError('Name cannot be more than 100 characters long.')
    
        return value
    
def validate_carbon_emission(value): #Validates carbon emission
    try:
        emission = float(value)
        if emission < 0:
            raise serializers.ValidationError('Carbon emission must be a non-negative number')
        
    except ValueError:
        raise serializers.ValidationError('Carbon emission field must have a valid entry')
    
    return value