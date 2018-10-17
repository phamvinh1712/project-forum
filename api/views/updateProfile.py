from ..models import Profile
from ..serializers import ProfileSerializer
from rest_framework import generics
from django.contrib.auth.forms import UserChangeForm

def update_profile(req):
    if request.method == 'POST':
        form = UserChangeForm(req.POST, instance=req.user)
        
        if form.is_valid():
            form.save()   
    else:
        form = UserChangeForm(instance=req.user)
        args['form'] = form
