import requests 
import json

url = 'http://localhost:8000/change_password'
data = {'title': 'a', 'id': '1', 'finish': False, 'buttonText': 'a'}
#json = data 
a = {'username': 'a', 'password': 'a'}
b = {'password': 'b', 'new_password': 'a'}
response = requests.patch(url, params=b)

if response.status_code == 200:
    print('API Response:', response.json())
else:
    print('API Request Failed')
    print('Response Status Code:', response.status_code)
    print('Response Text:', response.text)
