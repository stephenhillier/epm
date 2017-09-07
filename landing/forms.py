from django import forms
from .models import Hello

class HelloForm(forms.ModelForm):
    ''' Send message from landing page '''
    name = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'placeholder':'Your name',
            'class':'form-control'
            }
                              ))
    email = forms.EmailField(
        label='',
        widget=forms.EmailInput(attrs={
            'placeholder':'Your email',
            'class':'form-control'
            }
                               ))
    message = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'placeholder':'Start a conversation...',
            'class':'form-control'}
                              ))

    class Meta:
        model = Hello
        fields = ('name', 'email', 'message',)
        