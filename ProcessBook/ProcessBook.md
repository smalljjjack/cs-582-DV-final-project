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

## Data Processing 
This dataset has already contains everything we needed to do the visualization. But this is the reason that this dataset must be processed before using. First, in terms of winning rate for different kinds of games, we need set Win or Lose or Defend based on the score. Second, It will be convenient for us to fist do some classification based on the year, country. 

Data processing is mainly done in python. We use pandas to read the csv data and then write the desired data into a js file, which will be included as script tag for the project. So in our project we can easily access to it.

# Design

## Initial Design
Initially, we have two parts, Heatmap and Win Lose Bar chat.
- Heatmap:

- Win Lose Bar:

## Final Design
Finally, our design contains three parts. With each part consists of some different chart type.
Part 1:
- Heat map:
- Bar chart:
Part 2:
- Force directed Graph
- Bar chart
Part 3:
- Slope chart
# Implementation

# Conclusion
