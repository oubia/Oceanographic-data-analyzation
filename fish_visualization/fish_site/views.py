from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse 
import pandas as pd



# Create your views here.

def home(request):
    
    return render(request, 'home/dashboard.html')


# change all dataframe to key value
def ChangeToDic(df):
    l=df.columns
    key_list=l
    value_list=l
    g=dict(zip(key_list,value_list))
    return g
# def DataName(df):
    # return df.columns
def TablePage(request):
    df = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Book1.csv', encoding = "cp1252")
    
    columnsName=ChangeToDic(df)
    context={'columnsName':columnsName}
    print(b)
    return render(request, 'home/table.html',context)
