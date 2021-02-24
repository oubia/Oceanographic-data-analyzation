from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse 
import pandas as pd



# Create your views here.

def home(request):
    
    return render(request, 'home/dashboard.html')



def DataName(df):
    return df.columns
def TablePage(request):
    df = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Book1.csv', encoding = "cp1252")
    # a= df.set_index('Species (common name)')
    # b=a[a.isin(['Cephalopods']).any(axis=1)]
    b=DataName(df)
    c=len(b)
    context={'b':b,'c':c}
    return render(request, 'home/table.html',context)
