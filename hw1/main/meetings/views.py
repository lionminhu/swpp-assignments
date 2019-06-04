from .models import Meeting
from .serializers import MeetingSerializer, UserSerializer, updatePrimaryKey, isUpdate
from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly
from datetime import datetime


class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def put(self, request, *args, **kwargs):
        # provide primary key to serializers module
        updatePrimaryKey(kwargs['pk'])
        # indicate that current method is PUT
        isUpdate(True)
        return self.update(request, *args, **kwargs)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer