'''
  this will be their account info with the most basic of info to login

  this will take a new user registering 

  payload: {
    name: string
    name: string
    email: string
    password: string -- as plain text
  }
'''

from flask import Blueprint, jsonify, request
from db import get_db_local
import bcrypt 

user_bp = Blueprint("user", __name__)

db = get_db_local()
users_collection = db.users


#return constatns for login and register

# login return values
LOGIN_CREDENTIALS_INCORRECT = 'Login credentials invalid'
NEED_TO_REGISTER = 'No user found, please register a new account or try again'

#  register return values
USER_EXISTS = 'User already exists, please login'


# both
SUCCESS = 'Successful'
ERROR = 'Error: please try again later'


# helper for login and register
def check_if_user_exists(email):
    # should never happen
    if not email:
      return None

    user_found = users_collection.find_one({'email': email})
    return user_found if user_found else None

@user_bp.route("/user/login", methods=['POST'])
def login():
  '''
    check if email exists -- needs to be unique and should be used to tie accounts
    name -- no unique constraint, acts as username
    password --  salt + hash(password) stored

    reqs:
     - needs to check if email exists, redirect user to register
     - if email exists, verify password and username and login if correct
      - this should also create a session ideally (TODO)
    
      returns:
       - session (TODO)
       - logged in success
       - needs to register, no user found
       - password / email combo incorrect -> try again
    TODO : create user sessions
  '''
  
  data = request.get_json()

  # user input we need
  email = data.get('email', '')
  password = data.get('password', '')

  # user entered password and encoding
  encoded_password = password.encode('utf-8') 
  
  # print(f"request data {data}")
  try:
    user_found = check_if_user_exists(email)
 
    if user_found:
      saved_password = user_found.get('password', '')

      # check if user pwd matches stored hashed pwd
      password_correct = bcrypt.checkpw(encoded_password, saved_password) 

      if password_correct:
        return jsonify(dict(msg=SUCCESS, error=None))

      else:
        return jsonify(dict(msg=LOGIN_CREDENTIALS_INCORRECT, error=None))  
    else:
      return jsonify(dict(msg=NEED_TO_REGISTER, error=None))  
  except Exception as e:
    return jsonify(dict(msg=ERROR, error=e))



@user_bp.route('/user/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # user entered password and encoding
    password = data.get('password', '')
    email = data.get('email', '')

    user_found = check_if_user_exists(email)
    if user_found:
      return jsonify(dict(msg=USER_EXISTS, error=None))  


    encoded_password = password.encode('utf-8') 


    # gen user salt
    salt = bcrypt.gensalt() 

    # get hash + salt
    hash = bcrypt.hashpw(encoded_password, salt) 

    # remove plain text password
    data.pop('password')

    # update user info to save
    user_data = dict(**data, password=hash, salt=salt)

    try:
      # save to db
      users_collection.insert_one(user_data)
      return jsonify(dict(msg=SUCCESS, error=None))
    except Exception as e:
      return jsonify(dict(msg=ERROR, error=e))
    


# --- both below can be moved to profile file to separate these out

# TODO : edit account 


# TODO : edit profile