class Object:
    id = 0
    name = ""
    parameters = {}

class Category:
    id = 0
    numObjects = 0
    ids = []


"""
from: https://github.com/jasonrohrer/OneLife/blob/master/gameSource/transitionBank.cpp
sscanf( contents, "%d %d %d %f %f %d %d %d %d", 
                        &newActor, &newTarget, &autoDecaySeconds,
                        &actorMinUseFraction, &targetMinUseFraction,
                        &reverseUseActorFlag,
                        &reverseUseTargetFlag,
                        &move,
                        &desiredMoveDist );
"""

class Transition:
    # the 'actor', None or id (int)
    beforeInHand = None 
    # the 'target', None or id (int)
    beforeOnGround = None 

    # the 'newActor', None or id (int)
    afterInHand = None
    # the 'newTarget' None or id (int)
    afterOnGround = None

    autoDecaySeconds = 0
    epochAutoDecay = 0

    lastUseActor = False
    lastUseTarget = False

    reverseUseActor = 0
    reverseUseTarget = 0
    
    actorMinUseFraction = 0.0
    targetMinUseFracion = 0.0
    
    move = 0
    desiredMoveDist = 0
    
    
