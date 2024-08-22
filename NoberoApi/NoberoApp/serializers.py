from rest_framework import serializers

#Serializer for the Product
class ProductSerializer(serializers.Serializer):
    _id = serializers.CharField()
    Category = serializers.CharField(max_length=255)
    url = serializers.URLField()
    Image=serializers.CharField()
    title = serializers.CharField(max_length=255)
    price = serializers.ListField(child=serializers.CharField(max_length=50))
    Discount = serializers.ListField(child=serializers.CharField(max_length=50))
    Last_7_days = serializers.CharField(max_length=255, allow_blank=True, required=False)
    availble_skus = serializers.CharField(max_length=1024)
    product_key_specifications = serializers.ListField(child=serializers.CharField(max_length=255))
    product_description = serializers.ListField(
        child=serializers.CharField(max_length=1024),
        allow_empty=True,
        required=False
    )
