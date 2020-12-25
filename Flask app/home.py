from flask import Flask , render_template ,Blueprint

Home= Blueprint("home",__name__, static_folder="static",template_folder="templates")
@Home.route("/home",methods=["GET"])

def home():
    return render_template("home.html")

