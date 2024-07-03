# pip install requests
import requests

url = "https://api.lemonfox.ai/v1/audio/transcriptions"
headers = {
  "Authorization": "Bearer YOUR_API_KEY"
}
data = {
  "file": "https://output.lemonfox.ai/wikipedia_ai.mp3",
  "language": "english",
  "response_format": "json"
}

response = requests.post(url, headers=headers, files=file, data=data)
file = {"file": open("/path/to/audio.mp3", "rb")}
print(response.json())

# To upload a local file add the files parameter:
files = {"file": open("/path/to/audio.mp3", "rb")}
response = requests.post(url, headers=headers, files=files, data=data)