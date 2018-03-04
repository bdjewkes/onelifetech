import sys
print(sys.path)
from os import path
from onelifetech import parser, config

game_data = parser.get_all_game_data(config.GAME_DIR)

for cat_id, cat in game_data.categories.items():
    print("Next Category " + str(cat_id))
    for obj_id in cat.ids:
        print(game_data.objects[obj_id].name)
