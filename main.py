from flask import Flask, request, jsonify, session, redirect
from forecast import analyseChosenCoins
from api_calls import getAllCoinNames, getGlobalCryptoMarket, getSingleCoinInfo, getTopChart, getTrending, getSingleCoinHistory, getTrendingInfo
from help_functions import missingvalues_tool, numeric_evaluations
from flask_cors import CORS
from functools import wraps
from instance.config import CONNECTION_STRING
import pymongo

app = Flask(__name__, instance_relative_config=True)
# Need to add a 'instance'-folder with config.py-file containing secret key!
app.config.from_pyfile('config.py')


#Database
client = pymongo.MongoClient(CONNECTION_STRING, connect=False)
db = client.cryptoShuttleDB

# Decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            # If user is logged in, continue to userpage(requested function)
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap

# User routes
from user import routes

#app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'hello world'

@app.route('/userpage')
@login_required
def userpage():
    return 'userpage'

#Forecasting top trending coins 
@app.route('/rest/forecast/trending', methods=['GET'])
def trending_forecast():
    
    trending = getTrending()
    cryptos = trending
    days = 365
    currency = 'usd'
    coin_market_period = 'max'
    result, res = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)
    result = numeric_evaluations(result)

    response = {}
    response['coins'] = result
    
    
    return jsonify(response)


  
#Can forecast one or more coins / need some changes for plural or multiple to work.
@app.route('/rest/forecast/coins', methods=['GET'])
def user_option_forecast():
    cryptos = []
   
    resp = request.args.get('coin')
    cryptos.append(resp)
    days = 365
    currency = 'usd'
    coin_market_period = 'max'
    result, res = analyseChosenCoins(cryptos=cryptos, days=days, currency=currency, coin_market_period=coin_market_period)
    result = numeric_evaluations(result)

    response = {}
    response['coin'] = result
    response['graph'] = res
    return jsonify(response)


   
# Fetches topchart for home page , with market data coin name , icon etc.
@app.route('/rest/topchart', methods=['GET'])
def top_chart():
    currency = request.args.get('currency')
    result = getTopChart(currency)
    return result

#Information about a single coin , time and price, To plot graphs
@app.route('/rest/market/graph', methods=['GET'])
def market_single_coin():

    coin = request.args.get('coin')
    currency = 'usd'
    market_period = 'max'

    result = getSingleCoinHistory(coin, currency, market_period)

    return result


#Top trending coins and some market info.
@app.route('/rest/trending/info',  methods=['GET'])
def trending_info():

    #currency = request.args.get('coin')
    result = getTrendingInfo(currency='usd')

    return result


# Market information for one ore more coins.
@app.route('/rest/market/info', methods=['GET'])
def single_coin_info():
    coins = []
    coin = request.args.get('coin') 
    coins.append(coin)

    result = getSingleCoinInfo(coins, currency='usd')
    
    return jsonify(result)

# Global market data 
@app.route('/rest/market/global-market-data', methods=['GET'])
def global_market_data():

    result = getGlobalCryptoMarket()
    
    return result

# List of all coins ids. 
@app.route('/rest/coins/search', methods=['GET'])
def search_all_coins():

    result = getAllCoinNames()

    return result


if __name__ == '__main__':
    app.run(debug=True)


