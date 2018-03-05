import os
import sys
import re
from gamedata.types import Object, Category, Transition

import jsonpickle

class GameData:
    objects = []
    categories = []
    transitions = []

    def __init__(self, objs=[], cats=[], trans=[]):
        self.objects=objs
        self.categories=cats
        self.transitions=trans

def get_all_game_data(dir):
    def get_data_of_type(type, parser):
        return get_data_from_directory(os.path.join(dir, type), parser)

    objects = get_data_of_type("objects", object_parser)
    categories = get_data_of_type("categories", category_parser)
    transitions = get_data_of_type("transitions", transition_parser)
    return GameData(
        objs = { x.id:x for x in objects },
        cats = { x.id:x for x in categories },
        trans = transitions
    )


def get_data_from_directory(dir, parser):
    all_data = []
    for filename in os.listdir(dir):
        if not is_game_data(filename):
            continue

        full_path = os.path.join(dir, filename)
        with open(full_path) as file:
            lines = file.read().splitlines()

        data = parser(lines, filename)
        all_data.append(data)
    return all_data
            

def is_game_data(filename):
    return re.match("[\d]*\\.txt", filename)

def parse_assignment_line(line):
    """
    Parses data file assignment line with format x=y
    Returns a tuple key, value
    """
    kvp = line.split("=")
    return kvp[0], kvp[1]

def object_parser(lines, *args):
    """
    returns a dictionary of all fields for the object
    """
    obj = Object()
    obj.id = int(parse_assignment_line(lines[0])[1])
    obj.name = lines[1]
    for l in lines[2:]:
        key, value = parse_assignment_line(l)
        setattr(obj, key, value)
    
    return obj

def category_parser(lines, *args):
    cat = Category()
    cat.id = int(parse_assignment_line(lines[0])[1])
    _, numObjVal = parse_assignment_line(lines[1])
    cat.numObjects = numObjVal
    cat.ids = [int(l) for l in lines[2:]]
    return cat

def transition_parser(lines, filename):
    trans = Transition()
    line = lines[0]
    (newActor, newTarget, autoDecaySecs,
     actorMinUseFraction, targetMinUseFraction,
     reverseUseAction, reverseUseTargetFlag,
    move, desiredMoveDist) = [t(s) for t,s in zip((int,int,int,float,float,int,int,int),line.split())]
    print(newTarget)
    return trans
        
