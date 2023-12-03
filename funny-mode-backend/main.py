from flask import Flask, request, abort
from flask_cors import CORS
import json
import random
import uuid
import pymongo
import time
from bson.objectid import ObjectId

weaponlist = []
subweaponlist = []
specialweaponlist = []
stagelist = []
modelist = []
db_client = None
mydb = None
room_collection = None
player_collection = None

def create_app():
    global weaponlist
    global subweaponlist
    global specialweaponlist
    global stagelist
    global modelist
    global db_client
    global mydb
    global room_collection
    global player_collection
    app = Flask(__name__)
    CORS(app)
    weaponlist = json.load(open('data/weaponinfo.json', 'r'))
    subweaponlist = json.load(open('data/subweaponinfo.json', 'r'))
    specialweaponlist = json.load(open('data/specialweaponinfo.json', 'r'))
    stagelist = json.load(open('data/stageinfo.json', 'r'))
    modelist = json.load(open('data/modeinfo.json', 'r'))
    db_client = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = db_client["Splatoon_funny_mode"]
    room_collection = mydb["room"]
    player_collection = mydb["player"]
    random.seed()
    return app

app = create_app()

@app.route('/')
def hello_world():
    return 'Hello, World111!'


@app.route('/getRandomWeapon', methods=['POST'])
def getRandomWeapon():

    request_data = json.loads(request.get_data())
    room_id = request_data['roomNumber']
    request_token = request.headers.get('Authorization')


    allow_unbalanced = request_data['unbalancedTeam']

    room = room_collection.find_one({"room_id": room_id})

    if room is None or request_token not in room['room_memebres_token']:
        abort(404)
        return
    
    if room.get("admin_token") == request_token:
        weapon_player_list = {
            "team1": [],
            "team2": [],
            "sub_team": [],
            "stage_id": -1,
            "mode_id": -1
        }

        randomstage = random.sample(stagelist, 1)
        weapon_player_list['stage_id'] = randomstage[0]['id']
        randommode = random.sample(modelist, 1)
        weapon_player_list['mode_id'] = randommode[0]['id']



        player_in_room = len(room['room_memebres_token'])
        team1_number = player_in_room // 2
        if(team1_number > 4):
            team1_number = 4
        
        if(allow_unbalanced):
            team2_number = player_in_room - team1_number
        else:
            team2_number = team1_number

        if(team2_number > 4):
            team2_number = 4
        
        team1_member = random.sample(room['room_memebres_token'], team1_number)
        team2_member = random.sample(list(set(room['room_memebres_token']) - set(team1_member)), team2_number)
        sub_team_member = list(set(room['room_memebres_token']) - set(team1_member) - set(team2_member))
        
        weapons = random.sample(weaponlist, int(team1_number))
        index = 0
        for weapon in weapons:
            player = getPlayer(team1_member[index])
            player_name = player['player_name']
            player_collection.update_one({"_id": ObjectId(team1_member[index])}, {"$set": {"play_time": player['play_time'] + 1}})

            weapon_player_list['team1'].append({"token": team1_member[index],"playerID": player_name, "weaponID": weapon["id"]})
            index += 1

        weapons = random.sample(weaponlist, int(team2_number))
        index = 0
        for weapon in weapons:
            player = getPlayer(team2_member[index])
            player_name = player['player_name']
            player_collection.update_one({"_id": ObjectId(team2_member[index])}, {"$set": {"play_time": player['play_time'] + 1}})
            weapon_player_list['team2'].append({"token": team2_member[index], "playerID": player_name, "weaponID": weapon["id"]})
            index += 1

        for player in sub_team_member:
            player_name = player_collection.find_one({"_id": ObjectId(player)})['player_name']
            weapon_player_list['sub_team'].append({"token": player, "playerID": player_name})

        room_collection.update_one({"room_id": room_id}, {"$set": {"mode_args": json.dumps(weapon_player_list)}})
        return json.dumps(weapon_player_list)
    else:
        return json.dumps(json.loads(room['mode_args']))

@app.route('/createRoom', methods=['POST'])
def createRoom():
    request_data = json.loads(request.get_data())


    room_id = uuid.uuid4().hex[:6]

    player_data = {
        "player_name": request_data['name'],
        "play_time": 0,
    }

    admin_token = str(player_collection.insert_one(player_data).inserted_id)

    room = room_collection.find_one({"room_id": room_id})
    while room is not None:
        # delete room if room is created more than 24 hours
        if(room.get("create_date") + 60 * 60 * 24 < time.time()):
            room_collection.delete_one({"room_id": room_id})
            break
        room_id = uuid.uuid4().hex[:6]
        room = room_collection.find_one({"room_id": room_id})

    room_data = {
        "room_id": room_id,
        "room_mode": request_data['mode'],
        "admin_token": admin_token,
        "room_memebres_token": [admin_token],
        "mode_max_player": 10,
        "mode_max_ingame_player": 8,
        "create_date": time.time(),
        "mode_args": ''
    }
    room_collection.insert_one(room_data)
    return json.dumps({"room_id": room_id, "player_token": admin_token, "is_admin": True})

@app.route('/joinRoom', methods=['POST'])
def joinRoom():
    request_data = json.loads(request.get_data())

    room_id = request_data['roomNumber']
    room = room_collection.find_one({"room_id": room_id})
    if room is None:
        abort(404)
        return
    if len(room['room_memebres_token']) >= room['mode_max_player']:
        return json.dumps({"room_id": -1, "player_token": -1, "is_admin": False})
    

    player_data = {
        "player_name": request_data['name'],
        "play_time": 0,
    }

    player_token = str(player_collection.insert_one(player_data).inserted_id)

    room_collection.update_one({"room_id": room_id}, {"$push": {"room_memebres_token": player_token}})
    return json.dumps({"room_id": room_id, "player_token": player_token, "is_admin": False})

@app.route('/getRoomInfo', methods=['POST'])
def getRoomInfo():
    request_data = json.loads(request.get_data())
    room_id = request_data['roomNumber']
    request_token = request.headers.get('Authorization')

    room = room_collection.find_one({"room_id": room_id})
    if room is None or request_token not in room['room_memebres_token']:
        abort(404)
        return
    
    player_list = []
    for player_token in room['room_memebres_token']:
        player = player_collection.find_one({"_id": ObjectId(player_token)})
        player_list.append({"name": player['player_name'], "token": str(player_token)})

    return json.dumps({"room_id": room_id, "player_list": player_list, "mode_args": room['mode_args']})


@app.route('/deleteMember', methods=['DELETE'])
def deleteMember():
    request_data = json.loads(request.get_data())
    room_id = request_data['roomNumber']
    target_memeber_token = request_data['targetMemberToken']
    request_token = request.headers.get('Authorization')

    room = room_collection.find_one({"room_id": room_id})
    if room is None:
        abort(404)
        return
    
    if not (room.get("admin_token") == request_token or target_memeber_token == request_token):
        abort(405)
        return
    
    if room.get("admin_token") == target_memeber_token:
        room_collection.delete_one({"room_id": room_id})
        player_collection.delete_one({"_id": ObjectId(target_memeber_token)})
        return json.dumps({"room_id": room_id})
    else:
        room_collection.update_one({"room_id": room_id}, {"$pull": {"room_memebres_token": target_memeber_token}})
        player_collection.delete_one({"_id": ObjectId(target_memeber_token)})
        return json.dumps({"room_id": room_id})
    
def getPlayer(player_token):
    player = player_collection.find_one({"_id": ObjectId(player_token)})
    return player