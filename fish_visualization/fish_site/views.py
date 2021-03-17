from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse 
import pandas as pd



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
    df = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Book1.csv', encoding = "cp1252")
    columnsName=ChangeToDic(df)
    columnsName = columnsName.keys()
    GlobalData = []
    for i in range(df.shape[0]):
        temp = df.loc[i]
        GlobalData.append(dict(temp))
    l = []
    for i in GlobalData:
        l.append(i.values())
    L=[]
    spieces = (df['Functional group'])
    for i in l:
        if 'Sharks and rays' in i:
            L.append(i)
    if request.method == 'POST':
        print("psot is -----------",request.method)
    else:
        print(request)

    context={'columnsName':columnsName ,'L':L,'spieces':spieces}
    return render(request, 'home/table.html',context)

