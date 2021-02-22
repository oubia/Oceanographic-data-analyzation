from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse 
import pandas



# Create your views here.

def home(request):
    # df = pandas.read_csv('csv.csv')
    # print(df)
    return render(request, 'home/dashboard.html')

def TablePage(request):
    
    return render(request, 'home/table.html')
