import requests 
import json

url = 'http://localhost:8000/deleteList/1'
data = {'title': 'a', 'id': '1', 'finish': False, 'buttonText': 'a'}
#json = data 
a = {'username': 'a', 'password': 'a'}
response = requests.delete(url)

if response.status_code == 200:
    print('API Response:', response.json())
else:
    print('API Request Failed')
    print('Response Status Code:', response.status_code)
    print('Response Text:', response.text)
