import omnibelt as om


class mdict(om.adict):
    def __init__(self, *args, **kwargs):
        super().__init__(args)


def pcolor(x, c=None, f=None):
    if c is None:
        print("\033[1m" + "reset" + "\033[0m")
        print(x)
        # om.printc(x, om.bcolors.color_table["yellow"], f)
    else:
        om.printc(x, om.bcolors.color_table[c], om.bcolors.fmt_table[f])


def listcf(verbose=False):
    cs, fs = om.bcolors.color_table.keys(), om.bcolors.fmt_table.keys()
    cs, fs = [c for c in cs], [c for c in fs]
    if verbose:
        print("colors", cs)
        print("formatting", fs)
    return cs, fs


cs, fs = listcf(True)
di = mdict({1: "hallo", 2: "geh"})
# pcolor("hallo", cs[1], fs[1])
pcolor("back")
# print("\033[1m" + "Title" + "\033[0m")
