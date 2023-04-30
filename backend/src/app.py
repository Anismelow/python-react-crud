from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS


app = Flask(__name__)

# coneccion a base de datos mongo la cual si no esta creada la crea el mismo
app.config["MONGO_URI"] = "mongodb://localhost/safepassdb"
mongo = PyMongo(app)
db = mongo.db.passwords

#MIDDLEWARE_CLASSES
CORS(app)

# rutas
@app.route("/")
def index():
    return "<h1>hello word</h1>"


@app.route("/users", methods=["POST"])
def create_user():
    result = db.insert_one(
        {
            "site": request.json["site"],
            "username": request.json["username"],
            "email": request.json["email"],
            "password": request.json["password"],
        }
    )
    inserted_id = result.inserted_id
    id_obj = ObjectId(str(inserted_id))
    print(str(id_obj))
    return "received"


@app.route("/users", methods=["GET"])
def get_users():
    users = []
    for doc in db.find():
        users.append(
            {
                "_id": str(ObjectId(doc["_id"])),
                "site": doc["site"],
                "username": doc["username"],
                "email": doc["email"],
                "password": doc["password"],
            }
        )
    return jsonify(users)


@app.route("/user/<id>", methods=["GET"])
def get_user(id):
    user = db.find_one({"_id": ObjectId(id)})
    print(user)
    return jsonify(
        {
            "_id": str(ObjectId(user["_id"])),
            "site": user["site"],
            "username": user["username"],
            "email": user["email"],
            "password": user["password"],
        }
    )


@app.route("/users/<id>", methods=["DELETE"])
def delate_user(id):
    print(id)
    db.delete_one({'_id':ObjectId(id)})
    return jsonify({
        'msg': 'usuario eliminado'
    })


@app.route("/users/<id>", methods=["PUT"])
def update_user(id):
    print(id)
    print(request.json)
    db.update_one({'_id':ObjectId(id)}, {'$set':{
        'site': request.json['site'],
        "username": request.json['username'],
        'email':request.json['email'],
        'password':request.json['password']
    }})
    return jsonify({
        'msg': 'usuario actualizado'
    })


if __name__ == "__main__":
    app.run(debug=True)
