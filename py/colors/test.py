def make_color_class():
    f = open("list.txt", "r")
    arr = f.readlines()
    # print(arr)
    text = "class colors:\n\t"
    i = 0
    for l in arr:
        x = l[:-1]
        # text += "'" + x + "':" + str(i) + ","
        text += x + " = " + str(i) + "\n\t"
        i += 1
        # print(x)
    # text = text[:-1] + "}"
    print(text)
    fres = open("listclass.py", "w")
    fres.write(text)
    fres.close()


def make_color_dict():
    f = open("list.txt", "r")
    arr = f.readlines()
    # print(arr)
    text = "colorlist = {"
    i = 0
    for l in arr:
        x = l[:-1]
        text += "'" + x + "':" + str(i) + ","
        i += 1
        # print(x)
    text = text[:-1] + "}"
    print(text)
    fres = open("listdi.py", "w")
    fres.write(text)
    fres.close()


make_color_class()
