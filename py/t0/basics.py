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
x = s[start:stop:step]  # defaults to [0:len(s):1]
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
from omnibelt import adict

x = adict()
x.banana = 4
x.apple = 5
x.add = lambda a, b: a * b
print(x, x.add(3, 5))
y = x
y.hallo = lambda a: print(a)
print(x.hallo("das"))  # x,y ist dasselbe object


def make_adict(skeys, vals):
    x = adict()
    keys = skeys.split()
    for i in range(len(keys)):
        x[keys[i]] = vals[i]
    return x


di = make_adict("a b c", [1, 2, 3])
print(di.a)

# file IO https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/file-io-reading-files/
f = open("C:\\D\\a04\\v2.txt", "r")
lines = f.readlines()  # each line has \n at the end!
f.close()  # wird nur bei write gebraucht!
print("lines", lines)
# or
with open("C:\\D\\a04\\v2.txt", "r") as f:
    lines = f.read().splitlines()
print("lines", lines)
# or
lines = [line.rstrip() for line in open("C:\\D\\a04\\v2.txt", "r").readlines()]
print("lines", lines)

# file write https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/file-iowriting-files/
# file is created if does not exist!
f = open("C:\\D\\a04\\v2.txt", "a")  #'w' overrides file
# f.write('\n'+input('enter line: '))
f.close()

# string methods https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/list-methods-count-find/
s = "hallo was ist da los"
print(s.find("a"))  # -> 1 (geht nur fuer string!!!!!!!)

myList = ["a", "b", "b", "a", "c", "d"]
myList.count("a")  # -> 2
myList.index("a")  # -> 0
myList.count("b")  # -> 2
if "hello" in myList:
    myList.index("hello")  # -> ERROR!!!
# If the element is not found .find() will return -1

# modular programming https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/introduction-to-modular-programming/
# math pygame os images numpy
import math

x = math.sqrt(44)
print(x)

import cxl

cxl.hallo()
x = cxl.make_adict("name age", ["ma", 62])
# y=module1.make_adict('fen',[1,2,3])
# x.add(y)
x.fen = [1, 2, 3]
print(x, x.name, x.age, x.todict(), x.fromkeys(["name"]))

c = cxl.cartesian([1, 2, 3], [4, 5])
print(c)

# optional params
def func1(x=5, y=5):
    return x + y


print(func1())

# error handling https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/error-handling-try-except/
print("I will add 5 to any number you give me.")
num = "a"  # input("type a number:")

try:
    addedNum = int(num) + 5
    print("5 +", num, "is", addedNum)
except:
    print("That is not a number!!")

# global vs local scope https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/global-vs-local/
# reuse of name in function will declare new var
print("*** scope test ***")
v1 = 1


def func1():
    v1 = 4
    print(v1)


def func2():
    print(v1)


def func3():
    global v1
    v1 = 3
    print(v1)


print(v1, func1(), func2(), func3(), v1)

# classes https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/classes-and-objects/
print("*** classes and objects ***")
print(type("hallo"))


class mdict(adict):
    def __init__(self, o):
        pass
