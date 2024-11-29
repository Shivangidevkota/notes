from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),  # Auth routes (register, login)
    path('api/', include('notes.urls')),  # Notes API
]


