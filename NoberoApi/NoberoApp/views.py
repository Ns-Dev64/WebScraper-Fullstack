from pymongo import MongoClient
from rest_framework import views
from rest_framework.response import Response
from bson.objectid import ObjectId 
import os
from dotenv import load_dotenv
from .serializers import ProductSerializer

#loading the .env file
load_dotenv('.env')

#Connecting to the Database
databaseUrl=os.getenv('MONGO_URL')
client = MongoClient(databaseUrl)
db = client['Nobero']
products = db['Products']
print("Database Connected Successfully Name:{}  Collection:{}".format(db.name, products.name))

#using Apiview to handle get requests
class  ProductsApiView(views.APIView):
     def get(self, request, product_id=None):
        if product_id:
            # Retrieve a specific product
            try:
                product = products.find_one({"_id": ObjectId(product_id)})
                if not product:
                    return Response({"error": "Product not found"}, status=404)
                # Convert ObjectId to string
                product['_id'] = str(product['_id'])
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            except Exception as e:
                return Response({"error": str(e)}, status=400)
        else:
            # Retrieve all products
            try:
                productList = list(products.find({}))
                serializer = ProductSerializer(productList, many=True)
                return Response(serializer.data)
            except Exception as e:
                return Response({"error": str(e)}, status=400)
    
    