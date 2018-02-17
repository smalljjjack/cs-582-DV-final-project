import pandas as pd

soccer_data = pd.read_csv("data/results.csv")

tournament_Set = set()
team_list_Set = set()
country_Set = set()
city_Set = set()

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