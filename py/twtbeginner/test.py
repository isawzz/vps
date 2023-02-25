""" data types: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/variables-data-types/
int 0, 
str 'Tim', "hello", '23', 
bool True, False, 
float 0.32, 1.2
"""
name = "Tim"
print(name)
# name = input('enter name: ')
# print('how are you,',name)

""" operators https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/basic-operators-input/
+  # addition 
-  # subtraction
/  # division
*  # multiplication 
** # exponential
// # integer division (removes decimal portion)
%  # modulus (gives remainder of division) 
newStr = "hello" + "tim"  # newStr is "hellotim"
newStr2 = "python" * 3    # newStr2 is "pythonpythonpython"

comparison: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/conditions/
<   # less than
<=  # less than or equal to
>   # greater than
>=  # greater than or equal to
==  # equal to
!=  # not equal to

if-then-else: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/if-elif-else/

"""

# x = int(input('enter number: '))
x = 5
if x == 4:
    print("YES! x == 4")
elif x < 4:
    print("smaller!")
else:
    print("larger")

# and or not: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/chained-conditionals-nested-statements/
if x >= 4 and x <= 10:
    print("between")
else:
    print("NOT between 4 and 10")

# for loop: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/for-loops/
for x in range(2, 10, 2):  # 10 is excluded! range(10) == range(0,10,1)
    print("x", x)
    x = x + 3  # wow, this is a different x!!!

# while loop: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/while-loops/
x = 0
while x in range(10):  # 10 is excluded! range(10) == range(0,10,1)
    print("x", x)
    if x == 6:
        break
    x = x + 3  # wow, this is a different x!!!

# list: https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/lists-and-tuples/
arr = ["hallo", 3, "a", 4, 5, 6]
print(arr, arr[-1])
print(arr[1:])
del arr[2]
arr.remove(4)
arr.append(5)
print(arr)

# tuples immutable (cannot del, remove, append)
t = (1, 2, 3)
print(t[1])

# for ... in ... https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/iteration-by-item-for-loops-continued/
for x in t:
    print(x + 1)

# string methods https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/string-methods/
s = "  anders als alles"
print(s)
s = s.strip()
print(s.split())
print(s.lower())
print(s.upper())
print(len(s))

# slice : operator https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/slice-operator/
start, stop, step = 1, 5, 2
x = s[start:stop:step] #defaults to [0:len(s):1]
print(x)
print(s[:stop:step])
print(s[start:])
print(s[:stop])
print(s[start::step])
start, stop, step = 0, -2, 3
x = s[start:stop:step]
print(x)
print(s[:stop:step])
print(s[start:])
print(s[:stop])
print(s[start::step])
print(1, 2, 3, sep="=")

print(s[::-1])  # reverse string or array

s = "01234567"
print(s[-2:1:-1])  # 65432
print(s[1:-2:-1])  # does not print anything!
print(s[1:-2])  # 12345
print(s[1::-1])  # 10

print('"' + "new string to slice"[4:12:2] + '"')  # -> "srn "

# insert stuff:
arr = ["hallo", 2, 3, 4, 5]
# arr[1:1] = -4
print(arr)

myList = [97, 98, 99, 100]
myList[1:2] = [-40, -30, -12]  # inserts at index 1, removes 1 element
print(myList)  # prints [97, -40, 98, 99, 100]

myList = [97, 98, 99, 100]
myList[1:1] = [-40, -30, -12]  # inserts at index 1, does NOT remove anything
print(myList)  # prints [97, -40, 98, 99, 100]

myStr = "hello"
myStr[-1]  # -> "o"
myStr[::-1]  # -> "olleh"
myStr[:-3]  # -> "he"

# functions https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/functions/
