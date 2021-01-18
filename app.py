from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)
app.debug = True

@app.route('/')
def basic_info():
    return render_template('basic_info.html')

# either determine Code Number in this function OR give prompts on what is the correct code number
# Method 1: use the count from basic_info.html to determine num of claim forms to fill in per type in claims.html
# Method 2: can give 10 inputs where they can leave blank for empty claims then maybe html side we put in default text
# LEARN how to pull data from template to function
@app.route('/claims', methods = ['POST', 'GET'])
def claims():
    if request.method == 'POST':
        return render_template('claims.html')

# Insert basic and claim form info into form.html
# IF GOT TIME: Make this a downloadable form through button click, on this html list the things they need to prepare for WQ
# LEARN how to present data from function to template
@app.route('/form', methods = ['POST', 'GET'])
def form():
    if request.method == 'POST':
        return render_template('form.html')

# IN PROGRESS: Upload docs (https://www.tutorialspoint.com/flask/flask_file_uploading.htm)
# IN PROGRESS: Mail straight to WQ before printing (https://www.tutorialspoint.com/flask/flask_mail.htm)
# Deployment (https://www.tutorialspoint.com/flask/flask_deployment.htm)

if __name__ == '__main__':
   app.run()