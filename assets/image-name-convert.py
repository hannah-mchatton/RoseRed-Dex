import os
import json

data = open('../data/dex.json')
dex = json.loads(data.read())
data.close()

pokemon = []
for i in range(len(dex)):
    dexEntry = dex[i]

    name = dexEntry['NAME']
    
    formIndex = dexEntry['FORMINDEX']
    if formIndex != '':
        formIndex = int(formIndex) - 1
    else:
        formIndex = -1

    formName = dexEntry['FORM']

    pokemon.append({
        "name": name,
        "formName": formName,
        "formIndex": formIndex
    })

for i in range(len(pokemon)):
    if pokemon[i]["formIndex"] != -1:
        if pokemon[i]["formIndex"] != 0:
            os.rename(f'./converted/back/{pokemon[i]["name"]}-{pokemon[i]["formName"]}.png', f'./converted/back/{pokemon[i]["name"]}_{pokemon[i]["formIndex"]}.png')
            os.rename(f'./converted/back shiny/{pokemon[i]["name"]}-{pokemon[i]["formName"]}.png', f'./converted/back shiny/{pokemon[i]["name"]}_{pokemon[i]["formIndex"]}.png')
        else:
            os.rename(f'./converted/back/{pokemon[i]["name"]}-{pokemon[i]["formName"]}.png', f'./converted/back/{pokemon[i]["name"]}.png')
            os.rename(f'./converted/back shiny/{pokemon[i]["name"]}-{pokemon[i]["formName"]}.png', f'./converted/back shiny/{pokemon[i]["name"]}.png')
    else:
        os.rename(f'./converted/back/{pokemon[i]["name"]}.png', f'./converted/back/{pokemon[i]["name"]}.png')
        os.rename(f'./converted/back shiny/{pokemon[i]["name"]}.png', f'./converted/back shiny/{pokemon[i]["name"]}.png')