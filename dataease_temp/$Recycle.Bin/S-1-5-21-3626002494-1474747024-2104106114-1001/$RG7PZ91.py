# Simple Adventure Game
# A beginner-friendly text adventure with nested if statements.

print("Welcome to the Adventure Game!")
print()

print("You are walking in the forest. It is getting dark.")
print("You see two paths ahead.")
print()

choice1 = input("Do you take the LEFT path or the RIGHT path? ").lower()

if choice1 == "left":
    print("You go left and find a small cottage.")
    print()
    
    choice2 = input("Do you ENTER the cottage or WALK past it? ").lower()
    
    if choice2 == "enter":
        print("Inside the cottage, you find a friendly old man.")
        print("He gives you food and shelter for the night.")
        print()
        
        choice3 = input("Do you STAY or LEAVE in the morning? ").lower()
        
        if choice3 == "stay":
            print("You stay with the old man and become friends.")
            print("THE END - Good ending!")
        elif choice3 == "leave":
            print("You leave and find your way home.")
            print("THE END - You made it home safely!")
        else:
            print("That's not a valid choice.")
            print("THE END")
    
    elif choice2 == "walk":
        print("You walk past the cottage and continue down the path.")
        print("You see a wild bear in the distance!")
        print()
        
        choice3 = input("Do you RUN or HIDE? ").lower()
        
        if choice3 == "run":
            print("You run as fast as you can.")
            print("You escape the bear and find the main road!")
            print("THE END - You made it to safety!")
        elif choice3 == "hide":
            print("You hide behind a tree and the bear walks past.")
            print("You wait until it's gone, then find your way home.")
            print("THE END - You made it home safely!")
        else:
            print("That's not a valid choice.")
            print("THE END")
    
    else:
        print("That's not a valid choice.")
        print("THE END")

elif choice1 == "right":
    print("You go right and find a river.")
    print()
    
    choice2 = input("Do you SWIM across or LOOK for a bridge? ").lower()
    
    if choice2 == "swim":
        print("The river is cold but you make it across!")
        print()
        
        choice3 = input("Do you rest on the other side or KEEP going? ").lower()
        
        if choice3 == "rest":
            print("You rest and feel much better.")
            print("The next morning you find a town!")
            print("THE END - Good ending!")
        elif choice3 == "keep":
            print("You keep going even though you're tired.")
            print("You find a main road and flag down a car.")
            print("THE END - You got a ride home!")
        else:
            print("That's not a valid choice.")
            print("THE END")
    
    elif choice2 == "look":
        print("You walk along the river and find a wooden bridge!")
        print()
        
        choice3 = input("Do you CROSS the bridge or CAMP here? ").lower()
        
        if choice3 == "cross":
            print("You cross the bridge and find a road on the other side.")
            print("A car comes by and gives you a ride home.")
            print("THE END - You made it home!")
        elif choice3 == "camp":
            print("You camp by the bridge for the night.")
            print("In the morning you cross the bridge safely.")
            print("THE END - You made it home safely!")
        else:
            print("That's not a valid choice.")
            print("THE END")
    
    else:
        print("That's not a valid choice.")
        print("THE END")

else:
    print("That's not a valid choice!")
    print("You get confused and go in circles all night.")
    print("THE END - Bad ending")

print()
print("Thanks for playing!")
