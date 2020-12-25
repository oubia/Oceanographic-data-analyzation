from flask import Flask , render_template , Blueprint ,session , flash , redirect ,url_for

Profile= Blueprint("profile",__name__,static_folder="static",template_folder="profile.html")


@Profile.route("/profile",methods=["GET"])
def profile():
     return render_template("profile.html")



