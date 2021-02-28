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

# change all dataframe to key value
def ChangeToDic(df):
    key_list=df
    value_list=df
    g=dict(zip(key_list,value_list))
    return g
def search(GroupType,SpecieName):
    df = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Book1.csv', encoding = "cp1252")
    dataDict=df.to_dict('index')
    data=[]
    for i in range (len(dataDict)):
        if dataDict[i][GroupType] == SpecieName:
            data.append(dataDict[i])
    return data     
# def Convert_dict(List):  
#     init = iter(List)  
#     res_dct = dict(zip(init, init))  
#     return res_dct


def TablePage(request):
    df = pd.read_csv('E:/homy/S4/PFE/PFE/fish_visualization/fish_site/Data/Book1.csv', encoding = "cp1252")
    columnsName=ChangeToDic(df)
    GroupType = 'Functional group'
    SpecieName = 'Cephalopods'
    Data=search(GroupType,SpecieName)
    print(Data) 
    context={'columnsName':columnsName,'Data':Data}
    return render(request, 'home/table.html',context)
