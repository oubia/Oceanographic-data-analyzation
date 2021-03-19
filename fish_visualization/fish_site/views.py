from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse 
import pandas as pd
import json
import matplotlib.pyplot as plt
from .forms import SelectValue



# Create your views here.

# change all dataframe to key value
def ChangeToDic(df):
    l=df.columns
    key_list=l
    value_list=l
    g=dict(zip(key_list,value_list))
    return g

def home(request):
    return render(request, 'home/dashboard.html')


def TablePage(request):
    df = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
    columnsName=ChangeToDic(df)
    columnsName = columnsName.keys()
    spieces = (df['Functional group'])

    if request.method == 'POST':
        print("psot is -----------",request.POST)
    else:
        print(request)
    if request.method == 'POST':
        form = SelectValue(request.POST)
        if form.is_valid():
            Catches_by = form.cleaned_data['Catches_by']
            Species = form.cleaned_data['Species']
            Parametres = form.cleaned_data['Parametres']
            print('printing form value',Species)
            if Parametres == 'Species':
                Spieces_file = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
                columnsName = SpiecesFonction(Spieces_file)
                final_data = SpiecesTable(Spieces_file,Species)
                context={'columnsName':columnsName ,'final_data':final_data}
                return render(request, 'home/table.html',context)
            elif Parametres == 'Diet composition':
                Diet_file = pd.read_json('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Diet composition.json', encoding = "cp1252")
                columnsName =DietComposition(Diet_file)
                final_data = DietTable(Diet_file,str(Species))
                context={'columnsName':columnsName ,'final_data':final_data}
                return render(request, 'home/table.html',context)
            
            elif Parametres == 'Catch':
                img_name=figure_catch(Species)
                return render(request, 'home/table.html',{"img_name":"output.png"})

            elif Parametres == 'Biomass':
                img_name=figure_biomass(Species)
                return render(request, 'home/table.html',{"img_name":"output.png"})

            else:
                print('can load data')
        else:
            print('form error didn t match any form')
         
    context={'spieces':spieces}
    return render(request, 'home/table.html',context)


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
    
    data_catch = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Mogador MPA data(catch).csv',sep=';',header=0)
           
    data_catch=data_catch.to_dict()
    
    def get_index(ch) :
        l=[]
        for i in range(2849):
            if data_catch['functional_group'][i]==ch:
                l.append(i)
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
    plt.title("analyse de catch")
    plt.xlabel("Années")
    plt.ylabel("Biomass (tonnes)")
    plt.legend()
    plt.savefig("E:/homy/S4/PFE/PFE/fish_visualization/fish_site/static/images/output.png")


# figure biomass

def figure_biomass(ch):
    data_biomass = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Mogador MPA data(biomass).csv',sep=';',header=0)
    
    def moyenne(ch):
        ch=ch.split("-")
        m=(float(ch[0])+float(ch[1]))/2
        return m

    for i in range(1950,2015):
        i=str(i)
        for j in range(151):
            data_biomass[i][j]=moyenne(data_biomass[i][j])
            
            
    data_biomass=data_biomass.to_dict()

    def get_index(ch) :
        l=[]
        for i in range(151):
            if data_biomass['Functional group'][i]==ch:
                l.append(i)
        return l
    
    k=get_index(ch)
    t=k[0]
    e=[]
    r=[]
    for i in range(1950,2015):
        i=str(i)
        e.append(data_biomass[i][t])
        r.append(int(i))
        
    plt.figure(figsize=(8,6))
    plt.plot(r,e,c='red',label=ch)
    plt.title("analyse de biomass")
    plt.xlabel("Années")
    plt.ylabel("Biomass (tonnes)")
    plt.legend()
    plt.savefig("E:/homy/S4/PFE/PFE/fish_visualization/fish_site/static/images/output.png")
    
        
