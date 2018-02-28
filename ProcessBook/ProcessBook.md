Soccer Data Vis
===

Jiaxing Zhang | jzhang14@wpi.edu | smalljjjack

Xuanyu Chen | xchen9@wpi.edu | xychen233

Zetian Wang | zwang11@wpi.edu | 22121089

- Background
    - Motivation
    - Objectives
- Data
    - Data Source
    - Data Description
    - Data Processing
- Design
    - Initial Design
    - Final Design
- Implementation
- Conclusion


# Background

## Motivation

Both three of us are soccer fans. We are interested at the data set which contains soccer results data from many many years ago, so we want to do some visualization on these data.

## Objectives

We have a few objectives for this project. First is having fun. Second is to improve our skills in JavaScript, D3 in map, force, etc. Third is to provide a visualization for soccer fans to discover some interesting pattern.

# Data

## Data Source
We found this dataset in kaggle, here is the link:
https://www.kaggle.com/martj42/international-football-results-from-1872-to-2017
## Data Description
This dataset includes 38,759 results of international soccer matches starting from the very first official match in 1972 up to 2018. The matches range from World Cup to Intercontinental Cup to regular friendly matches. The matches are strictly men's full internationals and the data does not include Olympic Games or matches where at least one of the teams was the nation's B-team, U-23 or a league select team.

Here is a preview of the csv data, this csv file contains these columns: 
date, home_team, away_team, home_score, away_score, tournament, city, country.

![csvPreview](img/csvPreview.png)

## Data Processing 
This dataset has already contains everything we needed to do the visualization. But this is the reason that this dataset must be processed before using. First, in terms of winning rate for different kinds of games, we need caluclate Win or Lose or Defend based on the score. Second, It will be convenient for us to fist do some classification based on the year, country. 

Data processing is mainly done in python. We use pandas to read the csv data and then write the desired data into a js file, which will be included as script tag for the project. So in our project we can easily access to it.

Here is a code snippet for the data process using python. This code generate a JS dictionary which uses year as key, and value is an array of all the team that has games in that year. The generated data is written to a JS file for convenience.

~~~python
def get_teamList_by_year():
    soccer_data = pd.read_csv("data/results.csv")
    with open("teamListByYear.js","w") as out:
        out.write("var teamListByYear = { " + "\n")
        active_year = 0
        count = 0
        team_set = set()
        for date, home_team, away_team in zip(soccer_data['date'], soccer_data['home_team'], soccer_data['away_team']):
            curr_year = date[0:4]
            if curr_year != active_year:
                active_year = curr_year
                team_set = set()
                if count != 0:
                    out.write("], " + "\n")
                out.write(curr_year + ": " + " [ ")
                count += 1
            if home_team not in team_set:
                out.write('\"' + home_team + '\"' + ", ")
                team_set.add(home_team)
            if away_team not in team_set:
                out.write('\"' + away_team + '\"' + ", ")
                team_set.add(away_team)
        out.write("] " + "\n" + "};")
~~~ 

# Design

## Initial Design
Initially, we have two parts, part 1 mainly contains a heatmap showing the number of games in countries, part 2 has force directed graph and a win lose bar as well as pie chart to showing winning rate.

- part1:

- part2:

![part2_sketch](img/part2_sketch.jpg)

This sketch contains the original design of part 2. What on the left is a force directed graph showing all the games within year period. When clicking in the nodes, right part will appear the win lose bar chart for a team in different cities.

## Final Design
Finally, our design contains three parts. With each part consists of some different chart type.

Part 1:
- Heat map:
- Bar chart:

Part 2:

![part2 final](img/part2_finaldesign.png)
This screenshot shows the final design for the part2

- Force directed Graph
- Bar chart

Part 3:
- Slope chart

# Implementation

# Conclusion