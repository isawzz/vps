
codes={}
idx=0

for i in range(0, 16):
    for j in range(0, 16):
        code = str(i * 16 + j)
        codes.append(code)
        sys.stdout.write("\u001b[38;5;" + code + "m " + code.ljust(4))
    print("\u001b[0m")

'Black Maroon Green Olive Navy Purple Teal Silver Grey Red Lime Yellow Blue Fuchsia Aqua White'
'Grey0 NavyBlue DarkBlue Blue3 Blue3 Blue1 DarkGreen DeepSkyBlue4 DeepSkyBlue4 DeepSkyBlue4 DodgerBlue3
DodgerBlue2
Green4
SpringGreen4
Turquoise4
DeepSkyBlue3
'DeepSkyBlue3
DodgerBlue1
Green3
SpringGreen3
DarkCyan
LightSeaGreen
DeepSkyBlue2
DeepSkyBlue1
Green3
SpringGreen3
SpringGreen2
Cyan3
DarkTurquoise
Turquoise2
Green1
SpringGreen2
'SpringGreen1
MediumSpringGreen
Cyan2
Cyan1
DarkRed
DeepPink4
Purple4
Purple4
Purple3
BlueViolet
Orange4
Grey37
MediumPurple4
SlateBlue3
SlateBlue3
RoyalBlue1
'Chartreuse4
DarkSeaGreen4
PaleTurquoise4
SteelBlue
SteelBlue3
CornflowerBlue
Chartreuse3
DarkSeaGreen4
CadetBlue
CadetBlue
SkyBlue3
SteelBlue1
Chartreuse3
PaleGreen3
SeaGreen3
Aquamarine3
'MediumTurquoise
SteelBlue1
Chartreuse2
SeaGreen2
SeaGreen1
SeaGreen1
Aquamarine1
DarkSlateGray2
DarkRed
DeepPink4
DarkMagenta
DarkMagenta
DarkViolet
Purple
Orange4
LightPink4
'Plum4
MediumPurple3
MediumPurple3
SlateBlue1
Yellow4
Wheat4
Grey53
LightSlateGrey
MediumPurple
LightSlateBlue
Yellow4
DarkOliveGreen3
DarkSeaGreen
LightSkyBlue3
LightSkyBlue3
SkyBlue2
Chartreuse2
DarkOliveGreen3
PaleGreen3
DarkSeaGreen3
DarkSlateGray3
SkyBlue1
Chartreuse1
LightGreen
LightGreen
PaleGreen1
Aquamarine1
DarkSlateGray1
Red3
DeepPink4
MediumVioletRed
Magenta3
DarkViolet
Purple
DarkOrange3
IndianRed
HotPink3
MediumOrchid3
MediumOrchid
MediumPurple2
DarkGoldenrod
LightSalmon3
RosyBrown
Grey63
MediumPurple2
MediumPurple1
Gold3
DarkKhaki
NavajoWhite3
Grey69
LightSteelBlue3
LightSteelBlue
Yellow3
DarkOliveGreen3
DarkSeaGreen3
DarkSeaGreen2
LightCyan3
LightSkyBlue1
GreenYellow
DarkOliveGreen2
PaleGreen1
DarkSeaGreen2
DarkSeaGreen1
PaleTurquoise1
Red3
DeepPink3
DeepPink3
Magenta3
Magenta3
Magenta2
DarkOrange3
IndianRed
HotPink3
HotPink2
Orchid
MediumOrchid1
Orange3
LightSalmon3
LightPink3
Pink3
Plum3
Violet
Gold3
LightGoldenrod3
Tan
MistyRose3
Thistle3
Plum2
Yellow3
Khaki3
LightGoldenrod2
LightYellow3
Grey84
LightSteelBlue1
Yellow2
DarkOliveGreen1
DarkOliveGreen1
DarkSeaGreen1
Honeydew2
LightCyan1
Red1
DeepPink2
DeepPink1
DeepPink1
Magenta2
Magenta1
OrangeRed1
IndianRed1
IndianRed1
HotPink
HotPink
MediumOrchid1
DarkOrange
Salmon1
LightCoral
PaleVioletRed1
Orchid2
Orchid1
Orange1
SandyBrown
LightSalmon1
LightPink1
Pink1
Plum1
Gold1
LightGoldenrod2
LightGoldenrod2
NavajoWhite1
MistyRose1
Thistle1
Yellow1
LightGoldenrod1
Khaki1
Wheat1
Cornsilk1
Grey100
Grey3
Grey7
Grey11
Grey15
Grey19
Grey23
Grey27
Grey30
Grey35
Grey39
Grey42
Grey46
Grey50
Grey54
Grey58
Grey62
Grey66
Grey70
Grey74
Grey78
Grey82
Grey85
Grey89
Grey93








# Reset
reset = "\033[0m"  # Text Reset

prefix = "\033["

normal = "0;"
bold = "1;"
underline = "4;"

black = "30"  # Black
red = "31"  # Red
green = "32"  # Green
yellow = "33"  # Yellow
blue = "34"  # Blue
purple = "35"  # Purple
cyan = "36"  # Cyan
white = "37"  # White

regular = ";0m"
intense = ";1m"

import sys



for i in range(0, 16):
    for j in range(0, 16):
        code = str(i * 16 + j)
        sys.stdout.write("\u001b[38;5;" + code + "m " + code.ljust(4))
    print("\u001b[0m")


Color_Off = "\033[0m"  # Text Reset

# Regular Colors
Black = "\033[0;30m"  # Black
Red = "\033[0;31m"  # Red
Green = "\033[0;32m"  # Green
Yellow = "\033[0;33m"  # Yellow
Blue = "\033[0;34m"  # Blue
Purple = "\033[0;35m"  # Purple
Cyan = "\033[0;36m"  # Cyan
White = "\033[0;37m"  # White

# Bold
BBlack = "\033[1;30m"  # Black
BRed = "\033[1;31m"  # Red
BGreen = "\033[1;32m"  # Green
BYellow = "\033[1;33m"  # Yellow
BBlue = "\033[1;34m"  # Blue
BPurple = "\033[1;35m"  # Purple
BCyan = "\033[1;36m"  # Cyan
BWhite = "\033[1;37m"  # White

# Underline
UBlack = "\033[4;30m"  # Black
URed = "\033[4;31m"  # Red
UGreen = "\033[4;32m"  # Green
UYellow = "\033[4;33m"  # Yellow
UBlue = "\033[4;34m"  # Blue
UPurple = "\033[4;35m"  # Purple
UCyan = "\033[4;36m"  # Cyan
UWhite = "\033[4;37m"  # White

# Background
On_Black = "\033[40m"  # Black
On_Red = "\033[41m"  # Red
On_Green = "\033[42m"  # Green
On_Yellow = "\033[43m"  # Yellow
On_Blue = "\033[44m"  # Blue
On_Purple = "\033[45m"  # Purple
On_Cyan = "\033[46m"  # Cyan
On_White = "\033[47m"  # White

# High Intensty
IBlack = "\033[0;90m"  # Black
IRed = "\033[0;91m"  # Red
IGreen = "\033[0;92m"  # Green
IYellow = "\033[0;93m"  # Yellow
IBlue = "\033[0;94m"  # Blue
IPurple = "\033[0;95m"  # Purple
ICyan = "\033[0;96m"  # Cyan
IWhite = "\033[0;97m"  # White

# Bold High Intensty
BIBlack = "\033[1;90m"  # Black
BIRed = "\033[1;91m"  # Red
BIGreen = "\033[1;92m"  # Green
BIYellow = "\033[1;93m"  # Yellow
BIBlue = "\033[1;94m"  # Blue
BIPurple = "\033[1;95m"  # Purple
BICyan = "\033[1;96m"  # Cyan
BIWhite = "\033[1;97m"  # White

# High Intensty backgrounds
On_IBlack = "\033[0;100m"  # Black
On_IRed = "\033[0;101m"  # Red
On_IGreen = "\033[0;102m"  # Green
On_IYellow = "\033[0;103m"  # Yellow
On_IBlue = "\033[0;104m"  # Blue
On_IPurple = "\033[10;95m"  # Purple
On_ICyan = "\033[0;106m"  # Cyan
On_IWhite = "\033[0;107m"  # White

# Various variables you might want for your PS1 prompt instead
Time12h = "\T"
Time12a = "\@"
PathShort = "\w"
PathFull = "\W"
NewLine = "\n"
Jobs = "\j"
