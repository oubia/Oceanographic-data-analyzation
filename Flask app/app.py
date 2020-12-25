from flask import Flask, render_template ,url_for,Blueprint,request , session ,flash
from datetime import timedelta
from home import Home
from login import Login , Logout , User
from profile import Profile
from flask_sqlalchemy import SQLAlchemy



app=Flask(__name__)
app.register_blueprint(Home )
app.register_blueprint(Login)
app.register_blueprint(Profile)



# defind a sceecret key to incrept and decrept the session
# app.secret_key="hello"
# the session will stored for 1
app.permanent_session_lifetime=timedelta(minutes=1)





if __name__=="__main__":
    app.run(debug=True)

