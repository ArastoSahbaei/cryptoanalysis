from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from main import db
import uuid

class User:
    
    def session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user

        return jsonify(user), 200

    def register(self, name, email, password):

        user = {
            #create a random id
            "_id": uuid.uuid4().hex,
            "name": name,
            "email": email,
            "password": password
        }
        
        # encrypt password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # check for email in db
        if db.users.find_one({ "email": user['email'] }):
            return jsonify({ "error": "E-mail already in use"}), 400
        
        # if sucessful, insert user object to collection 'users'
        if db.users.insert_one(user):
            return self.session(user)

        return jsonify({"error": "Registration failed"}), 400
    
    def logout(self):
        session.clear()
        print('logged out')
        return redirect('/')

    def login(self, email):
        user = db.users.find_one({
            "email": email
        })

        if user: 
            print('logged in')
            return self.session(user)

        return jsonify({"error": "Invalid email"}), 401