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
    if request.is_ajax():
        Spieces_file = pd.read_csv('../fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
        Diet_file = pd.read_json('../fish_visualization/fish_site/Data/Diet composition.json', encoding = "cp1252")
        data_catch = pd.read_csv('../fish_visualization/fish_site/Data/Mogador MPA data(catch) (2).csv',sep=',',header=0)
        data_biomass = pd.read_json('../fish_visualization/fish_site/Data/biomassjson.json',encoding = "cp1252")
        data_small_spieces = pd.read_csv("../fish_visualization/fish_site/Data/Biomass for small pelagic species.csv",sep=';',header=0)
        biological_params = pd.read_csv("../fish_visualization/fish_site/Data/biological-para.csv",sep=';',header=0)

        Spieces_file = Spieces_file.to_dict()
        Diet_file = Diet_file.to_dict()
        data_catch = data_catch.to_dict()
        data_biomass = data_biomass.to_dict()
        data_small_spieces = data_small_spieces.to_dict()
        biological_params = biological_params.to_dict()
        text = request.GET.get('ready_text')
        data = json.dumps({'Spieces_file':Spieces_file,'Diet_file':Diet_file,
                            'data_catch':data_catch ,'data_biomass':data_biomass,'data_small_spieces':data_small_spieces,'biological_params':biological_params})
        return JsonResponse({'data':data},status=200)
    return render(request,'home/Graph.html')

def TablePage(request):

    
    if request.is_ajax():
        Spieces_file = pd.read_csv('../fish_visualization/fish_site/Data/Species.csv', encoding = "cp1252")
        Diet_file = pd.read_json('../fish_visualization/fish_site/Data/Diet composition.json', encoding = "cp1252")
        data_catch = pd.read_csv('../fish_visualization/fish_site/Data/Mogador MPA data(catch) (2).csv',sep=',',header=0)
        data_biomass = pd.read_json('../fish_visualization/fish_site/Data/biomassjson.json',encoding = "cp1252")
        data_small_spieces = pd.read_csv("../fish_visualization/fish_site/Data/Biomass for small pelagic species.csv",sep=';',header=0)
        biological_params = pd.read_csv("../fish_visualization/fish_site/Data/biological-para.csv",sep=';',header=0)


        Spieces_file = Spieces_file.to_dict()
        Diet_file = Diet_file.to_dict()
        data_catch = data_catch.to_dict()
        data_biomass = data_biomass.to_dict()
        data_small_spieces = data_small_spieces.to_dict()
        biological_params = biological_params.to_dict()
        text = request.GET.get('ready_text')
        data = json.dumps({'Spieces_file':Spieces_file,'Diet_file':Diet_file,
                            'data_catch':data_catch ,'data_biomass':data_biomass,'data_small_spieces':data_small_spieces,'biological_params':biological_params})
        return JsonResponse({'data':data},status=200)
    return render(request, 'home/table.html')
