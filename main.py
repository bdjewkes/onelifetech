import sys
import os

from jsonpickle import encode, set_encoder_options

from gamedata import parser, config


def describe_categories(data):
    for cat_id, cat in data.categories.items():
        print("Next Category " + str(cat_id))
        for obj_id in cat.ids:
            print(data.objects[obj_id].name)


def write_game_data(game_data):
    def write_output(data, name):
        with open(os.path.join('output', '{}.json'.format(name)), "w") as f:
            f.write(encode(data, unpicklable=False))
        

    if not os.path.exists('output'):
        os.makedirs('output')
    set_encoder_options('simplejson', sort_keys=True, indent=4)
    write_output(game_data.objects, "objects")
    write_output(game_data.categories, "categories")
    write_output(game_data.transitions, "transitions")

def get_objects_with_stat(objects, stat):
    return [obj for _, obj in objects.items() if hasattr(obj, stat)]
    
    for id, obj in objects.items():
        if hasattr(obj, stat):
            objs.push(obj)
    

if __name__ == "__main__":
    game_data = parser.get_all_game_data(config.GAME_DIR)
    write_game_data(game_data)

