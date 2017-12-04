from django.shortcuts import render
from django.views.generic import View, CreateView
from django.contrib.messages.views import SuccessMessageMixin
from landing.forms import HelloForm

# Create your views here.
class LandingView(SuccessMessageMixin, CreateView):
    template_name = "landing/landing.html"
    form_class = HelloForm
    success_url = "/#sayhello"

    def get_success_message(self, cleaned_data):
        print('test')
        return "Message sent. Thank you!"
