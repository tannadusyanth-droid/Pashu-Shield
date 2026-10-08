import re, numpy as np
from PIL import Image, ImageDraw
def flat(d):
    toks=re.findall(r"[MLQCZHV]|-?\d*\.?\d+",d); i=0; polys=[]; cur=[]; pt=(0,0)
    def num():
        nonlocal i; v=float(toks[i]); i+=1; return v
    while i<len(toks):
        c=toks[i]; i+=1
        if c=="M":
            if len(cur)>2: polys.append(cur)
            pt=(num(),num()); cur=[pt]
        elif c=="L": pt=(num(),num()); cur.append(pt)
        elif c=="H": pt=(num(),pt[1]); cur.append(pt)
        elif c=="V": pt=(pt[0],num()); cur.append(pt)
        elif c=="Q":
            c1=(num(),num()); e=(num(),num())
            for k in range(1,9):
                t=k/8; cur.append(((1-t)**2*pt[0]+2*(1-t)*t*c1[0]+t*t*e[0],(1-t)**2*pt[1]+2*(1-t)*t*c1[1]+t*t*e[1]))
            pt=e
        elif c=="C":
            c1=(num(),num());c2=(num(),num());e=(num(),num())
            for k in range(1,9):
                t=k/8; cur.append(((1-t)**3*pt[0]+3*(1-t)**2*t*c1[0]+3*(1-t)*t*t*c2[0]+t**3*e[0],(1-t)**3*pt[1]+3*(1-t)**2*t*c1[1]+3*(1-t)*t*t*c2[1]+t**3*e[1]))
            pt=e
        elif c=="Z":
            if len(cur)>2: polys.append(cur)
            cur=[]
    if len(cur)>2: polys.append(cur)
    return polys
def bbox(d):
    pts=[q for poly in flat(d) for q in poly]
    xs=[q[0] for q in pts]; ys=[q[1] for q in pts]
    return min(xs),min(ys),max(xs),max(ys)

def raster(d,S=160,W=900,H=300,ox=20,oy=200,path="out.png"):
    acc=np.zeros((H,W),dtype=np.uint8)
    for p in flat(d):
        m=Image.new("1",(W,H),0); ImageDraw.Draw(m).polygon([(ox+x*S,oy+y*S) for x,y in p],fill=1); acc^=np.array(m,dtype=np.uint8)
    Image.fromarray(255-acc*255).save(path)
