import random

# classes https://www.techwithtim.net/tutorials/python-programming/classes-objects-in-python/creating-classes/
# Python program to show that the variables with a value
# assigned in class declaration, are class variables

# Class for Computer Science Student
class CSStudent:
    stream = "cse"  # Class Variable

    def __init__(self, name, age):
        self.name = name  # Instance Variable
        self.age = age  # Instance Variable

    def __repr__(self):
        return self.name + "(" + str(self.age) + ")"

    def __str__(self):
        return self.name + "(" + str(self.age) + ")"


# Objects of CSStudent class
a = CSStudent("Geek", 18)
b = CSStudent("Nerd", 20)

print(":::::::::", a)
print(a.stream)  # prints "cse"
print(b.stream)  # prints "cse"
print(a.name)  # prints "Geek"
print(b.name)  # prints "Nerd"
print(a.age)  # prints "1"
print(b.age)  # prints "2"

# Class variables can be accessed using class
# name also
print(CSStudent.stream)  # prints "cse"

# Now if we change the stream for just a it won't be changed for b
a.stream = "ece"
print(a.stream)  # prints 'ece'
print(b.stream)  # prints 'cse'

# To change the stream for all instances of the class we can change it
# directly from the class
CSStudent.stream = "mech"

print(a.stream)  # prints 'ece'
print(b.stream)  # prints 'mech'


# inheritance https://www.techwithtim.net/tutorials/python-programming/classes-objects-in-python/inheritance/


class GraduateStudent(CSStudent):
    all = []

    @staticmethod
    def list():
        print("______ list of grad students:")
        print(GraduateStudent.all)

    @classmethod
    def betterlist(cls):
        print("______ list of grad students:")
        print(cls.all)

    def __init__(self, name, age):
        super().__init__(name, age)
        GraduateStudent.all.append(self)


gs = GraduateStudent("hans", 23)
for name in ["max", "marcus", "nina"]:
    GraduateStudent(name, 18)
print(gs)
print(dir(GraduateStudent))
GraduateStudent.list()
GraduateStudent.betterlist()

# _ convention https://www.techwithtim.net/tutorials/python-programming/classes-objects-in-python/private-and-public-classes/
# class name starts with _ ... do NOT use this class outside of module
# member name starts with _ ... do NOT use this member outside of class

# static methds for classes that just organize functions together
def valf(*args):
    return next(item for item in args if item is not None)


class Colors:
    Black = 0
    Maroon = 1
    Green = 2
    Olive = 3
    Navy = 4
    Purple = 5
    Teal = 6
    Silver = 7
    Grey = 8
    Red = 9
    Lime = 10
    Yellow = 11
    Blue = 12
    Fuchsia = 13
    Aqua = 14
    White = 15
    Grey0 = 16
    NavyBlue = 17
    DarkBlue = 18
    Blue3 = 19
    Blue3 = 20
    Blue1 = 21
    DarkGreen = 22
    DeepSkyBlue4 = 23
    DeepSkyBlue4 = 24
    DeepSkyBlue4 = 25
    DodgerBlue3 = 26
    DodgerBlue2 = 27
    Green4 = 28
    SpringGreen4 = 29
    Turquoise4 = 30
    DeepSkyBlue3 = 31
    DeepSkyBlue3 = 32
    DodgerBlue1 = 33
    Green3 = 34
    SpringGreen3 = 35
    DarkCyan = 36
    LightSeaGreen = 37
    DeepSkyBlue2 = 38
    DeepSkyBlue1 = 39
    Green3 = 40
    SpringGreen3 = 41
    SpringGreen2 = 42
    Cyan3 = 43
    DarkTurquoise = 44
    Turquoise2 = 45
    Green1 = 46
    SpringGreen2 = 47
    SpringGreen1 = 48
    MediumSpringGreen = 49
    Cyan2 = 50
    Cyan1 = 51
    DarkRed = 52
    DeepPink4 = 53
    Purple4 = 54
    Purple4 = 55
    Purple3 = 56
    BlueViolet = 57
    Orange4 = 58
    Grey37 = 59
    MediumPurple4 = 60
    SlateBlue3 = 61
    SlateBlue3 = 62
    RoyalBlue1 = 63
    Chartreuse4 = 64
    DarkSeaGreen4 = 65
    PaleTurquoise4 = 66
    SteelBlue = 67
    SteelBlue3 = 68
    CornflowerBlue = 69
    Chartreuse3 = 70
    DarkSeaGreen4 = 71
    CadetBlue = 72
    CadetBlue = 73
    SkyBlue3 = 74
    SteelBlue1 = 75
    Chartreuse3 = 76
    PaleGreen3 = 77
    SeaGreen3 = 78
    Aquamarine3 = 79
    MediumTurquoise = 80
    SteelBlue1 = 81
    Chartreuse2 = 82
    SeaGreen2 = 83
    SeaGreen1 = 84
    SeaGreen1 = 85
    Aquamarine1 = 86
    DarkSlateGray2 = 87
    DarkRed = 88
    DeepPink4 = 89
    DarkMagenta = 90
    DarkMagenta = 91
    DarkViolet = 92
    Purple = 93
    Orange4 = 94
    LightPink4 = 95
    Plum4 = 96
    MediumPurple3 = 97
    MediumPurple3 = 98
    SlateBlue1 = 99
    Yellow4 = 100
    Wheat4 = 101
    Grey53 = 102
    LightSlateGrey = 103
    MediumPurple = 104
    LightSlateBlue = 105
    Yellow4 = 106
    DarkOliveGreen3 = 107
    DarkSeaGreen = 108
    LightSkyBlue3 = 109
    LightSkyBlue3 = 110
    SkyBlue2 = 111
    Chartreuse2 = 112
    DarkOliveGreen3 = 113
    PaleGreen3 = 114
    DarkSeaGreen3 = 115
    DarkSlateGray3 = 116
    SkyBlue1 = 117
    Chartreuse1 = 118
    LightGreen = 119
    LightGreen = 120
    PaleGreen1 = 121
    Aquamarine1 = 122
    DarkSlateGray1 = 123
    Red3 = 124
    DeepPink4 = 125
    MediumVioletRed = 126
    Magenta3 = 127
    DarkViolet = 128
    Purple = 129
    DarkOrange3 = 130
    IndianRed = 131
    HotPink3 = 132
    MediumOrchid3 = 133
    MediumOrchid = 134
    MediumPurple2 = 135
    DarkGoldenrod = 136
    LightSalmon3 = 137
    RosyBrown = 138
    Grey63 = 139
    MediumPurple2 = 140
    MediumPurple1 = 141
    Gold3 = 142
    DarkKhaki = 143
    NavajoWhite3 = 144
    Grey69 = 145
    LightSteelBlue3 = 146
    LightSteelBlue = 147
    Yellow3 = 148
    DarkOliveGreen3 = 149
    DarkSeaGreen3 = 150
    DarkSeaGreen2 = 151
    LightCyan3 = 152
    LightSkyBlue1 = 153
    GreenYellow = 154
    DarkOliveGreen2 = 155
    PaleGreen1 = 156
    DarkSeaGreen2 = 157
    DarkSeaGreen1 = 158
    PaleTurquoise1 = 159
    Red3 = 160
    DeepPink3 = 161
    DeepPink3 = 162
    Magenta3 = 163
    Magenta3 = 164
    Magenta2 = 165
    DarkOrange3 = 166
    IndianRed = 167
    HotPink3 = 168
    HotPink2 = 169
    Orchid = 170
    MediumOrchid1 = 171
    Orange3 = 172
    LightSalmon3 = 173
    LightPink3 = 174
    Pink3 = 175
    Plum3 = 176
    Violet = 177
    Gold3 = 178
    LightGoldenrod3 = 179
    Tan = 180
    MistyRose3 = 181
    Thistle3 = 182
    Plum2 = 183
    Yellow3 = 184
    Khaki3 = 185
    LightGoldenrod2 = 186
    LightYellow3 = 187
    Grey84 = 188
    LightSteelBlue1 = 189
    Yellow2 = 190
    DarkOliveGreen1 = 191
    DarkOliveGreen1 = 192
    DarkSeaGreen1 = 193
    Honeydew2 = 194
    LightCyan1 = 195
    Red1 = 196
    DeepPink2 = 197
    DeepPink1 = 198
    DeepPink1 = 199
    Magenta2 = 200
    Magenta1 = 201
    OrangeRed1 = 202
    IndianRed1 = 203
    IndianRed1 = 204
    HotPink = 205
    HotPink = 206
    MediumOrchid1 = 207
    DarkOrange = 208
    Salmon1 = 209
    LightCoral = 210
    PaleVioletRed1 = 211
    Orchid2 = 212
    Orchid1 = 213
    Orange1 = 214
    SandyBrown = 215
    LightSalmon1 = 216
    LightPink1 = 217
    Pink1 = 218
    Plum1 = 219
    Gold1 = 220
    LightGoldenrod2 = 221
    LightGoldenrod = 222
    NavajoWhite1 = 223
    MistyRose1 = 224
    Thistle1 = 225
    Yellow1 = 226
    LightGoldenrod1 = 227
    Khaki1 = 228
    Wheat1 = 229
    Cornsilk1 = 230
    Grey100 = 231
    Grey3 = 232
    Grey7 = 233
    Grey11 = 234
    Grey15 = 235
    Grey19 = 236
    Grey23 = 237
    Grey27 = 238
    Grey30 = 239
    Grey35 = 240
    Grey39 = 241
    Grey42 = 242
    Grey46 = 243
    Grey50 = 244
    Grey54 = 245
    Grey58 = 246
    Grey62 = 247
    Grey66 = 248
    Grey70 = 249
    Grey74 = 250
    Grey78 = 251
    Grey82 = 252
    Grey85 = 253
    Grey89 = 254
    Grey93 = 255

    @staticmethod
    def findbest(name):
        if hasattr(Colors(), name):
            return getattr(Colors(), name)
        all = [x for x in dir(Colors)]
        # print("____________________\n", len(all), all[0], type(all[0]))
        all = [x for x in all if x[0] == x[0].upper() and x[0] != "_"]
        # print(len(all))
        # all = [x.lower() for x in all]
        name = name.lower()
        some = [x for x in all if name in x.lower()]
        # filter(lambda s: name in s, all)]
        print(type(some))
        almost = [x for x in some if len(x) == len(name) + 1]
        exact = [x for x in some if x.lower() == name]
        hasnumbers = [x for x in some if x[-1].isnumeric()]
        # if some has
        print(f"{some}\n{almost}\n{exact}\n{hasnumbers}")  # [x for x in some])
        x = (
            exact[0]
            if len(exact) > 0
            else almost[-1]
            if len(almost) > 0
            else hasnumbers[-1]
            if len(hasnumbers) > 0
            else choose(some)
        )  # "Red"

        # should find the string best matched to name
        res = getattr(Colors(), x)
        print("=>", x, res)  # Colors.__class__)
        return res  # Colors.__class__.__dict__["Grey89"]  # random.choice(some)

    @staticmethod
    def print(*args, **kwargs):  # color="Red", bg=False, **args):
        print("args", args)
        print("kwargs", kwargs)

        if "color" in kwargs or "bg" in kwargs:
            color = "White"  # valf(kwargs.get("color"), "White")
            bg = False  # valf(kwargs.get("bg"), False)
            if "color" in kwargs:
                color = kwargs["color"]
                del kwargs["color"]
            if "bg" in kwargs:
                bg = kwargs["bg"]
                del kwargs["bg"]
            i = color if isinstance(color, int) else Colors.findbest(color)
            code = str(i)
            prefix = ""
            if bg:
                prefix += "\u001b[48;5;" + code + "m"
            else:
                prefix += "\u001b[38;5;" + code + "m"
            print(prefix, end="", sep="")
        print(*args, **kwargs)
        print("\u001b[0m")
        # print(prefix + x + "\u001b[0m", **args)


# print(dir(list))
x = hasattr(Colors(), "Green")
Colors.print("hallo", "das", x, bg=True, color="Green")
