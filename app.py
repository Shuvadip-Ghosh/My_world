from flask import Flask, render_template, current_app, flash, request, redirect, send_file
from flask import session
import os
from werkzeug.utils import secure_filename
from datetime import timedelta
from mutagen import mp3
from mutagen.mp3 import MP3
import time
import subprocess

ALLOWED_EXTENSIONS = {
    # music
    'aif', 'cda', 'mid', 'midi', 'mp3', 'mpa', 'ogg', 'wav', 'wma', 'wpl', 'm3u',
    # document
    'txt', 'doc', 'ord', 'docx', 'odt ', 'rtf', 'pdf',
    # video
    '3g2', '3gp', 'avi', 'flv', 'h264', 'm4v', 'mkv', 'mov', 'mp4', 'mpg', 'mpeg', 'rm', 'swf', 'vob', 'wmv',
    # images
    'ai', 'bmp', 'gif', 'jpg', 'jpeg', 'png', 'ps', 'psd', 'svg', 'tif', 'tiff', 'cr2',
    # internet
    'asp', 'aspx', 'cer', 'cfm', 'cgi', 'pl', 'css', 'htm', 'js', 'jsp', 'part', 'php', 'rss', 'xhtml', 'html',
    # compressed
    '7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'targz', 'z', 'zip',
    # disc
    'bin', 'dmg', 'iso', 'toast', 'vcd',
    # data
    'csv', 'dat', 'db', 'dbf', 'log', 'mdb', 'savsql', 'tar', 'xml', 'json',
    # executables
    'apk', 'bat', 'com', 'exe', 'gadget', 'jar', 'wsf',
    # fonts
    'fnt', 'fon', 'otf', 'ttf',
    # presentation
    'key', 'odp', 'pps', 'ppt', 'pptx',
    # programming
    'c', 'class', 'java', 'py', 'sh', 'h',
    # spreadsheeta
    'ods', 'xlr', 'xls', 'xlsx',
    # system
    'bak', 'cab', 'cfg', 'cpl', 'cur', 'dll', 'dmp', 'drv', 'icns', 'ico', 'ini', 'lnk', 'msi', 'sys', 'tmp'
}

app = Flask(__name__)
UPLOAD_FOLDER = r'{}/uploads'.format(os.getcwd())
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = '`k9F"P[<Lop_2@WnY40J'


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        files = request.files.getlist("file")
        print(files)
        for file in files:
            print(file)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect('/')

    a = os.listdir(UPLOAD_FOLDER)
    return render_template('index.html', files=a)

@app.route('/delete', methods=['GET', 'POST'])
def delete():
    print('posted')
    if request.form['Delete']:
        a = request.form['Delete']
        os.remove(f'{UPLOAD_FOLDER}/{a}')
        return redirect('/')

@app.route('/download', methods=['GET', 'POST'])
def download():
    name = request.form['Edit']
    return send_file(f'{UPLOAD_FOLDER}/{name}', as_attachment=True)

@app.route('/music')
def spotify():
    songs = os.listdir("static/songs")
    time_data = []
    songs_name = []
    for song in songs:
        file = "static/songs/"+song
        song_info = MP3(file)
        timee = song_info.info.length
        total_time = time.strftime('%M:%S', time.gmtime(timee))
        song = song.replace(".mp3", "")
        time_data.append(total_time)
        songs_name.append([song, total_time])
    return render_template("spotify.html", files=songs_name, song_name=songs, time_data=time_data)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
