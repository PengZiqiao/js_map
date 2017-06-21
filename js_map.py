from flask import Flask, session, render_template, jsonify
import pandas as pd

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'


@app.route('/')
def index():
    table = get_df()[['no', 'name']].to_html(index=False, classes='table table-bordered')
    session['amap_key'] = '15c70ee1f164cc08cdb4883bed9f3dd7'
    return render_template('index.html', **locals())


@app.route('/get_projects')
def get_projects():
    df = get_df()
    return jsonify(df.to_dict(orient='records'))


def get_df():
    return pd.read_csv('e:/input.csv')


if __name__ == '__main__':
    app.run()
