class Object:
    id = 0
    name = ""
    data = {}

class Category:
    id = 0
    numObjects = 0
    ids = []

class Transition:
    id = 0
    requirements = (0,0)
    results = (0,0)
    time = 0
