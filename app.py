from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)

# NO LOGIC DONE YET >> Claims

@app.route('/')
def basic_info():
    if request.method == 'POST':
      fnb = request.form['fnb_count']
      prize = request.form['prize_count']
      svp = request.form['svp_count']
    #   if svp+prize+fnb > 10:
    #       alert("LOL")
      return redirect(url_for('claims', fnb_count = fnb, prize_count = prize, svp_count = svp))
    else:
        return render_template('basic_info.html')

# determine Code Number (dont think need database if we hardcode into this function LMAO)  
# Method 1: use the count from basic_info.html to determine num of claim forms to fill in per type in claims.html
# Method 2: can give 12 inputs where they can leave blank for empty claims then maybe html side we put in default text
# LEARN how to pull data from template to function
@app.route('/claims')
def claims(fnb_count, prize_count, svp_count):
   return render_template('claims.html')

# Insert basic and claim form info into form.html
# IF GOT TIME: Make this a downloadable form through button click, on this html list the things they need to prepare for WQ
@app.route('/form')
def form():
   return render_template('form.html')

# IN PROGRESS: Upload docs (https://www.tutorialspoint.com/flask/flask_file_uploading.htm)
# IN PROGRESS: Mail straight to WQ before printing (https://www.tutorialspoint.com/flask/flask_mail.htm)
# Deployment (https://www.tutorialspoint.com/flask/flask_deployment.htm)

if __name__ == '__main__':
   app.run()