from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('meetings/', views.MeetingList.as_view()),
    path('meetings/<int:pk>/', views.MeetingDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)