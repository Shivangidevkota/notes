from django.contrib import admin
from .models import Note

# Register the Note model to be managed in the admin panel
admin.site.register(Note)