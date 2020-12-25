from flask import Flask, render_template ,url_for ,Blueprint ,request , session ,flash , redirect
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy

Login= Blueprint("login",__name__,static_folder="static",template_folder="templates")
Logout= Blueprint("login",__name__,static_folder="static",template_folder="templates")
User= Blueprint("login",__name__,static_folder="static",template_folder="templates")
News= Blueprint("login",__name__,static_folder="static",template_folder="templates")

Login.secret_key="hello"

# Login.config['SQLALCHEMY_DATABASE_URI']='sqlite:///users.sqlite3'
# Login.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

# Login.permanent_session_lifetime=timedelta(minutes=1)


# db=SQLAlchemy(Login)

# class users(db.Model):
#     _id= db.Column("id", db.Integer,primary_key=True)
#     name = db.Column(db.String(100))
#     email = db.Column(db.String(100))
#     pass_word=db.Column(db.String(100))
#     # save a data
#     def __init__(self, name, email):
#         self.name=name
#         self.email=email




@Login.route("/login",methods=["GET","POST"])
def login():
    # error = None

    if request.method == "POST":
        session.permanent=True

        usr=request.form["nm"]
        session["user"]=usr

        email=request.form["em"]
        session["email"]=email

        pass_word=request.form["pass"]
        session["pass_word"]=pass_word

        confirm_pass=request.form["cnpass"]
        session["confirm_pass"]=confirm_pass


        flash(" MOther fucker ","info")
        return render_template("profile.html")

    else:
        if "user" in session:
            flash(" You already logged in ")
            return redirect(url_for("profile"))
        # return to page login.html
        return render_template("login.html")
        # error = 'Invalid credentials'



@Login.route("/user",methods=["GET","POST"])
def user():
    if "user" in session:
        user =session["user"]
        return render_template("profile.html",user=user)
    else:
        flash("You are not logged in !!")
        return redirect(url_for("login"))
    
@Login.route("/logout")
def logout():

    # session.pop("user",None)
    # # # if the user logout we will show him this message inf is a category we can make  it for adding icons and things like that  
    # flash("you have been logout !!!!","info")
    return render_template("home.html")


@Login.route("/news")
def news():
    return render_template("news.html")