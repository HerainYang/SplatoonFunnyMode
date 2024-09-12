from flask import Blueprint, Flask, request, abort
import pymongo
import json
from bson.objectid import ObjectId
from bson import json_util

app_comment = Blueprint('comment', __name__)

db_client = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = db_client["Splatoon_funny_mode"]
comment_collection = mydb["comment"]
user_collection = mydb["user"]

@app_comment.route('/InsertComment')
def TestComment():
    comment_collection.insert_one({
        "id": '2218',
        "author": 'Will',
        "body": '<p>Comment Three</p>',
        "timestamp": '10/26/2022 12:14:28',
        "replies": [],
    })
    return "TestComment"

@app_comment.route('/getAllComment', methods=['GET'])
def GetAllComment():
    all_comment = comment_collection.find()
    comment_list = []
    for comment in all_comment:
        comment_list.append({
            "_id": comment['_id'],
            "author": comment['author'],
            "body": comment['body'],
            "timestamp": comment['timestamp'],
            "replies": comment['replies'],
        })
        if 'badges' in comment:
            comment_list[-1]['badges'] = comment['badges']
    return json_util.dumps(comment_list)

@app_comment.route('/getAllUser', methods=['GET'])
def GetAllUser():
    all_user = user_collection.find()
    user_list = []
    for user in all_user:
        user_list.append({
            "_id": user['_id'],
            "badges": user['badges']
        })
    return json_util.dumps(user_list)

@app_comment.route('/AddComment', methods=['POST'])
def AddComment():
    request_data = json.loads(request.get_data())
    print(request_data)
    insert_id = None

    badgeList = []

    user = user_collection.find_one({"hiddenId": request_data['comment']['author']})
    print(user)
    user_name = request_data['comment']['author']
    if user is not None:
        badgeList = user['badges']
        user_name = user['displayId']



    if request_data['targetList'] is None:
        insert_id = comment_collection.insert_one({
            "author": user_name,
            "body": request_data['comment']['body'],
            "timestamp": request_data['comment']['timestamp'],
            "badges": badgeList,
            "replies": [],
        }).inserted_id
    else:
        search_filter = {}
        array_filter = []
        first_element = True
        prefix_replies = 'replies.'
        search_field = '_id'
        index = 0
        push_string = "replies"
        for id in reversed(request_data['targetList']):
            search_filter[search_field] = ObjectId(id)
            search_field = prefix_replies + search_field
            if(first_element):
                first_element = False
                if len(request_data['targetList']) > 1:
                    push_string += '.'
                continue
            array_filter.append({'t' + str(index) + '._id': ObjectId(id)})
            # array_filter['t' + str(index) + '._id'] = ObjectId(id)
            push_string += '$[t' + str(index) + '].replies'
            if index != len(request_data['targetList']) - 2:
                push_string += '.'
            index += 1

        insert_id = ObjectId()
        
        if(len(array_filter) == 0):
            output = comment_collection.update_one(search_filter, {"$push": {push_string: {
            "_id": insert_id,
            "author": user_name,
            "body": request_data['comment']['body'],
            "timestamp": request_data['comment']['timestamp'],
            "badges": badgeList,
            "replies": [],
        }}})
        else:
            output = comment_collection.update_one(search_filter, {"$push": {push_string: {
            "_id": insert_id,
            "author": user_name,
            "body": request_data['comment']['body'],
            "timestamp": request_data['comment']['timestamp'],
            "badges": badgeList,
            "replies": [],
        }}}, array_filters=array_filter)
        print(output)


        print("search result:")
        for item in comment_collection.find(search_filter):
            print(json_util.dumps(item))
        print(insert_id)


    return json_util.dumps({
        'insert_id': insert_id,
        'badges': badgeList,
        'author': user_name,
    })