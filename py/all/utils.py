import random


def arrBest(arr, key, func=None, cutat=1):
    res = []
    func = valf(func, sDistance)
    for a in arr:
        score = func(a, key)
        if score <= cutat:
            return a
        # print(a, key, score)
        res.append({"key": a, "score": score})
    res.sort(key=lambda x: x["score"])  # , reverse=True)
    # print(res)
    return res[0]["key"]


def arrbest(*args, **kws):
    return arrBest(*args, **kws)


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
    Blue4 = 20
    Blue1 = 21
    DarkGreen = 22
    DeepSkyBlue4 = 23
    DeepSkyBlue5 = 24
    DeepSkyBlue6 = 25
    DodgerBlue3 = 26
    DodgerBlue2 = 27
    Green4 = 28
    SpringGreen4 = 29
    Turquoise4 = 30
    DeepSkyBlue7 = 31
    DeepSkyBlue8 = 32
    DodgerBlue1 = 33
    Green3 = 34
    SpringGreen3 = 35
    DarkCyan = 36
    LightSeaGreen = 37
    DeepSkyBlue2 = 38
    DeepSkyBlue1 = 39
    Green5 = 40
    SpringGreen5 = 41
    SpringGreen6 = 42
    Cyan3 = 43
    DarkTurquoise = 44
    Turquoise2 = 45
    Green1 = 46
    SpringGreen7 = 47
    SpringGreen1 = 48
    MediumSpringGreen = 49
    Cyan2 = 50
    Cyan1 = 51
    DarkRed = 52
    DeepPink4 = 53
    Purple4 = 54
    Purple5 = 55
    Purple3 = 56
    BlueViolet = 57
    Orange4 = 58
    Grey37 = 59
    MediumPurple4 = 60
    SlateBlue3 = 61
    SlateBlue4 = 62
    RoyalBlue1 = 63
    Chartreuse4 = 64
    DarkSeaGreen4 = 65
    PaleTurquoise4 = 66
    SteelBlue = 67
    SteelBlue3 = 68
    CornflowerBlue = 69
    Chartreuse3 = 70
    DarkSeaGreen5 = 71
    CadetBlue = 72
    CadetBlue1 = 73
    SkyBlue3 = 74
    SteelBlue1 = 75
    Chartreuse5 = 76
    PaleGreen3 = 77
    SeaGreen3 = 78
    Aquamarine3 = 79
    MediumTurquoise = 80
    SteelBlue2 = 81
    Chartreuse2 = 82
    SeaGreen2 = 83
    SeaGreen1 = 84
    SeaGreen4 = 85
    Aquamarine1 = 86
    DarkSlateGray2 = 87
    DarkRed1 = 88
    DeepPink5 = 89
    DarkMagenta = 90
    DarkMagenta1 = 91
    DarkViolet = 92
    Purple1 = 93
    Orange5 = 94
    LightPink4 = 95
    Plum4 = 96
    MediumPurple5 = 97
    MediumPurple6 = 98
    SlateBlue1 = 99
    Yellow4 = 100
    Wheat4 = 101
    Grey53 = 102
    LightSlateGrey = 103
    MediumPurple = 104
    LightSlateBlue = 105
    Yellow5 = 106
    DarkOliveGreen3 = 107
    DarkSeaGreen = 108
    LightSkyBlue4 = 109
    LightSkyBlue5 = 110
    SkyBlue2 = 111
    Chartreuse6 = 112
    DarkOliveGreen4 = 113
    PaleGreen4 = 114
    DarkSeaGreen3 = 115
    DarkSlateGray3 = 116
    SkyBlue1 = 117
    Chartreuse1 = 118
    LightGreen = 119
    LightGreen1 = 120
    PaleGreen1 = 121
    Aquamarine2 = 122
    DarkSlateGray1 = 123
    Red3 = 124
    DeepPink7 = 125
    MediumVioletRed = 126
    Magenta3 = 127
    DarkViolet2 = 128
    Purple6 = 129
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
    MediumPurple3 = 140
    MediumPurple1 = 141
    Gold3 = 142
    DarkKhaki = 143
    NavajoWhite3 = 144
    Grey69 = 145
    LightSteelBlue3 = 146
    LightSteelBlue = 147
    Yellow3 = 148
    DarkOliveGreen5 = 149
    DarkSeaGreen6 = 150
    DarkSeaGreen2 = 151
    LightCyan3 = 152
    LightSkyBlue1 = 153
    GreenYellow = 154
    DarkOliveGreen2 = 155
    PaleGreen2 = 156
    DarkSeaGreen7 = 157
    DarkSeaGreen1 = 158
    PaleTurquoise1 = 159
    Red4 = 160
    DeepPink3 = 161
    DeepPink6 = 162
    Magenta4 = 163
    Magenta5 = 164
    Magenta2 = 165
    DarkOrange4 = 166
    IndianRed1 = 167
    HotPink4 = 168
    HotPink2 = 169
    Orchid = 170
    MediumOrchid1 = 171
    Orange3 = 172
    LightSalmon4 = 173
    LightPink3 = 174
    Pink3 = 175
    Plum3 = 176
    Violet = 177
    Gold2 = 178
    LightGoldenrod2 = 179
    Tan = 180
    MistyRose3 = 181
    Thistle3 = 182
    Plum2 = 183
    Yellow1 = 184
    Khaki3 = 185
    LightGoldenrod1 = 186
    LightYellow3 = 187
    Grey84 = 188
    LightSteelBlue1 = 189
    Yellow2 = 190
    DarkOliveGreen1 = 191
    DarkOliveGreen7 = 192
    DarkSeaGreen8 = 193
    Honeydew2 = 194
    LightCyan1 = 195
    Red1 = 196
    DeepPink2 = 197
    DeepPink1 = 198
    DeepPink8 = 199
    Magenta8 = 200
    Magenta1 = 201
    OrangeRed1 = 202
    IndianRed2 = 203
    IndianRed3 = 204
    HotPink = 205
    HotPink1 = 206
    MediumOrchid2 = 207
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
    LightGoldenrod3 = 221
    LightGoldenrod = 222
    NavajoWhite1 = 223
    MistyRose1 = 224
    Thistle1 = 225
    Yellow7 = 226
    LightGoldenrod4 = 227
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
        arr = [x for x in dir(Colors) if x[0] == x[0].upper() and x[0] != "_"]
        print(len(arr))
        x = arrbest(arr, name)
        print("best", x)
        res = getattr(Colors(), x)
        print("=>", x, res)  # Colors.__class__)
        return res  # Colors.__class__.__dict__["Grey89"]  # random.choice(some)

    @staticmethod
    def print(*args, **kwargs):  # color="Red", bg=False, **args):
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


def sDistance(s, key):
    if s == key:
        return 0
    lkey = key.lower()
    ls = s.lower()
    if ls == lkey:
        return 1
    if ls.startswith(lkey):
        return 2
    if ls.endswith(lkey):
        return 3
    if lkey in ls:
        return abs(len(ls) - len(lkey)) + 2
    return 100


def sdistance(*args):
    return sDistance(*args)


def valf(*args):
    return next(item for item in args if item is not None)


# TESTING
# x = arrBest(["Hallo", "darkblue3", "blue3", "deepskyblue"], "Blue")
# Colors.print(x, color="green", bg=True)
