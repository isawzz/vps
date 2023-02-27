from omnibelt import adict
from itertools import chain, combinations

def make_adict(skeys,vals):
  x=adict()
  keys=skeys.split()
  for i in range(len(keys)):
    x[keys[i]] = vals[i]
  return x

def powerset(iterable,lmin,lmax):
    "powerset([1,2,3]) --> () (1,) (2,) (3,) (1,2) (1,3) (2,3) (1,2,3)"
    s = list(iterable)
    if not lmin: lmin = 0
    if not lmax: lmax = len(s)
    return chain.from_iterable(combinations(s, r) for r in range(lmin,lmax+1))

def hallo():
  print('hallo')
  



















