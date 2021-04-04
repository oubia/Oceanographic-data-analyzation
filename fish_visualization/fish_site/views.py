from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse 
import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt
from .forms import SelectValue
from django.http import JsonResponse 

# change all dataframe to key value
def home(request):
    return render(request, 'home/dashboard.html')

def GraphSite(request):
    print("all done")
    return render(request,'home/Graph.html')

def TablePage(request):
    df = pd.read_csv('../fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
    columnsName=ChangeToDic(df)
    columnsName = columnsName.keys()
    spieces = (df['Functional group'].unique())

    if request.method == 'POST':
        form = SelectValue(request.POST)
        if form.is_valid():
            Catches_by = form.cleaned_data['Catches_by']
            Parametres = form.cleaned_data['Parametres']
            Group = form.cleaned_data['Group']
            Species = form.cleaned_data['Species']
            print("-----------valid-------------")
            if Parametres == 'Species characteristic':
                Spieces_file = pd.read_csv('../fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
                columnsName = SpiecesFonction(Spieces_file)
                final_data = SpiecesTable(Spieces_file,Group)
                print(final_data)
                context={'columnsName':columnsName ,'final_data':final_data}
                return render(request, 'home/table.html',context)
                
            elif Parametres == 'Diet composition':
                Diet_file = pd.read_json('../fish_visualization/fish_site/Data/Diet composition.json', encoding = "cp1252")
                columnsName = DietComposition(Diet_file)
                final_data = DietTable(Diet_file,str(Group))
                context={'columnsName':columnsName ,'final_data':final_data}
                return render(request, 'home/table.html',context)
            
            elif Parametres == 'Catch':
                img_name=figure_catch(Group)
                return render(request, 'home/table.html',{"img_name":"output.png"})

            elif Parametres == 'Biomass':
                img_name=figure_biomass(Group)
                return render(request, 'home/table.html',{"img_name":"output.png"})
            
            elif Parametres == 'Graph Biomass':
                img_name=biomasse_pelagic(Group)
                return render(request, 'home/table.html',{"img_name":"output.png"})

            else:
                print('can load data')
        else:
            print('form error didn t match any form')
    
    if request.is_ajax():
        Spieces_file = pd.read_csv('../fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
        Diet_file = pd.read_json('../fish_visualization/fish_site/Data/Diet composition.json', encoding = "cp1252")
        data_catch = pd.read_csv('../fish_visualization/fish_site/Data/Mogador MPA data(catch).csv',sep=';',header=0)
        data_biomass = pd.read_json('../fish_visualization/fish_site/Data/biomassjson.json',encoding = "cp1252")
        data_small_spieces = pd.read_csv("../fish_visualization/fish_site/Data/Biomass for small pelagic species.csv",sep=';',header=0)


        Spieces_file = Spieces_file.to_dict()
        Diet_file = Diet_file.to_dict()
        data_catch = data_catch.to_dict()
        data_biomass = data_biomass.to_dict()
        data_small_spieces = data_small_spieces.to_dict()
        text = request.GET.get('ready_text')
        data = json.dumps({'Spieces_file':Spieces_file,'Diet_file':Diet_file,
                            'data_catch':data_catch ,'data_biomass':data_biomass,'data_small_spieces':data_small_spieces})
        return JsonResponse({'data':data},status=200)
    context={'spieces':spieces}
    return render(request, 'home/table.html',context)

# fonction that will change our datafram to dictionniry
def ChangeToDic(df):
    l=df.columns
    key_list=l
    value_list=l
    g=dict(zip(key_list,value_list))
    return g


# Spieces function
def SpiecesFonction(df):
    def ChangeToDic(df):
        l=df.columns
        key_list=l
        value_list=l
        Data=dict(zip(key_list,value_list))
        return Data
    columns_name=ChangeToDic(df)
    columns_name = columns_name.keys()
    return columns_name

def SpiecesTable(df,Spiece_name):
    Global_data = []
    for i in range(df.shape[0]):
        temp = df.loc[i]
        Global_data.append(dict(temp))
    Spiece_table = []
    for i in Global_data:
        Spiece_table.append(i.values())
    Table_values=[]
    for i in Spiece_table:
        if Spiece_name in i:
            Table_values.append(i)
    return Table_values

# Diet composition function

def DietComposition(df):
    Table_columns = df.columns
    return Table_columns
def DietTable(df,SpieceName):
    Global_data=[]
    for i in range(df.shape[0]):
        temp = df.loc[i]
        Global_data.append(dict(temp))
    Spiece_table = []
    for i in Global_data:
        Spiece_table.append(i.values())
    l=[]
    L=[]
    for i in Spiece_table:
        for j in i:
             if j == SpieceName:
                l.append(i)  
    return l


# Figures catch
def figure_catch(ch):
    
    data_catch = pd.read_csv('../fish_visualization/fish_site/Data/Mogador MPA data(catch).csv',sep=';',header=0)
           
    data_catch=data_catch.to_dict()
    
    def get_index(ch) :
        l=[]
        for i in range(2849):
            if data_catch['functional_group'][i]==ch:
                l.append(i)
            else:
                print("value not found !!!!!")
        return l
    
    def get_year(ch) :
        l=get_index(ch)
        k=[]
        for i in l:
            k.append(data_catch['year'][i])
        return k
    
    def get_catch(ch) :
        l=get_index(ch)
        k=[]
        for i in l:
            k.append(data_catch['Landed value (tonnes)'][i])
        return k
    
    l=get_year(ch)
    o=get_catch(ch)
    plt.figure(figsize=(20,16))
    plt.plot(l,o,c='red',label=ch)
    plt.title("Analyse of catch")
    plt.xlabel("Years")
    plt.ylabel("Catch (tonnes)")
    plt.legend()
    plt.savefig("../fish_visualization/fish_site/static/images/output.png")


# figure biomass

def figure_biomass(ch):
    data_biomass = pd.read_csv('../fish_visualization/fish_site/Data/Mogador MPA data(biomass).csv',sep=';',header=0)
    data_biomass=data_biomass.to_dict()

    def moyenne(ch):
        k=' '
        for i in range(len(ch)):
            if ch[i] in '-_,;':
                k=ch [i]
        
        if k in '-_,;':
            ch=ch.split(k)
            m=(float(ch[0])+float(ch[1]))/2
            return m
        else:
            return float(ch)
        
    l=list(data_biomass.keys())    
    for i in l[1:]:
            for j in range(len(data_biomass[l[0]])):
                data_biomass[i][j]=moyenne(data_biomass[i][j])

    def get_index(ch) :
        y=[]
        for i in range(len(data_biomass[l[0]])):
            if data_biomass[l[0]][i]==ch:
                y.append(i)
        return y
        
    k=get_index(ch)
    t=k[0]
    e=[]
    r=[]
    for i in l[1:]:
        
        e.append(data_biomass[i][t])
        r.append(int(i))
            
    plt.figure(figsize=(8,6))
    plt.plot(r,e,c='red',label=ch)
    plt.title("analyse of biomass")
    plt.xlabel("Years")
    plt.ylabel("Biomass (tonnes)")
    plt.legend()
    plt.savefig("../fish_visualization/fish_site/static/images/output.png")
    
        



def biomasse_pelagic(ch):
    data_biomass_pelagic = pd.read_csv('../fish_visualization/fish_site/Data/Biomass for small pelagic species.csv',sep=';',header=0)
    data_biomass_pelagic=data_biomass_pelagic.to_dict()
    l=list(data_biomass_pelagic.keys())  
    def get_index(ch) :
        y=[]
        for i in range(len(data_biomass_pelagic[l[0]])):
            if data_biomass_pelagic[l[0]][i]==ch:
                y.append(i)
        return y
    
    k=get_index(ch)
    t=k[0]
    e=[]
    r=[]
    indice=[]
    for i in l[1:]:
        e.append(data_biomass_pelagic[i][t])
        r.append(int(i))

    for i in range(len(e)) :
        if e[i]!='-':
            indice.append(i)
    E=[]
    R=[]
    for j in indice:
        E.append(int(e[j]))
        R.append(int(r[j]))
    
    plt.figure(figsize=(8,6))
    plt.plot(R,E,c='red',label=ch)
    plt.title("analyse de biomasse")
    plt.xlabel("Années")
    plt.ylabel("Biomasse (tonnes/km²)")
    plt.legend()
    plt.savefig("../fish_visualization/fish_site/static/images/output.png")
