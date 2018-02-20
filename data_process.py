import pandas as pd

def get_general_data():
    soccer_data = pd.read_csv("data/results.csv")
    tournament_Set = set()
    team_list_Set = set()
    country_Set = set()
    city_Set = set()
    with open("generalData.js","w") as output:
        output.write("var tournamentList = [")
        for tournament in soccer_data['tournament']:
            if tournament not in tournament_Set:
                output.write('\"' + tournament + '\",')
                tournament_Set.add(tournament)
        output.write("];")

        output.write("\n\n")

        output.write("var teamList = [" )
        for home_team in soccer_data['home_team']:
            if home_team not in team_list_Set:
                output.write("\'" + home_team + "\',")
                team_list_Set.add(home_team)
        for guest_team in soccer_data['away_team']:
            if guest_team not in team_list_Set:
                output.write("\'" + guest_team + "\',")
                team_list_Set.add(guest_team)
        output.write("];")

        output.write("\n\n")

        output.write("var countryList = [ ")
        for country in soccer_data['country']:
            if country not in country_Set:
                output.write("\'" + country + "\',")
                country_Set.add(country)
        output.write("];")

        output.write("\n\n")

        output.write("var cityList = [ ")
        for city in soccer_data['city']:
            if city not in city_Set:
                output.write('\"' + city + '\",')
                city_Set.add(city)
        output.write("];")
    output.close()


def get_game_number_by_year():
    """
    :return: [{'2016':{'USA':1,'CHINA':2,'ITALY':1}},{}]
    """
    res = {}
    soccer_data = pd.read_csv("data/results.csv")
    for date, country in zip(soccer_data['date'],soccer_data['country']):
        year = date[0:4]
        if year not in res:
            res[year] = {}
            res[year][country] = 1
        elif year in res:
            if country in res[year]:
                res[year][country] += 1
            else:
                res[year][country] = 1

    with open("gameNumberByYear.js", "w") as out:
        out.write("var numberOfGamesByYearAllTournament = ")
        out.write(str(res))
        out.write(";\n")
    out.close()


def get_number_by_tournament():
    res = {}
    soccer_data = pd.read_csv("data/results.csv")
    for date, country, tournament in zip(soccer_data['date'], soccer_data['country'], soccer_data['tournament']):
        year = date[0:4]
        if tournament in res:
            if year in res[tournament]:
                if country in res[tournament][year]:
                    res[tournament][year][country] += 1
                else:
                    res[tournament][year][country] = 1
            else:
                res[tournament][year] = {}
                res[tournament][year][country] = 1
        else:
            res[tournament] = {}
            res[tournament][year] = {}
            res[tournament][year][country] = 1

    with open("getNumberByTournament.js","w") as out:
        out.write("var numberOfGamesByTournamentYear = ")
        out.write(str(res))
        out.write(";\n")
    out.close()


def check_country_team():
    count = 0
    soccer_data = pd.read_csv("data/results.csv")
    for home_team, away_team, country in zip(soccer_data['home_team'], soccer_data['away_team'], soccer_data['country']):
        if home_team != country and away_team != country:
            count += 1
    print(count)


# check_country_team()
# get_game_number_by_year()
# get_number_by_tournament()
get_general_data()
