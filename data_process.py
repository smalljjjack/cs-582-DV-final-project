import pandas as pd

soccer_data = pd.read_csv("results.csv")

tournament_Set = set()
team_list_Set = set()
country_Set = set()
city_Set = set()
def get_general_data():
    with open("generalData.js","w") as output:
        output.write("var tournamentList = [" + "\n")
        for tournament in soccer_data['tournament']:
            if tournament not in tournament_Set:
                output.write('\"' + tournament + '\",' + "\n")
                tournament_Set.add(tournament)
        output.write("];")

        output.write("\n\n")

        output.write("var teamList = [" + "\n")
        for home_team in soccer_data['home_team']:
            if home_team not in team_list_Set:
                output.write("\'" + home_team + "\',"+ "\n")
                team_list_Set.add(home_team)
        for guest_team in soccer_data['away_team']:
            if guest_team not in team_list_Set:
                output.write("\'" + guest_team + "\',"+ "\n")
                team_list_Set.add(guest_team)
        output.write("];")

        output.write("\n\n")

        output.write("var countryList = [ " + "\n")
        for country in soccer_data['country']:
            if country not in country_Set:
                output.write("\'" + country + "\'," + "\n")
                country_Set.add(country)
        output.write("];")

        output.write("\n\n")

        output.write("var cityList = [ " + "\n")
        for city in soccer_data['city']:
            if city not in city_Set:
                output.write('\"' + city + '\",' + "\n")
                city_Set.add(city)
        output.write("];")
    output.close()

def get_game_number_by_year():
    """
    :return: [{'2016':{'USA':1,'CHINA':2,'ITALY':1}},{}]
    """
    res = {}
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
        out.write("var numberOfGamesByYear = ")
        out.write(str(res))
        out.write(";\n")
    out.close()



def check_country_team():
    count = 0
    for home_team, away_team, country in zip(soccer_data['home_team'], soccer_data['away_team'], soccer_data['country']):
        if home_team != country and away_team != country:
            count += 1
    print(count)

# check_country_team()
get_game_number_by_year()
