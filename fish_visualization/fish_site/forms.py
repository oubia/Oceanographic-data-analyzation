from django import forms

class SelectValue(forms.Form):
    Catches_by = forms.CharField(label='Catches_by', max_length=100)
    Species = forms.CharField(label='Species', max_length=100)
    Parametres = forms.CharField(label='Parametres' , max_length=100)
    