from flask import Flask, render_template
from flask_pymongo import pymongo
from flask import request
import json

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db 
db = client.musicgenre_DB

# Route to render index.html template using data from Mongo

# Home page
@app.route("/")
def home():
  return render_template("index.html")

@app.route("/ratingsbygenre")
def ratings():
  return render_template("ratings.html")

@app.route("/othergraphs")
def others():
  return render_template("othergraphs.html")

# Data page: jsonified
@app.route("/datajson.json")
def visual_data():
  music = db.gdata
  output = []
  for m in music.find():
    output.append({'year':m['year'],'reviewid':m['reviewid'],'name':m['name'],'n':m['n'],'genre':m['genre']})
  return json.dumps(output)

@app.route("/violindata.json")
def other_graph():
  violin = db.vdata
  output = []
  for v in violin.find():
    output.append({'date':v['date'],'value':v['value']})
  return json.dumps(output)
  

@app.route("/reviews")
def reviewurl():

  reviews = db.rdata.find()
  return render_template("reviews.html",reviews=reviews)

@app.route("/codesnips")
def codesnips():

  return render_template("codesnips.html")

@app.route("/team")
def meetteam():

  return render_template("team.html")




if __name__ == "__main__":
    app.run(debug=True, port = 5003)